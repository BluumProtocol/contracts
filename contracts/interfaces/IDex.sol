// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// Importing necessary OpenZeppelin interfaces 
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// Importing necessary local interfaces
import "./IBluumNft.sol";

/**
 * @title IDex interface
 * @notice This contract defines the functions of the Dex contract.
 * @dev This interface should be implemented by the Dex contract.
 */
interface IDex {
    /**
     * @notice Struct defining the price of an NFT.
     * @param paymentTokens An array of payment token addresses.
     * @param prices An array of prices for the payment tokens.
     */
    struct Price {
        address[] paymentTokens;
        uint256[] prices;
    }

    /// @notice This error is thrown when tokens and decimals length mismatch
    error TokensAndDecimalsLengthMismatch();
    /// @notice This error is thrown when tokens and price length mismatch
    error TokensAndPriceLengthMismatch();
    /// @notice This error is thrown when the caller is not an admin
    error OnlyAdminCanCall(address caller);
    /// @notice This error is thrown when a collection is not available
    error CollectionNotAvailable(address collection);
    /// @notice This error is thrown when a token is not available
    error TokenNotAvailable(uint256 tokenId);
    /// @notice This error is thrown when a payment token is not available
    error PaymentTokenNotAvailable(address paymentToken);
    /// @notice This error is thrown when the price is not set
    error PriceMustBeGreaterThanZero();
    /// @notice This error is thrown when a zero address is passed
    error ZeroAddress();
    /// @notice This error is thrown when the decimals is not set for a token
    error DecimalsNotSet(address paymentToken);

    /// @notice Emitted when a collection is added
    event CollectionAdded(address collection);
    /// @notice Emitted when a collection is removed
    event CollectionRemoved(address collection);
    /// @notice Emitted when a payment token is added
    event PaymentTokenAdded(address indexed collection, address paymentToken);
    /// @notice Emitted when a payment token is removed
    event PaymentTokenRemoved(address indexed collection, address paymentToken);
    /// @notice Emitted when a price is set
    event PriceSet(address indexed collection, uint256 indexed sku, address paymentToken, uint256 price);
    /// @notice Emitted when a decimal value is set
    event DecimalSet(address indexed paymentToken, uint256 decimals);
    /// @notice Emitted when the metadata is set
    event MetadataSet(address indexed collection, uint256 indexed sku, bytes publicURI, bytes32 hashPrivateURI);
    /// @notice Emitted when the available status is set
    event AvailableStatusSet(address indexed collection, uint256 indexed sku, bool isAvailable);
    /// @notice Emitted when an NFT is bought
    event NftBought(address indexed collection, uint256 indexed sku, uint256 indexed tokenId, address paymentToken, uint256 price, address buyer);

    /**
     * @notice Adds new collections to the dex
     * @dev Only admin can call this function
     * @param _collections An array of collection addresses to be added
     */
    function addCollections(
        address[] calldata _collections
    ) external;

    /**
     * @notice Removes collections from the dex
     * @dev Only admin can call this function
     * @param _collections An array of collection addresses to be removed
     */
    function removeCollections(
        address[] calldata _collections
    ) external;

    /**
     * @notice Sets the metadata for a specific token in a collection
     * @dev Only admin can call this function
     * @param _collection The collection address
     * @param _skuIDs An array of SKU IDs in the collection
     * @param _metadata An array of Metadata structs containing metadata for the tokens
     */
    function setMetadata(
        address _collection,
        uint256[] calldata _skuIDs,
        IBluumNft.Metadata[] calldata _metadata
    ) external;

    /**
     * @notice Sets the prices for specific tokens in a collection
     * @dev Only admin can call this function
     * @param _collection The collection address
     * @param _prices An array of Price structs containing payment tokens and corresponding prices
     * @param _skuIDs An array of SKU IDs in the collection
     */
    function setPrices(
        address _collection,
        Price[] calldata _prices,
        uint256[] calldata _skuIDs
    ) external;

    /**
     * @notice Adds payment tokens for a specific collection
     * @dev Only admin can call this function
     * @param _collection The collection address
     * @param _tokens An array of token addresses to be added as payment options
     */
    function addPaymentTokens(
        address _collection,
        address[] calldata _tokens
    ) external;

    /**
     * @notice Removes payment tokens for a specific collection
     * @dev Only admin can call this function
     * @param _collection The collection address
     * @param _tokens An array of token addresses to be removed from payment options
     */
    function removePaymentTokens(
        address _collection,
        address[] calldata _tokens
    ) external;

    /**
     * @notice Sets the decimal values for specific tokens
     * @dev Only admin can call this function
     * @param _tokens An array of token addresses
     * @param _decimals An array of decimal values corresponding to the tokens
     */
    function setDecimals(
        address[] calldata _tokens,
        uint256[] calldata _decimals
    ) external;

    /**
     * @notice Retrieves the payment tokens for a specific collection
     * @param _collection The collection address
     * @return _tokens An array of payment token addresses for the collection
     */
    function getPaymentTokens(
        address _collection
    ) external view returns (address[] memory _tokens);

    /**
     * @notice Retrieves the available status for specific tokens in a collection
     * @param _collection The collection address
     * @param _skuIDs An array of SKU IDs
     * @return availableStatus An array of booleans indicating the available status of the tokens
     */
    function getAvailableStatus(
        address _collection,
        uint256[] calldata _skuIDs
    ) external view returns (bool[] memory availableStatus);

    /**
     * @notice Retrieves the metadata for specific tokens in a collection
     * @param _collection The collection address
     * @param _skuIDs An array of SKU IDs in the collection
     * @return _metadata An array of Metadata structs containing metadata for the tokens
     */
    function getNftsMetadata(
        address _collection,
        uint256[] calldata _skuIDs
    ) external view returns (IBluumNft.Metadata[] memory _metadata);

    /**
     * @notice Retrieves the price and decimal values for specific tokens in a collection
     * @param _collection The collection address
     * @param _sku The SKU ID
     * @param _tokens An array of payment token addresses
     * @return _prices An array of prices for the tokens
     * @return _decimals An array of decimal values for the tokens
     */
    function getPaymentTokenPrice(
        address _collection,
        uint256 _sku,
        address[] calldata _tokens
    )
        external
        view
        returns (uint256[] memory _prices, uint256[] memory _decimals);

    /**
     * @notice Allows a user to buy an NFT from the dex
     * @param _paymentToken The payment token address
     * @param _collection The collection address
     * @param _sku The SKU ID
     */
    function buyNft(
        address _paymentToken,
        address _collection,
        uint256 _sku
    ) external;

}
