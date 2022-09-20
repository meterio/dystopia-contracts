// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "../../lib/Math.sol";
import "../../interface/IVe.sol";
import "../../interface/IERC20.sol";
import "../../interface/IVoter.sol";
import "../../interface/IVeDist.sol";
import "../../interface/IController.sol";
import "../../lib/AccessControl.sol";

contract Minter is AccessControl {
    uint256 internal constant _WEEK = 86400 * 7; // allows minting once per month

    IERC20 public _token;
    IVe public _ve;
    address public controller;
    uint256 public activeperiod;
    /// @dev veDist per week
    uint public veDistPerWeek;
    /// @dev voter per week
    uint public voterPerWeek;

    event Send(
        address indexed sender,
        uint256 veDistAmount,
        uint256 voterAmount
    );

    constructor(address __ve, address __controller) {
        _token = IERC20(IVe(__ve).token());
        _ve = IVe(__ve);
        controller = __controller;
        activeperiod = (block.timestamp / _WEEK) * _WEEK;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
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

    function whiteList(address[] memory tokens) public onlyAdmin {
        _voter().init(tokens, address(this));
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
            if (veDistPerWeek > 0) {
                require(
                    _token.transfer(address(_veDist()), veDistPerWeek),
                    "Transfer Fail"
                );
                _veDist().checkpointToken();
                _veDist().checkpointTotalSupply();
            }
            if (voterPerWeek > 0) {
                _token.approve(address(_voter()), voterPerWeek);
                _voter().notifyRewardAmount(voterPerWeek);
            }

            emit Send(msg.sender, veDistPerWeek, voterPerWeek);
        }
        return _period;
    }

    function weeklyEmission() external view returns (uint) {
        return veDistPerWeek + voterPerWeek;
    }
}
