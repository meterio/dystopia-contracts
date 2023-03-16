// Sources flattened with hardhat v2.10.2 https://hardhat.org

// File contracts/interface/IPair.sol


pragma solidity ^0.8.13;

interface IPair {
    // Structure to capture time period obervations every 30 minutes, used for local oracles
    struct Observation {
        uint timestamp;
        uint reserve0Cumulative;
        uint reserve1Cumulative;
    }

    function permit(
        address owner,
        address spender,
        uint value,
        uint deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    function swap(
        uint amount0Out,
        uint amount1Out,
        address to,
        bytes calldata data
    ) external;

    function burn(address to) external returns (uint amount0, uint amount1);

    function mint(address to) external returns (uint liquidity);

    function getReserves()
        external
        view
        returns (
            uint112 _reserve0,
            uint112 _reserve1,
            uint32 _blockTimestampLast
        );

    function getAmountOut(uint, address) external view returns (uint);

    function claimFees() external returns (uint, uint);

    function tokens() external view returns (address, address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function stable() external view returns (bool);

    function metadata()
        external
        view
        returns (
            uint dec0,
            uint dec1,
            uint r0,
            uint r1,
            bool st,
            address t0,
            address t1
        );
}


// File contracts/interface/IRouter.sol


pragma solidity ^0.8.13;

interface IRouter {
    struct Route {
        address from;
        address to;
        bool stable;
    }

    function factory() external view returns (address);

    function WMTR() external view returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        bool stable,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    )
        external
        returns (
            uint amountA,
            uint amountB,
            uint liquidity
        );

    function addLiquidityMTR(
        address token,
        bool stable,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountMTRMin,
        address to,
        uint deadline
    )
        external
        payable
        returns (
            uint amountToken,
            uint amountMTR,
            uint liquidity
        );

    function removeLiquidity(
        address tokenA,
        address tokenB,
        bool stable,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB);

    function removeLiquidityMTR(
        address token,
        bool stable,
        uint liquidity,
        uint amountTokenMin,
        uint amountMTRMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountMTR);

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        bool stable,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint amountA, uint amountB);

    function removeLiquidityMTRWithPermit(
        address token,
        bool stable,
        uint liquidity,
        uint amountTokenMin,
        uint amountMTRMin,
        address to,
        uint deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint amountToken, uint amountMTR);

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        Route[] calldata routes,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        Route[] calldata routes,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactMTRForTokens(
        uint amountOutMin,
        Route[] calldata routes,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);

    function swapTokensForExactMTR(
        uint amountOut,
        uint amountInMax,
        Route[] calldata routes,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactTokensForMTR(
        uint amountIn,
        uint amountOutMin,
        Route[] calldata routes,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapMTRForExactTokens(
        uint amountOut,
        Route[] calldata routes,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);

    function quoteRemoveLiquidity(
        address tokenA,
        address tokenB,
        bool stable,
        uint liquidity
    ) external view returns (uint amountA, uint amountB);

    function quoteAddLiquidity(
        address tokenA,
        address tokenB,
        bool stable,
        uint amountADesired,
        uint amountBDesired
    )
        external
        view
        returns (
            uint amountA,
            uint amountB,
            uint liquidity
        );

    function pairFor(
        address tokenA,
        address tokenB,
        bool stable
    ) external view returns (address pair);

    function sortTokens(address tokenA, address tokenB)
        external
        pure
        returns (address token0, address token1);

    function quoteLiquidity(
        uint amountA,
        uint reserveA,
        uint reserveB
    ) external pure returns (uint amountB);

    function getAmountOut(
        uint amountIn,
        address tokenIn,
        address tokenOut
    ) external view returns (uint amount, bool stable);

    function getAmountIn(
        uint amountOut,
        uint reserveIn,
        uint reserveOut
    ) external pure returns (uint amountIn, bool stable);

    function getAmountsOut(uint amountIn, Route[] memory routes)
        external
        view
        returns (uint[] memory amounts);

    function getAmountsIn(uint amountOut, Route[] memory routes)
        external
        view
        returns (uint[] memory amounts);

    function getReserves(
        address tokenA,
        address tokenB,
        bool stable
    ) external view returns (uint reserveA, uint reserveB);

    function getExactAmountOut(
        uint amountIn,
        address tokenIn,
        address tokenOut,
        bool stable
    ) external view returns (uint amount);

    function isPair(address pair) external view returns (bool);

    function swapExactTokensForTokensSimple(
        uint amountIn,
        uint amountOutMin,
        address tokenFrom,
        address tokenTo,
        bool stable,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactTokensForMTRSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        Route[] calldata routes,
        address to,
        uint deadline
    ) external;

    function swapExactMTRForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        Route[] calldata routes,
        address to,
        uint deadline
    ) external payable;

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        Route[] calldata routes,
        address to,
        uint deadline
    ) external;

