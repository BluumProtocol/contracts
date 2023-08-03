// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

/**
 * @title IAccessManager
 * @notice Interface for the AccessManager contract
 * @dev This interface should be implemented by the AccessManager contract.
 */
interface IAccessManager {
    /**
     * @dev Check if an account has a specific role.
     * @param role The role to check for.
     * @param account The address to check for the role.
     * @return A boolean indicating whether the account has the specified role.
     */
    function hasRole(bytes32 role, address account) external view returns (bool);
}
