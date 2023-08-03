// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

// Importing necessary OpenZeppelin contracts and interfaces
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

// Importing necessary local interfaces
import "./interfaces/IERC20Burnable.sol";
import "./interfaces/IAccessManager.sol";
import "./interfaces/IBluumNft.sol";
import "./interfaces/IDex.sol";

/**
 * @title Dex contract
 * @notice This contract allows for buying NFTs from different collections with different payment tokens.
 */
contract Dex is
    IDex,
    Initializable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{
    using EnumerableSet for EnumerableSet.AddressSet;
    using SafeERC20 for IERC20Burnable;

    IAccessManager public accessManager;

    // Mapping: collection address => ID => payment token address => price
    mapping(address => mapping(uint256 => mapping(address => uint256)))
        private prices;
    // Mapping: collection address => payment tokens addresses
    mapping(address => EnumerableSet.AddressSet) private paymentTokens;
    // Mapping: payment token address => decimals
    mapping(address => uint256) private decimals;
    // Mapping: collection address => SKU => metadata
    mapping(address => mapping(uint256 => IBluumNft.Metadata)) private metadata;
    // Mapping: collection address => SKU => isAvailable
    mapping(address => mapping(uint256 => bool)) private isAvailable;
    // Set of collections addresses
    EnumerableSet.AddressSet private collections;
    // Address of the team wallet
    address private teamWallet;


    /**
     * @dev Contract initializer
     * @param _teamWallet The team wallet address
     * @param _accessManager Access Manager contract instance
     */
    function initialize(
        address _teamWallet,
        IAccessManager _accessManager
    ) public initializer {
        // Revert if any of the addresses is zero address
        if (
            _teamWallet == address(0) || address(_accessManager) == address(0)
        ) {
            revert ZeroAddress();
        }
        // Initializess the reentrancy guard
        __ReentrancyGuard_init();
        // Initializes the upgradeable contract
        __UUPSUpgradeable_init();
        // Settles the team wallet address
        teamWallet = _teamWallet;
        // Settles the team wallet address
        accessManager = _accessManager;
    }

        /**
     * @notice Retrieves the payment tokens for a specific collection
     * @param _collection The collection address
     * @return _tokens An array of payment token addresses for the collection
     */
    function getPaymentTokens(
        address _collection
    ) external view returns (address[] memory _tokens) {
        _tokens = paymentTokens[_collection].values();
    }

    /**
     * @notice Retrieves the metadata for specific tokens in a collection
     * @param _collection The collection address
     * @param _skuIDs An array of SKU IDs
     * @return _metadata An array of Metadata structs containing metadata for the tokens
     */
    function getNftsMetadata(
        address _collection,
        uint256[] calldata _skuIDs
    ) external view returns (IBluumNft.Metadata[] memory _metadata) {
        _metadata = new IBluumNft.Metadata[](_skuIDs.length);
        for (uint256 i = 0; i < _skuIDs.length; ++i) {
            _metadata[i] = metadata[_collection][_skuIDs[i]];
        }
    }

    /**
     * @notice Retrieves the price and decimal values for specific tokens in a collection
     * @param _collection The collection address
     * @param _sku The Sku ID
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
        returns (uint256[] memory _prices, uint256[] memory _decimals)
    {
        _prices = new uint256[](_tokens.length);
        _decimals = new uint256[](_tokens.length);
        for (uint256 i = 0; i < _tokens.length; ++i) {
            _prices[i] = prices[_collection][_sku][_tokens[i]];
            _decimals[i] = decimals[_tokens[i]];
        }
    }

    /**
     * @notice Retrieves the available status for specific tokens in a collection
     * @param _collection The collection address
     * @param _skuIDs An array of SKU IDs
     * @return availableStatus An array of booleans indicating the available status of the tokens
     */
    function getAvailableStatus(
        address _collection,
        uint256[] calldata _skuIDs
    ) external view returns (bool[] memory availableStatus) {
        availableStatus = new bool[](_skuIDs.length);
        for (uint256 i = 0; i < _skuIDs.length; ++i) {
            availableStatus[i] = isAvailable[_collection][_skuIDs[i]];
        }
    }   

    /**
     * @notice Adds new collections to the dex
     * @dev Only admin can call this function
     * @param _collections An array of collection addresses to be added
     */
    function addCollections(
        address[] calldata _collections
    ) external onlyAdmin {
        for (uint256 i = 0; i < _collections.length; ++i) {
            collections.add(_collections[i]);
            emit CollectionAdded(_collections[i]);
        }
    }

    /**
     * @notice Removes collections from the dex
     * @dev Only admin can call this function
     * @param _collections An array of collection addresses to be removed
     */
    function removeCollections(
        address[] calldata _collections
    ) external onlyAdmin {
        for (uint256 i = 0; i < _collections.length; ++i) {
            collections.remove(_collections[i]);
            emit CollectionRemoved(_collections[i]);
        }
    }

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
    ) external onlyAdmin {
        for (uint256 i = 0; i < _skuIDs.length; ++i) {
            metadata[_collection][_skuIDs[i]] = _metadata[i];
            emit MetadataSet(
                _collection,
                _skuIDs[i],
                _metadata[i].publicURI,
                _metadata[i].hashPrivateURI
            );
        }
    }

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
    ) external onlyAdmin {
        for (uint256 i = 0; i < _skuIDs.length; ++i) {
            for (uint256 j = 0; j < _prices[i].paymentTokens.length; ++j) {
                address paymentToken = _prices[i].paymentTokens[j];
                if(!paymentTokens[_collection].contains(paymentToken)) {
                    paymentTokens[_collection].add(paymentToken);
                    emit PaymentTokenAdded(_collection, paymentToken);
                }
                if (decimals[paymentToken] == 0) {
                    revert DecimalsNotSet(paymentToken);
                }
                prices[_collection][_skuIDs[i]][
                    paymentToken
                ] = _prices[i].prices[j];
                emit PriceSet(
                    _collection,
                    _skuIDs[i],
                    paymentToken,
                    _prices[i].prices[j]
                );
            }
        }
    }

    /**
     * @notice Sets the available status for specific tokens in a collection
     * @dev Only admin can call this function
     * @param _collection The collection address
     * @param _skuIDs An array of SKU IDs in the collection
     * @param _isAvailable An array of booleans indicating the available status of the tokens
     */
    function setAvailableStatus(
        address _collection,
        uint256[] calldata _skuIDs,
        bool[] calldata _isAvailable
    ) external onlyAdmin {
        for (uint256 i = 0; i < _skuIDs.length; ++i) {
            isAvailable[_collection][_skuIDs[i]] = _isAvailable[i];
            emit AvailableStatusSet(
                _collection,
                _skuIDs[i],
                _isAvailable[i]
            );
        }
    }

    /**
     * @notice Adds payment tokens for a specific collection
     * @dev Only admin can call this function
     * @param _collection The collection address
     * @param _tokens An array of token addresses to be added as payment options
     */
    function addPaymentTokens(
        address _collection,
        address[] calldata _tokens
    ) external onlyAdmin {
        for (uint256 i = 0; i < _tokens.length; ++i) {
            paymentTokens[_collection].add(_tokens[i]);
            emit PaymentTokenAdded(_collection, _tokens[i]);
        }
    }

    /**
     * @notice Removes payment tokens for a specific collection
     * @dev Only admin can call this function
     * @param _collection The collection address
     * @param _tokens An array of token addresses to be removed from payment options
     */
    function removePaymentTokens(
        address _collection,
        address[] calldata _tokens
    ) external onlyAdmin {
        for (uint256 i = 0; i < _tokens.length; ++i) {
            paymentTokens[_collection].remove(_tokens[i]);
            emit PaymentTokenRemoved(_collection, _tokens[i]);
        }
    }

    /**
     * @notice Sets the decimal values for specific tokens
     * @dev Only admin can call this function
     * @param _tokens An array of token addresses
     * @param _decimals An array of decimal values corresponding to the tokens
     */
    function setDecimals(
        address[] calldata _tokens,
        uint256[] calldata _decimals
    ) external onlyAdmin {
        if (_tokens.length != _decimals.length) {
            revert TokensAndDecimalsLengthMismatch();
        }
        for (uint256 i = 0; i < _tokens.length; ++i) {
            decimals[_tokens[i]] = _decimals[i];
            emit DecimalSet(_tokens[i], _decimals[i]);
        }
    }

    /**
     * @notice Allows a user to buy an NFT from the dex
     * @param _paymentToken The payment token address
     * @param _collection The collection address
     * @param _sku The Sku ID
     */
    function buyNft(
        address _paymentToken,
        address _collection,
        uint256 _sku
    ) external nonReentrant {
        // Reverts if the collection is not available
        if (!collections.contains(_collection)) {
            revert CollectionNotAvailable(_collection);
        }
        // Reverts if the payment token is not available
        if (!paymentTokens[_collection].contains(_paymentToken)) {
            revert PaymentTokenNotAvailable(_paymentToken);
        }
        // Reverts if the price is not set
        uint256 price = prices[_collection][_sku][_paymentToken];
        if (price == 0) {
            revert PriceMustBeGreaterThanZero();
        }
        // Reverts if the token is not available
        if (!isAvailable[_collection][_sku]) {
            revert TokenNotAvailable(_sku);
        }

        // Secure the ID 
        isAvailable[_collection][_sku] = false;

        // Transfers the payment token to the team wallet
        IERC20Burnable paymentToken = IERC20Burnable(_paymentToken);
        uint256 amount = price * (10 ** decimals[_paymentToken]);
        paymentToken.safeTransferFrom(msg.sender, teamWallet, amount);

        // Mints the NFT
        IBluumNft nft = IBluumNft(_collection);
        uint256 tokenID = nft.mint(
            IBluumNft.MintInputData(
                msg.sender,
                metadata[_collection][_sku].publicURI,
                metadata[_collection][_sku].hashPrivateURI
            )   
        );
        emit NftBought(
            _collection,
            _sku,
            tokenID,
            _paymentToken,
            amount,
            msg.sender
        );
    }

    /**
     * @dev Authorizes a contract upgrade
     * @param newImplementation The new contract address
     */
    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyAdmin {}

    /**
     * @notice Checks if the caller is an admin
     */
    modifier onlyAdmin() {
        if (!accessManager.hasRole(keccak256("ADMIN_ROLE"), msg.sender)) {
            revert OnlyAdminCanCall(msg.sender);
        }
        _;
    }
}
