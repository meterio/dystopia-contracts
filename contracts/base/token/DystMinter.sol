// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "../../lib/Math.sol";
import "../../lib/SafeERC20.sol";
import "../../interface/IUnderlying.sol";
import "../../interface/IVoter.sol";
import "../../interface/IVe.sol";
import "../../interface/IVeDist.sol";
import "../../interface/IMinter.sol";
import "../../interface/IERC20.sol";
import "../../interface/IController.sol";

contract DystMinter is IMinter {
    using SafeERC20 for IERC20;

    uint internal constant _WEEK = 86400 * 7;
    uint internal constant _LOCK_PERIOD = 86400 * 7 * 52 * 4;

    uint internal constant _WEEKLY_EMISSION_DECREASE = 98;
    uint internal constant _WEEKLY_EMISSION_DECREASE_DENOMINATOR = 100;

    uint internal constant _TAIL_EMISSION = 1;
    uint internal constant _TAIL_EMISSION_DENOMINATOR = 100;

    uint internal constant _GROWTH_DIVIDER = 10;

    uint internal constant _INITIAL_CIRCULATION_DECREASE = 99;
    uint internal constant _INITIAL_CIRCULATION_DECREASE_DENOMINATOR = 100;

    uint internal constant _STUB_CIRCULATION = 10;
    uint internal constant _STUB_CIRCULATION_DENOMINATOR = 100;

    uint internal constant _START_BASE_WEEKLY_EMISSION = 20_000_000e18;

    IUnderlying public immutable token;
    IVe public immutable ve;
    address public immutable controller;
    uint public baseWeeklyEmission = _START_BASE_WEEKLY_EMISSION;
    uint public initialStubCirculation;
    uint public activePeriod;

    address internal initializer;

    event Mint(
        address indexed sender,
        uint weekly,
        uint growth,
        uint circulatingSupply,
        uint circulatingEmission
    );

    constructor(
        address ve_, // the ve(3,3) system that will be locked into
        address controller_, // controller with veDist and voter addresses
        uint warmingUpPeriod // 2 by default
    ) {
        initializer = msg.sender;
        token = IUnderlying(IVe(ve_).token());
        ve = IVe(ve_);
        controller = controller_;
        activePeriod =
            ((block.timestamp + (warmingUpPeriod * _WEEK)) / _WEEK) *
            _WEEK;
    }

    function initialize(
        address[] memory claimants,
        uint[] memory amounts,
        uint totalAmount
    ) external {
        require(initializer == msg.sender, "Not initializer");
        token.mint(address(this), totalAmount);
        initialStubCirculation =
            (totalAmount * _STUB_CIRCULATION) /
            _STUB_CIRCULATION_DENOMINATOR;
        token.approve(address(ve), type(uint).max);
        uint sum;
        for (uint i = 0; i < claimants.length; i++) {
            ve.createLockFor(amounts[i], _LOCK_PERIOD, claimants[i]);
            sum += amounts[i];
        }
        require(sum == totalAmount, "Wrong totalAmount");
        initializer = address(0);
        activePeriod = ((block.timestamp + _WEEK) / _WEEK) * _WEEK;
    }

    function _veDist() internal view returns (IVeDist) {
        return IVeDist(IController(controller).veDist());
    }

    function _voter() internal view returns (IVoter) {
        return IVoter(IController(controller).voter());
    }

    function circulatingSupply() external view returns (uint) {
        return _circulatingSupply();
    }

    function _circulatingSupply() internal view returns (uint) {
        return
            token.totalSupply() -
            IUnderlying(address(ve)).totalSupply() -
            token.balanceOf(address(_veDist())) -
            token.balanceOf(address(this));
    }

    function _circulatingSupplyAdjusted() internal view returns (uint) {
        return Math.max(_circulatingSupply(), initialStubCirculation);
    }

    function calculateEmission() external view returns (uint) {
        return _calculateEmission();
    }

    function _calculateEmission() internal view returns (uint) {
        return
            (baseWeeklyEmission * _circulatingSupplyAdjusted()) /
            token.totalSupply();
    }

    function weeklyEmission() external view returns (uint) {
        return _weeklyEmission();
    }

    function _weeklyEmission() internal view returns (uint) {
        return Math.max(_calculateEmission(), _circulatingEmission());
    }

    function circulatingEmission() external view returns (uint) {
        return _circulatingEmission();
    }

    function _circulatingEmission() internal view returns (uint) {
        return
            (_circulatingSupply() * _TAIL_EMISSION) /
            _TAIL_EMISSION_DENOMINATOR;
    }

    function calculateGrowth(uint _minted) external view returns (uint) {
        return _calculateGrowth(_minted);
    }

    function _calculateGrowth(uint _minted) internal view returns (uint) {
        return
            (IUnderlying(address(ve)).totalSupply() * _minted) /
            token.totalSupply() /
            _GROWTH_DIVIDER;
    }

    function updatePeriod() external override returns (uint) {
        uint _period = activePeriod;
        if (block.timestamp >= _period + _WEEK && initializer == address(0)) {
            _period = (block.timestamp / _WEEK) * _WEEK;
            activePeriod = _period;
            uint _weekly = _weeklyEmission();
            baseWeeklyEmission =
                (baseWeeklyEmission * _WEEKLY_EMISSION_DECREASE) /
                _WEEKLY_EMISSION_DECREASE_DENOMINATOR;
            if (initialStubCirculation > _circulatingEmission()) {
                initialStubCirculation =
                    (initialStubCirculation * _INITIAL_CIRCULATION_DECREASE) /
                    _INITIAL_CIRCULATION_DECREASE_DENOMINATOR;
            }

            uint _growth = _calculateGrowth(_weekly);
            uint _required = _growth + _weekly;
            uint _balanceOf = token.balanceOf(address(this));
            if (_balanceOf < _required) {
                token.mint(address(this), _required - _balanceOf);
            }

            IERC20(address(token)).safeTransfer(address(_veDist()), _growth);
            _veDist().checkpointToken();
            _veDist().checkpointTotalSupply();

            token.approve(address(_voter()), _weekly);
            _voter().notifyRewardAmount(_weekly);

            emit Mint(
                msg.sender,
                _weekly,
                _growth,
                _circulatingSupply(),
                _circulatingEmission() // 循环释放量
            );
        }
        return _period;
    }
}