    function removeLiquidityMTRWithPermitSupportingFeeOnTransferTokens(
        address token,
        bool stable,
        uint liquidity,
        uint amountTokenMin,
        uint amountFTMMin,
        address to,
        uint deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint amountToken, uint amountFTM);

    function removeLiquidityMTRSupportingFeeOnTransferTokens(
        address token,
        bool stable,
        uint liquidity,
        uint amountTokenMin,
        uint amountFTMMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountFTM);
}


// File contracts/lib/SolidlyLibrary.sol


pragma solidity ^0.8.13;


contract SolidlyLibrary {
    IRouter internal router;

    constructor(address _router) {
        router = IRouter(_router);
    }

    function _f(uint256 x0, uint256 y) internal pure returns (uint256) {
        return
            (x0 * ((((y * y) / 1e18) * y) / 1e18)) /
            1e18 +
            (((((x0 * x0) / 1e18) * x0) / 1e18) * y) /
            1e18;
    }

    function _d(uint256 x0, uint256 y) internal pure returns (uint256) {
        return
            (3 * x0 * ((y * y) / 1e18)) /
            1e18 +
            ((((x0 * x0) / 1e18) * x0) / 1e18);
    }

    function _get_y(
        uint256 x0,
        uint256 xy,
        uint256 y
    ) internal pure returns (uint256) {
        for (uint256 i = 0; i < 255; i++) {
            uint256 y_prev = y;
            uint256 k = _f(x0, y);
            if (k < xy) {
                uint256 dy = ((xy - k) * 1e18) / _d(x0, y);
                y = y + dy;
            } else {
                uint256 dy = ((k - xy) * 1e18) / _d(x0, y);
                y = y - dy;
            }
            if (y > y_prev) {
                if (y - y_prev <= 1) {
                    return y;
                }
            } else {
                if (y_prev - y <= 1) {
                    return y;
                }
            }
        }
        return y;
    }

    function getTradeDiff(
        uint256 amountIn,
        address tokenIn,
        address tokenOut,
        bool stable
    ) external view returns (uint256 a, uint256 b) {
        (
            uint256 dec0,
            uint256 dec1,
            uint256 r0,
            uint256 r1,
            bool st,
            address t0,

        ) = IPair(router.pairFor(tokenIn, tokenOut, stable)).metadata();
        uint256 sample = tokenIn == t0 ? (r0 * dec1) / r1 : (r1 * dec0) / r0;
        a =
            (_getAmountOut(sample, tokenIn, r0, r1, t0, dec0, dec1, st) *
                1e18) /
            sample;
        b =
            (_getAmountOut(amountIn, tokenIn, r0, r1, t0, dec0, dec1, st) *
                1e18) /
            amountIn;
    }

    function getTradeDiff(
        uint256 amountIn,
        address tokenIn,
        address pair
    ) external view returns (uint256 a, uint256 b) {
        (
            uint256 dec0,
            uint256 dec1,
            uint256 r0,
            uint256 r1,
            bool st,
            address t0,

        ) = IPair(pair).metadata();
        uint256 sample = tokenIn == t0 ? (r0 * dec1) / r1 : (r1 * dec0) / r0;
        a =
            (_getAmountOut(sample, tokenIn, r0, r1, t0, dec0, dec1, st) *
                1e18) /
            sample;
        b =
            (_getAmountOut(amountIn, tokenIn, r0, r1, t0, dec0, dec1, st) *
                1e18) /
            amountIn;
    }

    function getSample(
        address tokenIn,
        address tokenOut,
        bool stable
    ) external view returns (uint256) {
        (
            uint256 dec0,
            uint256 dec1,
            uint256 r0,
            uint256 r1,
            bool st,
            address t0,

        ) = IPair(router.pairFor(tokenIn, tokenOut, stable)).metadata();
        uint256 sample = tokenIn == t0 ? (r0 * dec1) / r1 : (r1 * dec0) / r0;
        return
            (_getAmountOut(sample, tokenIn, r0, r1, t0, dec0, dec1, st) *
                1e18) / sample;
    }

    function getMinimumValue(
        address tokenIn,
        address tokenOut,
        bool stable
    )
        external
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        (
            uint256 dec0,
            uint256 dec1,
            uint256 r0,
            uint256 r1,
            ,
            address t0,

        ) = IPair(router.pairFor(tokenIn, tokenOut, stable)).metadata();
        uint256 sample = tokenIn == t0 ? (r0 * dec1) / r1 : (r1 * dec0) / r0;
        return (sample, r0, r1);
    }

    function getAmountOut(
        uint256 amountIn,
        address tokenIn,
        address tokenOut,
        bool stable
    ) external view returns (uint256) {
        (
            uint256 dec0,
            uint256 dec1,
            uint256 r0,
            uint256 r1,
            bool st,
            address t0,

        ) = IPair(router.pairFor(tokenIn, tokenOut, stable)).metadata();
        return
            (_getAmountOut(amountIn, tokenIn, r0, r1, t0, dec0, dec1, st) *
                1e18) / amountIn;
    }

    function _getAmountOut(
        uint256 amountIn,
        address tokenIn,
        uint256 _reserve0,
        uint256 _reserve1,
        address token0,
        uint256 decimals0,
        uint256 decimals1,
        bool stable
    ) internal pure returns (uint256) {
        if (stable) {
            uint256 xy = _k(_reserve0, _reserve1, stable, decimals0, decimals1);
            _reserve0 = (_reserve0 * 1e18) / decimals0;
            _reserve1 = (_reserve1 * 1e18) / decimals1;
            (uint256 reserveA, uint256 reserveB) = tokenIn == token0
                ? (_reserve0, _reserve1)
                : (_reserve1, _reserve0);
            amountIn = tokenIn == token0
                ? (amountIn * 1e18) / decimals0
                : (amountIn * 1e18) / decimals1;
            uint256 y = reserveB - _get_y(amountIn + reserveA, xy, reserveB);
            return (y * (tokenIn == token0 ? decimals1 : decimals0)) / 1e18;
        } else {
            (uint256 reserveA, uint256 reserveB) = tokenIn == token0
                ? (_reserve0, _reserve1)
                : (_reserve1, _reserve0);
            return (amountIn * reserveB) / (reserveA + amountIn);
        }
    }

    function _k(
        uint256 x,
        uint256 y,
        bool stable,
        uint256 decimals0,
        uint256 decimals1
    ) internal pure returns (uint256) {
        if (stable) {
            uint256 _x = (x * 1e18) / decimals0;
            uint256 _y = (y * 1e18) / decimals1;
            uint256 _a = (_x * _y) / 1e18;
            uint256 _b = ((_x * _x) / 1e18 + (_y * _y) / 1e18);
            return (_a * _b) / 1e18; // x3y+y3x >= k
        } else {
            return x * y; // xy >= k
        }
    }
}
