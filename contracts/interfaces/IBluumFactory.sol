// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

/**
 * @title IBluumFactory
 * @notice Interface for the BluumFactory contract
 * @dev This interface should be implemented by the BluumFactory contract.
 */
interface IBluumFactory {
    /// @notice This error is thrown when a non-admin tries to call a function that is admin only
    error OnlyAdminCanCall(address caller);
    /// @notice This error is thrown when a non-minter tries to call a function that is minter only
    error OnlyMinterCanCall(address caller);

    /// @notice Emitted when a new collection is deployed
    event NewCollectionDeployed(address indexed collectionAddress, string name, string symbol);

    /**
     * @dev Returns the address of the collection at a given index
     * @param _index Index of the collection
     * @return _collection Address of the collection
     */
    function getCollectionAddress(uint256 _index) view external returns (address _collection);

    /**
     * @dev Returns an array containing the addresses of all collections
     * @return _collections Array of addresses of all collections
     */
    function getCollectionsAddresses() view external returns (address[] memory _collections);

    /**
     * @dev Returns the number of collections
     * @return _collectionNumber The number of collections
     */
    function getCollectionsNumber() view external returns (uint256 _collectionNumber);

    /**
     * @dev Checks if an address is a collection address
     * @param _collection Address to check
     * @return _isCollectionAddress Boolean indicating whether the address is a collection address
     */
    function isCollectionAddress(address _collection) view external returns (bool _isCollectionAddress);

    /**
     * @dev Sets the address of the BluumNFT contract implementation
     * @param _bluumNftContractImplementation Address of the BluumNFT contract implementation
     */
    function setBluumNftContractImplementation(address _bluumNftContractImplementation) external;

    /**
     * @dev Deploys a new collection
     * @param _name Name of the new collection
     * @param _symbol Symbol of the new collection
     * @return collection Address of the new collection
     */
    function deployCollection(string memory _name, string memory _symbol) external returns (address collection);
}

