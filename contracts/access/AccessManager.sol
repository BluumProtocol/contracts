// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

// Importing necessary OpenZeppelin contracts
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title AccessManager
 * @notice This contract manages roles for access control.
 */
contract AccessManager is AccessControl {
    // Role identifiers
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /**
     * @dev Constructor for the AccessManager contract.
     * Here we setup the default admin role, as well as the custom admin and minter roles,
     * and assign them all to the account deploying the contract.
     */
    constructor() {
        // Grants the contract deployer the default admin role
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
    }
}
