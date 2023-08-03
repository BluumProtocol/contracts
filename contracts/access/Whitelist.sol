// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

// Importing necessary local interfaces
import "../interfaces/IAccessManager.sol";
import "../interfaces/IWhitelist.sol";

/**
 * @title Whitelist
 * @notice This contract manages a whitelist for each collection.
 */
contract Whitelist is IWhitelist {
    // Instance of the access manager
    IAccessManager public accessManager;

    // Mapping from collection to whitelist mapping of addresses
    mapping(address => mapping(address => bool)) private whitelistByCollection;
    // Mapping from collection to the requirement of whitelist
    mapping(address => bool) public isWhitelistRequired;

    /**
     * @dev Constructor for the Whitelist contract.
     * @param _accessManager The address of the AccessManager contract.
     */
    constructor(IAccessManager _accessManager) {
        accessManager = _accessManager;
    }

    /**
     * @notice Function to check whether an address is whitelisted for a specific collection.
     * @param _address The address to check.
     * @param _collection The collection to check against.
     * @return _isWhitelisted The whitelist status.
     */
    function isWhitelisted(
        address _address,
        address _collection
    ) external view returns (bool _isWhitelisted) {
        // If whitelist is required, check the whitelist mapping
        if (isWhitelistRequired[_collection]) {
            // If the address is not whitelisted, return false
            _isWhitelisted = whitelistByCollection[_collection][_address];
        } else {
            // If whitelist is not required, return true
            _isWhitelisted = true;
        }
    }

    /**
     * @notice Function to set the whitelist requirement for a specific collection.
     * @param _collection The collection to set the requirement for.
     * @param _isWhitelistRequired Whether the whitelist is required or not.
     */
    function setWhitelistRequired(
        address _collection,
        bool _isWhitelistRequired
    ) external {
        // Reverts if the caller is not an admin
        if (!accessManager.hasRole(keccak256("ADMIN_ROLE"), msg.sender)) {
            revert OnlyAdminCanCall(msg.sender);
        }
        isWhitelistRequired[_collection] = _isWhitelistRequired;
        emit WhitelistRequired(_collection, _isWhitelistRequired);
    }

    /**
     * @notice Function to add addresses to the whitelist for a specific collection.
     * @dev Only callable by an admin.
     * @param _addresses The array of addresses to add.
     * @param _collection The collection to add the addresses to.
     */
    function addToWhitelist(
        address[] calldata _addresses,
        address _collection
    ) external {
        // Reverts if the caller is not an admin
        if (!accessManager.hasRole(keccak256("ADMIN_ROLE"), msg.sender)) {
            revert OnlyAdminCanCall(msg.sender);
        }
        for (uint256 i = 0; i < _addresses.length; ++i) {
            whitelistByCollection[_collection][_addresses[i]] = true;
            emit AddedToWhitelist(_collection, _addresses[i]);
        }
    }

    /**
     * @notice Function to remove addresses from the whitelist for a specific collection.
     * @dev Only callable by an admin.
     * @param _addresses The array of addresses to remove.
     * @param _collection The collection to remove the addresses from.
     */
    function removeFromWhitelist(
        address[] calldata _addresses,
        address _collection
    ) external {
        // Reverts if the caller is not an admin
        if (!accessManager.hasRole(keccak256("ADMIN_ROLE"), msg.sender)) {
            revert OnlyAdminCanCall(msg.sender);
        }
        for (uint256 i = 0; i < _addresses.length; ++i) {
            whitelistByCollection[_collection][_addresses[i]] = false;
            emit RemovedFromWhitelist(_collection, _addresses[i]);
        }
    }
}
