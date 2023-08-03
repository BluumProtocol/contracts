// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

/**
 * @title IWhitelist
 * @notice Interface for the Whitelist contract
 * @dev This interface should be implemented by the Whitelist contract.
 */
interface IWhitelist {
    /// @notice This error is thrown when a non-admin tries to call a function that is admin only
    error OnlyAdminCanCall(address caller);

    /// @notice Emitted when the whitelist requirement is updated for a collection
    event WhitelistRequired(address indexed collection, bool isWhitelistRequired);
    /// @notice Emitted when an address is added to the whitelist for a collection
    event AddedToWhitelist(address indexed collection, address indexed account);
    /// @notice Emitted when an address is removed from the whitelist for a collection
    event RemovedFromWhitelist(address indexed collection, address indexed account);

    /**
     * @notice Function to set the whitelist requirement for a specific collection.
     * @param _collection The collection to set the requirement for.
     * @param _isWhitelistRequired Whether the whitelist is required or not.
     */
    function setWhitelistRequired(
        address _collection,
        bool _isWhitelistRequired
    ) external;
    
    /**
     * @notice Determines if an address is whitelisted for a given collection.
     * @param _address The address to check for whitelist status.
     * @param _collection The address of the collection to check.
     * @return _isWhitelisted A boolean value indicating whether the given address is whitelisted for the given collection.
     */
    function isWhitelisted(address _address, address _collection) view external returns (bool _isWhitelisted);

    /**
     * @notice Add multiple addresses to the whitelist for a specific collection.
     * @param _addresses An array of addresses to add to the whitelist.
     * @param _collection The address of the collection for which to update the whitelist.
     */
    function addToWhitelist(address[] memory _addresses, address _collection) external;

    /**
     * @notice Remove multiple addresses from the whitelist for a specific collection.
     * @param _addresses An array of addresses to remove from the whitelist.
     * @param _collection The address of the collection for which to update the whitelist.
     */
    function removeFromWhitelist(address[] memory _addresses, address _collection) external;
}
