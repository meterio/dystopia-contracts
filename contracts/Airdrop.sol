// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./lib/SafeERC20.sol";
import "./lib/MerkleProof.sol";
import "./lib/AccessControl.sol";
import "./interface/IERC20.sol";
import "./interface/IVe.sol";

contract Airdrop is AccessControl {
    using SafeERC20 for IERC20;

    address public token;
    address public ve;
    uint256 public constant LOCK_DURATIOIN = 3600 * 24 * 365 * 2; // 2 years
    mapping(bytes32 => bool) public roots;
    mapping(bytes32 => mapping(address => bool)) public claimed;
    event SetRoot(bytes32 indexed root, bool valid);

    constructor(address _token, address _ve) {
        token = _token;
        ve = _ve;
        IERC20(token).approve(ve, ~uint256(0));
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setRoot(bytes32 root) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "forbidden");
        roots[root] = !roots[root];
        emit SetRoot(root, roots[root]);
    }

    function withdraw(address asset, uint256 amount) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "forbidden");
        IERC20(asset).safeTransfer(msg.sender, amount);
    }

    function verify(
        bytes32[] calldata proof,
        bytes32 root,
        uint256 amount
    ) public view returns (bool) {
        return
            MerkleProof.verify(
                proof,
                root,
                keccak256(abi.encode(amount, msg.sender))
            );
    }

    function claim(
        bytes32[] calldata proof,
        bytes32 root,
        uint256 amount
    ) public {
        require(roots[root], "invalid root!");
        require(!claimed[root][msg.sender], "aleardy claimed!");
        claimed[root][msg.sender] = true;
        require(verify(proof, root, amount), "invalid merkle proof");
        IVe(ve).createLockFor(amount, LOCK_DURATIOIN, msg.sender);
    }
}
