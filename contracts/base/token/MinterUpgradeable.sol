// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "../../lib/Math.sol";
import "../../interface/IVe.sol";
import "../../interface/IERC20.sol";
import "../../interface/IVoter.sol";
import "../../interface/IVeDist.sol";
import "../../interface/IController.sol";
import "../../lib/AccessControl.sol";
import "../../lib/Initializable.sol";

contract MinterUpgradeable is AccessControl, Initializable {
    uint256 internal constant _MONTH = 86400 * 7 * 4; // allows minting once per month
    uint256 public veDistRatio;
    uint256 public constant VE_DIST_RATIO_MAX = 10000;

    IERC20 public _token;
    IVe public _ve;
    address public controller;
    uint256 public activeperiod;
    /// @dev 存根初始循环
    uint public initialStubCirculation;
    uint public constant _STUB_CIRCULATION = 10;
    uint public constant _STUB_CIRCULATION_DENOMINATOR = 100;
    /// @dev 基础每周释放量 = 初始基础每周释放量
    uint public baseWeeklyEmission = _START_BASE_WEEKLY_EMISSION;
    uint public constant _START_BASE_WEEKLY_EMISSION = 20_000_000e18;
    uint public constant _TAIL_EMISSION = 1;
    uint public constant _TAIL_EMISSION_DENOMINATOR = 100;

    event Send(
        address indexed sender,
        uint256 veDistAmount,
        uint256 voterAmount
    );

    function initialize(
        address __ve,
        address __controller,
        address admin
    ) public initializer {
        _token = IERC20(IVe(__ve).token());
        _ve = IVe(__ve);
        controller = __controller;
        activeperiod = (block.timestamp / _MONTH) * _MONTH;
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
    }

    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "forbidden");
        _;
    }

    function adminSetVeRatio(uint256 _veDistRatio) public onlyAdmin {
        veDistRatio = _veDistRatio;
    }

    function _veDist() internal view returns (IVeDist) {
        return IVeDist(IController(controller).veDist());
    }

    function _voter() internal view returns (IVoter) {
        return IVoter(IController(controller).voter());
    }

    function setActiveperiod(uint256 _activeperiod) public onlyAdmin {
        activeperiod = _activeperiod;
    }

    function mint(address to, uint256 amount) public onlyAdmin {
        (bool success, bytes memory data) = address(_token).call(
            abi.encodeWithSelector(0x40c10f19, to, amount)
        );
        require(success && abi.decode(data, (bool)), "mint fail");
    }

    function updatePeriod() external onlyAdmin returns (uint256) {
        uint256 _period = activeperiod;
        if (block.timestamp >= _period + _MONTH) {
            _period = (block.timestamp / _MONTH) * _MONTH;
            activeperiod = _period;

            uint256 _balanceOf = _token.balanceOf(address(this));
            uint256 veDistAmount = (_balanceOf * veDistRatio) /
                VE_DIST_RATIO_MAX;

            require(
                _token.transfer(address(_veDist()), veDistAmount),
                "Transfer Fail"
            );
            _veDist().checkpointToken();
            _veDist().checkpointTotalSupply();

            uint256 voterAmount = _balanceOf - veDistAmount;
            _token.approve(address(_voter()), voterAmount);
            _voter().notifyRewardAmount(voterAmount);

            emit Send(msg.sender, veDistRatio, veDistAmount);
        }
        return _period;
    }

    /// @dev 将循环供量 = token总代币供应 - veNFT锁定量 - veDist余额 - 当前合约余额
    function _circulatingSupply() internal view returns (uint) {
        return
            _token.totalSupply() - // token总供应量 -
            IERC20(address(_ve)).totalSupply() - // ve总供应量
            // 从流通中排除 veDist 代币余额 - 用户无法在没有锁定的情况下领取它们
            // 逾期索赔将导致错误的流通供应计算
            _token.balanceOf(address(_veDist())) -
            // 排除铸币厂余额，显然是锁定的
            _token.balanceOf(address(this));
    }

    /// @dev 循环供应调整值
    function _circulatingSupplyAdjusted() internal view returns (uint) {
        // 当大量代币被分发和锁定时，我们需要一个存根供应来弥补初始缺口
        // Max(循环供应量, 存根初始循环)
        return Math.max(_circulatingSupply(), initialStubCirculation);
    }

    /// @dev 释放量计算为铸币厂可用供应量的 2%，由流通/总供应量调整
    function calculateEmission() external view returns (uint) {
        return _calculateEmission();
    }

    function _calculateEmission() internal view returns (uint) {
        // 使用调整后的流通供应来避免第一周的缺口
        // 基础每周释放量 应该每周减少
        // 基础每周释放量 * 循环供应调整值 / token总供应量
        return
            (baseWeeklyEmission * _circulatingSupplyAdjusted()) /
            _token.totalSupply();
    }

    /// @dev 每周释放量取计算（又名目标）释放量与循环尾端释放量的最大值
    function weeklyEmission() external view returns (uint) {
        return _weeklyEmission();
    }

    function _weeklyEmission() internal view returns (uint) {
        // Max(计算释放量, 循环释放量)
        return Math.max(_calculateEmission(), _circulatingEmission());
    }

    /// @dev 循环释放量 = 循环供应量 * 1%
    function _circulatingEmission() internal view returns (uint) {
        return
            (_circulatingSupply() * _TAIL_EMISSION) /
            _TAIL_EMISSION_DENOMINATOR;
    }
}
