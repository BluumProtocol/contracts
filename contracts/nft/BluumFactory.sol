// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

// Importing necessary OpenZeppelin contracts
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

// Importing necessary local contracts and interfaces
import "./BluumNft.sol";
import "../interfaces/IAccessManager.sol";
import "../interfaces/IBluumFactory.sol";
import "../interfaces/IWhitelist.sol";

/**
 * @title BluumFactory
 * @notice This contract is responsible for creating and managing collections of BluumNFTs.
 */
contract BluumFactory is IBluumFactory {
    using EnumerableSet for EnumerableSet.AddressSet;

    // Set of all deployed collections.
    EnumerableSet.AddressSet private collections;

    // Contract instances
    IAccessManager public accessManager;
    IWhitelist public whitelist;

    // Address of the BluumNft contract implementation.
    address public bluumNftContractImplementation;

    /**
     * @dev Constructor for the BluumFactory contract.
     * @param _bluumNftContractImplementation The address of the BluumNft contract implementation.
     * @param _accessManager The access manager contract instance.
     * @param _whitelist The whitelist contract instance.
     */
    constructor(
        address _bluumNftContractImplementation,
        IAccessManager _accessManager,
        IWhitelist _whitelist
    ) {
        // Sets the BluumNft contract implementation address.
        bluumNftContractImplementation = _bluumNftContractImplementation;
        // Sets the access manager contract instance.
        accessManager = _accessManager;
        // Sets the whitelist contract instance.
        whitelist = _whitelist;
    }

    /**
     * @notice Returns the address of a collection at a given index.
     * @param _index The index of the collection.
     * @return _collection The address of the collection.
     */
    function getCollectionAddress(
        uint256 _index
    ) external view returns (address _collection) {
        _collection = collections.at(_index);
    }

    /**
     * @notice Returns the addresses of all collections.
     * @return _collections An array of the addresses of all collections.
     */
    function getCollectionsAddresses()
        external
        view
        returns (address[] memory _collections)
    {
        _collections = collections.values();
    }

    /**
     * @notice Returns the number of collections.
     * @return _collectionNumber The number of collections.
     */
    function getCollectionsNumber()
        external
        view
        returns (uint256 _collectionNumber)
    {
        _collectionNumber = collections.length();
    }

    /**
     * @notice Checks whether an address is a collection address.
     * @param _collection The address to check.
     * @return _isCollectionAddress A boolean indicating whether the address is a collection address.
     */
    function isCollectionAddress(
        address _collection
    ) external view returns (bool _isCollectionAddress) {
        _isCollectionAddress = collections.contains(_collection);
    }

    /**
     * @notice Sets the address of the BluumNft contract implementation.
     * @dev Only the admin can call this function.
     * @param _bluumNftContractImplementation The address of the BluumNft contract implementation.
     */
    function setBluumNftContractImplementation(
        address _bluumNftContractImplementation
    ) external {
        // Reverts if the caller is not the admin.
        if (!accessManager.hasRole(keccak256("ADMIN_ROLE"), msg.sender)) {
            revert OnlyAdminCanCall(msg.sender);
        }
        bluumNftContractImplementation = _bluumNftContractImplementation;
    }

    /**
     * @notice Deploys a new collection of BluumNFTs.
     * @dev Only the admin can call this function.
     * @param _name The name of the new collection.
     * @param _symbol The symbol of the new collection.
     * @return collection The address of the newly deployed collection.
     */
    function deployCollection(
        string memory _name,
        string memory _symbol
    ) external returns (address collection) {
        // Reverts if the caller is not the admin.
        if (!accessManager.hasRole(keccak256("ADMIN_ROLE"), msg.sender)) {
            revert OnlyAdminCanCall(msg.sender);
        }
        // Clones the BluumNft contract implementation.
        BluumNft newCollection = BluumNft(
            Clones.clone(bluumNftContractImplementation)
        );
        // Initializes the new collection.
        newCollection.initialize(_name, _symbol, accessManager, whitelist);
        // Adds the new collection to the collections set.
        collections.add(address(newCollection));
        collection = address(newCollection);
        emit NewCollectionDeployed(address(newCollection), _name, _symbol);
    }
}
