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
    uint256 internal constant _WEEK = 86400 * 7; // allows minting once per month
    uint256 public veDistRatio;
    uint256 public constant VE_DIST_RATIO_MAX = 10000;

    IERC20 public _token;
    IVe public _ve;
    address public controller;
    uint256 public activeperiod;
    uint public initialStubCirculation;
    uint public constant _STUB_CIRCULATION = 10;
    uint public constant _STUB_CIRCULATION_DENOMINATOR = 100;
    uint public baseWeeklyEmission = _START_BASE_WEEKLY_EMISSION;
    uint public constant _START_BASE_WEEKLY_EMISSION = 20_000_000e18;
    uint public constant _TAIL_EMISSION = 1;
    uint public constant _TAIL_EMISSION_DENOMINATOR = 100;
    /// @dev veDist per week
    uint public veDistPerWeek;
    /// @dev voter per week
    uint public voterPerWeek;

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
        activeperiod = (block.timestamp / _WEEK) * _WEEK;
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
    }

    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "forbidden");
        _;
    }

    function adminSetVeDistPerWeek(uint256 _veDistPerWeek) public onlyAdmin {
        veDistPerWeek = _veDistPerWeek;
    }

    function adminSetVoterPerWeek(uint256 _voterPerWeek) public onlyAdmin {
        voterPerWeek = _voterPerWeek;
    }

    function mint(address to, uint256 amount) public onlyAdmin {
        (bool success, bytes memory data) = address(_token).call(
            abi.encodeWithSelector(0x40c10f19, to, amount)
        );
        require(success && abi.decode(data, (bool)), "mint fail");
    }

    function withdraw(uint256 amount) public onlyAdmin {
        require(_token.transfer(msg.sender, amount), "Transfer Fail");
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

    function updatePeriod() external onlyAdmin returns (uint256) {
        uint256 _period = activeperiod;
        if (block.timestamp >= _period + _WEEK) {
            _period = (block.timestamp / _WEEK) * _WEEK;
            activeperiod = _period;

            uint256 _balanceOf = _token.balanceOf(address(this));

            require(
                _balanceOf >= veDistPerWeek + voterPerWeek,
                "Insufficient balance"
            );

            require(
                _token.transfer(address(_veDist()), veDistPerWeek),
                "Transfer Fail"
            );
            _veDist().checkpointToken();
            _veDist().checkpointTotalSupply();

            _token.approve(address(_voter()), voterPerWeek);
            _voter().notifyRewardAmount(voterPerWeek);

            emit Send(msg.sender, veDistPerWeek, voterPerWeek);
        }
        return _period;
    }

    function _circulatingSupply() internal view returns (uint) {
        return
            _token.totalSupply() - 
            IERC20(address(_ve)).totalSupply() - 
            _token.balanceOf(address(_veDist())) -
            _token.balanceOf(address(this));
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
            _token.totalSupply();
    }

    function weeklyEmission() external view returns (uint) {
        return _weeklyEmission();
    }

    function _weeklyEmission() internal view returns (uint) {
        return Math.max(_calculateEmission(), _circulatingEmission());
    }

    function _circulatingEmission() internal view returns (uint) {
        return
            (_circulatingSupply() * _TAIL_EMISSION) /
            _TAIL_EMISSION_DENOMINATOR;
    }
}