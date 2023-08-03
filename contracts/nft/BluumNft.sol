// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

// Importing necessary OpenZeppelin contracts
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// Importing necessary local contracts and interfaces
import "./BluumFactory.sol";
import "../interfaces/IAccessManager.sol";
import "../interfaces/IBluumNft.sol";
import "../interfaces/IWhitelist.sol";

/**
 * @title BluumNft
 * @notice This contract is responsible for all operations related to Bluum NFTs including minting and metadata management.
 */
contract BluumNft is IBluumNft, ERC721Upgradeable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    // Mapping from token ID to Metadata.
    mapping(uint256 => Metadata) private tokenMetadata;

    // Counter to keep track of the token IDs.
    Counters.Counter private tokenIdTracker;

    // Bluum Factory contract instance.
    BluumFactory public factory;
    // Access Manager contract instance.
    IAccessManager public accessManager;
    // Whitelist contract instance.
    IWhitelist public whitelist;

    /**
     * @dev Initializes the contract.
     * @param _name The name of the NFT.
     * @param _symbol The symbol of the NFT.
     * @param _accessManager The access manager contract address.
     * @param _whitelist The whitelist contract address.
     */
    function initialize(
        string memory _name,
        string memory _symbol,
        IAccessManager _accessManager,
        IWhitelist _whitelist
    ) external initializer {
        // Reverts if the whitelist or access manager address is zero address.
        if (
            address(_whitelist) == address(0) ||
            address(_accessManager) == address(0)
        ) {
            revert ZeroAddress();
        }
        // Reverts if the name or symbol is empty.
        if (bytes(_name).length == 0 || bytes(_symbol).length == 0) {
            revert NullValue();
        }

        // Sets the Bluum Factory contract instance.
        factory = BluumFactory(msg.sender);

        // Initializes the ERC721 contract.
        __ERC721_init(_name, _symbol);

        // Sets the access manager contract address.
        accessManager = _accessManager;
        // Sets the whitelist contract address.
        whitelist = _whitelist;
    }

    /**
     * @notice Mints multiple NFTs.
     * @dev Only callable by a minter.
     * @param _mintInputData The array of mint input data.
     * @return _tokenIds The array of minted token IDs.
     */
    function mintBatch(
        MintInputData[] calldata _mintInputData
    ) external returns (uint256[] memory _tokenIds) {
        _tokenIds = new uint256[](_mintInputData.length);
        for (uint256 i = 0; i < _mintInputData.length; ++i) {
            _tokenIds[i] = mint(
                _mintInputData[i]
            );
        }
    }

    /**
     * @notice Mints an NFT.
     * @dev Only callable by a minter.
     * @param _inputData The mint input data.
     * @return _tokenId The ID of the minted NFT.
     */
    function mint(
        MintInputData calldata _inputData
    ) public returns (uint256 _tokenId) {
        // Reverts if the caller is not a minter.
        if (!accessManager.hasRole(keccak256("MINTER_ROLE"), msg.sender)) {
            revert OnlyMinterCanCall(msg.sender);
        }
        // Reverts if the recipient is not whitelisted.
        if (!whitelist.isWhitelisted(_inputData.to, address(this))) {
            revert IsNotWhitelisted(_inputData.to);
        }

        // Gets the next token ID.
        _tokenId = tokenIdTracker.current();
        tokenIdTracker.increment();

        // Sets the token metadata.
        Metadata storage metadata = tokenMetadata[_tokenId];
        metadata.hashPrivateURI = _inputData.hashPrivateURI;
        metadata.publicURI = _inputData.publicURI;

        // Mints the token.
        _safeMint(_inputData.to, _tokenId);
        emit TokenMinted(_tokenId, _inputData.to);

        return _tokenId;
    }

    /**
     * @notice Reveals the private URI of an NFT.
     * @dev Only callable by the owner of the NFT.
     * @param _tokenId The ID of the NFT to reveal the private URI.
     * @param privateURI The private URI of the NFT.
     */
    function revealPrivateURI(
        uint256 _tokenId,
        bytes calldata privateURI
    ) external {
        // Reverts if the caller is not the owner of the token.
        if (msg.sender != ownerOf(_tokenId)) {
            revert OnlyTokenOwnerCanCall(msg.sender);
        }
        // Reverts if the private IPFS hash is not the same as the one hashed.
        if(keccak256(privateURI) != tokenMetadata[_tokenId].hashPrivateURI) {
            revert WrongPrivateURI(privateURI);
        }
        // Updates the token metadata.
        tokenMetadata[_tokenId].publicURI = privateURI;
    }

    /**
     * @notice Returns true if a token exists
     * @param _tokenId The ID of the token
     * @return isMinted The state of the minting
     */
    function exists(uint256 _tokenId) external view returns (bool isMinted) {
        return _exists(_tokenId);
    }

    /**
     * @notice Returns the URI of the token metadata.
     * @param _tokenId The ID of the token to get the URI of.
     * @return A string representing the token URI.
     */
    function tokenURI(
        uint256 _tokenId
    ) public view override (ERC721Upgradeable, IBluumNft) returns (string memory) {
        // Reverts if the token does not exist.
        if (!_exists(_tokenId)) {
            revert WrongTokenId(_tokenId);
        }

        // Returns the URI 
        return (
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(tokenMetadata[_tokenId].publicURI)
                )
            )
        );
    }
}
