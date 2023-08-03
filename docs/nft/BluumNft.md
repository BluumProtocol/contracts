# Solidity API

## BluumNft

This contract is responsible for all operations related to Bluum NFTs including minting and metadata management.

### factory

```solidity
contract BluumFactory factory
```

### accessManager

```solidity
contract IAccessManager accessManager
```

### whitelist

```solidity
contract IWhitelist whitelist
```

### initialize

```solidity
function initialize(string _name, string _symbol, contract IAccessManager _accessManager, contract IWhitelist _whitelist) external
```

_Initializes the contract._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _name | string | The name of the NFT. |
| _symbol | string | The symbol of the NFT. |
| _accessManager | contract IAccessManager | The access manager contract address. |
| _whitelist | contract IWhitelist | The whitelist contract address. |

### mintBatch

```solidity
function mintBatch(struct IBluumNft.MintInputData[] _mintInputData) external returns (uint256[] _tokenIds)
```

Mints multiple NFTs.

_Only callable by a minter._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _mintInputData | struct IBluumNft.MintInputData[] | The array of mint input data. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenIds | uint256[] | The array of minted token IDs. |

### mint

```solidity
function mint(struct IBluumNft.MintInputData _inputData) public returns (uint256 _tokenId)
```

Mints an NFT.

_Only callable by a minter._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _inputData | struct IBluumNft.MintInputData | The mint input data. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint256 | The ID of the minted NFT. |

### revealPrivateURI

```solidity
function revealPrivateURI(uint256 _tokenId, bytes privateURI) external
```

Reveals the private URI of an NFT.

_Only callable by the owner of the NFT._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint256 | The ID of the NFT to reveal the private URI. |
| privateURI | bytes | The private URI of the NFT. |

### exists

```solidity
function exists(uint256 _tokenId) external view returns (bool isMinted)
```

Returns true if a token exists

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint256 | The ID of the token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| isMinted | bool | The state of the minting |

### tokenURI

```solidity
function tokenURI(uint256 _tokenId) public view returns (string)
```

Returns the URI of the token metadata.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenId | uint256 | The ID of the token to get the URI of. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | A string representing the token URI. |

