// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface IVoltFactory {
    function getPair(
        address tokenA,
        address token,
        bool stable
    ) external view returns (address);
}

contract Router {
    address public immutable factory;
    address public immutable WETH;

    constructor(address _factory, address _weth) {
        factory = _factory;
        WETH = _weth;
    }

    function getPair(
        address tokenA,
        address tokenB
    ) external view returns (address) {
        return Factory(factory).getPair(tokenA, tokenB);
    }
}

contract Factory {
    address public immutable voltFactory;

    constructor(address _voltFactory) {
        voltFactory = _voltFactory;
    }

    function getPair(
        address tokenA,
        address tokenB
    ) external view returns (address) {
        return IVoltFactory(voltFactory).getPair(tokenA, tokenB, false);
    }
}
