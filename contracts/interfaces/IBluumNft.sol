// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

// Importing necessary OpenZeppelin interfaces
import "@openzeppelin/contracts-upgradeable/interfaces/IERC721Upgradeable.sol";

/**
 * @title IBluumNft
 * @notice Interface for the BluumNFT contract
 * @dev This interface should be implemented by the BluumNFT contract.
 */
interface IBluumNft is IERC721Upgradeable {
    /**
     * @notice Struct defining NFT metadata.
     * @param publicURI The public URI of the NFT.
     * @param hashPrivateURI The hash of the private URI of the NFT. 
     */
    struct Metadata {
        bytes publicURI;
        bytes32 hashPrivateURI;
    }

    /**
     * @notice Struct defining the input data used in the mint function.
     * @param to The address to mint the NFT to.
     * @param publicURI The public URI of the NFT.
     * @param hashPrivateURI The hash of the private URI of the NFT. 
     */
    struct MintInputData {
        address to;
        bytes publicURI;
        bytes32 hashPrivateURI;
    }

    /// @notice This error is thrown when a non-admin tries to call a function that is admin only
    error OnlyAdminCanCall(address caller);
    /// @notice This error is thrown when a non-minter tries to call a function that is minter only
    error OnlyMinterCanCall(address caller);
    /// @notice This error is thrown when someone other than the factory tries to call a factory only function
    error OnlyFactoryCanCall(address caller);
    /// @notice This error is thrown when an address is not whitelisted
    error IsNotWhitelisted(address caller);
    /// @notice This error is thrown when a token ID has already been minted
    error TokenIdAlreadyMinted(uint256 tokenId);
    /// @notice This error is thrown when an incorrect token ID is provided
    error WrongTokenId(uint256 tokenId);
    /// @notice This error is thrown when a zero address is provided
    error ZeroAddress();
    /// @notice This error that is thrown when a null value is provided
    error NullValue();
    /// @notice This error is thrown when a non-owner tries to call a function that is owner only
    error OnlyTokenOwnerCanCall(address caller);
    /// @notice This error is thrown when a wrong private URI is provided
    error WrongPrivateURI(bytes privateURI);

    /// @notice This event is emitted when a new NFT is minted
    event TokenMinted(uint256 indexed tokenID, address indexed owner);

    /**
     * @notice Mints multiple NFTs.
     * @dev Only callable by a minter.
     * @param _inputDataArray The array of mint input data.
     * @return _tokenIds The array of minted token IDs.
     */
    function mintBatch(
        MintInputData[] calldata _inputDataArray
    ) external returns (uint256[] memory _tokenIds);

    /**
     * @notice Mints an NFT.
     * @param _inputData The mint input data.
     */
    function mint(
        MintInputData calldata _inputData
    ) external returns (uint256 _tokenId);

    /**
     * @notice Reveals the private URI of an NFT.
     * @dev Only callable by the owner of the NFT.
     * @param _tokenId The ID of the NFT to reveal the private URI.
     * @param privateURI The private URI of the NFT.
     */
    function revealPrivateURI(
        uint256 _tokenId,
        bytes calldata privateURI
    ) external;

    /**
     * @dev Returns the metadata of the token.
     * @param _tokenId The ID of the token to get the metadata of.
     * @return _metadata The metadata of the token.
     */
    function exists(uint256 _tokenId) external view returns (bool);

    /**
     * @notice Returns the URI of the token metadata.
     * @param _tokenId The ID of the token to get the URI of.
     * @return A string representing the token URI.
     */
    function tokenURI(
        uint256 _tokenId
    ) external view returns (string memory);
}
