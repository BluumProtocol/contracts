# Solidity API

## Dex

This contract allows for buying NFTs from different collections with different payment tokens.

### accessManager

```solidity
contract IAccessManager accessManager
```

### initialize

```solidity
function initialize(address _teamWallet, contract IAccessManager _accessManager) public
```

_Contract initializer_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _teamWallet | address | The team wallet address |
| _accessManager | contract IAccessManager | Access Manager contract instance |

### getPaymentTokens

```solidity
function getPaymentTokens(address _collection) external view returns (address[] _tokens)
```

Retrieves the payment tokens for a specific collection

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collection | address | The collection address |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokens | address[] | An array of payment token addresses for the collection |

### getNftsMetadata

```solidity
function getNftsMetadata(address _collection, uint256[] _skuIDs) external view returns (struct IBluumNft.Metadata[] _metadata)
```

Retrieves the metadata for specific tokens in a collection

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collection | address | The collection address |
| _skuIDs | uint256[] | An array of SKU IDs |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _metadata | struct IBluumNft.Metadata[] | An array of Metadata structs containing metadata for the tokens |

### getPaymentTokenPrice

```solidity
function getPaymentTokenPrice(address _collection, uint256 _sku, address[] _tokens) external view returns (uint256[] _prices, uint256[] _decimals)
```

Retrieves the price and decimal values for specific tokens in a collection

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collection | address | The collection address |
| _sku | uint256 | The Sku ID |
| _tokens | address[] | An array of payment token addresses |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _prices | uint256[] | An array of prices for the tokens |
| _decimals | uint256[] | An array of decimal values for the tokens |

### getAvailableStatus

```solidity
function getAvailableStatus(address _collection, uint256[] _skuIDs) external view returns (bool[] availableStatus)
```

Retrieves the available status for specific tokens in a collection

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collection | address | The collection address |
| _skuIDs | uint256[] | An array of SKU IDs |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| availableStatus | bool[] | An array of booleans indicating the available status of the tokens |

### addCollections

```solidity
function addCollections(address[] _collections) external
```

Adds new collections to the dex

_Only admin can call this function_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collections | address[] | An array of collection addresses to be added |

### removeCollections

```solidity
function removeCollections(address[] _collections) external
```

Removes collections from the dex

_Only admin can call this function_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collections | address[] | An array of collection addresses to be removed |

### setMetadata

```solidity
function setMetadata(address _collection, uint256[] _skuIDs, struct IBluumNft.Metadata[] _metadata) external
```

Sets the metadata for a specific token in a collection

_Only admin can call this function_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collection | address | The collection address |
| _skuIDs | uint256[] | An array of SKU IDs in the collection |
| _metadata | struct IBluumNft.Metadata[] | An array of Metadata structs containing metadata for the tokens |

### setPrices

```solidity
function setPrices(address _collection, struct IDex.Price[] _prices, uint256[] _skuIDs) external
```

Sets the prices for specific tokens in a collection

_Only admin can call this function_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collection | address | The collection address |
| _prices | struct IDex.Price[] | An array of Price structs containing payment tokens and corresponding prices |
| _skuIDs | uint256[] | An array of SKU IDs in the collection |

### setAvailableStatus

```solidity
function setAvailableStatus(address _collection, uint256[] _skuIDs, bool[] _isAvailable) external
```

Sets the available status for specific tokens in a collection

_Only admin can call this function_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collection | address | The collection address |
| _skuIDs | uint256[] | An array of SKU IDs in the collection |
| _isAvailable | bool[] | An array of booleans indicating the available status of the tokens |

### addPaymentTokens

```solidity
function addPaymentTokens(address _collection, address[] _tokens) external
```

Adds payment tokens for a specific collection

_Only admin can call this function_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collection | address | The collection address |
| _tokens | address[] | An array of token addresses to be added as payment options |

### removePaymentTokens

```solidity
function removePaymentTokens(address _collection, address[] _tokens) external
```

Removes payment tokens for a specific collection

_Only admin can call this function_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collection | address | The collection address |
| _tokens | address[] | An array of token addresses to be removed from payment options |

### setDecimals

```solidity
function setDecimals(address[] _tokens, uint256[] _decimals) external
```

Sets the decimal values for specific tokens

_Only admin can call this function_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokens | address[] | An array of token addresses |
| _decimals | uint256[] | An array of decimal values corresponding to the tokens |

### buyNft

```solidity
function buyNft(address _paymentToken, address _collection, uint256 _sku) external
```

Allows a user to buy an NFT from the dex

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _paymentToken | address | The payment token address |
| _collection | address | The collection address |
| _sku | uint256 | The Sku ID |

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal
```

_Authorizes a contract upgrade_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newImplementation | address | The new contract address |

### onlyAdmin

```solidity
modifier onlyAdmin()
```

Checks if the caller is an admin

## BluumFactory

This contract is responsible for creating and managing collections of BluumNFTs.

### accessManager

```solidity
contract IAccessManager accessManager
```

### whitelist

```solidity
contract IWhitelist whitelist
```

### bluumNftContractImplementation

```solidity
address bluumNftContractImplementation
```

### constructor

```solidity
constructor(address _bluumNftContractImplementation, contract IAccessManager _accessManager, contract IWhitelist _whitelist) public
```

_Constructor for the BluumFactory contract._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bluumNftContractImplementation | address | The address of the BluumNft contract implementation. |
| _accessManager | contract IAccessManager | The access manager contract instance. |
| _whitelist | contract IWhitelist | The whitelist contract instance. |

### getCollectionAddress

```solidity
function getCollectionAddress(uint256 _index) external view returns (address _collection)
```

Returns the address of a collection at a given index.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _index | uint256 | The index of the collection. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collection | address | The address of the collection. |

### getCollectionsAddresses

```solidity
function getCollectionsAddresses() external view returns (address[] _collections)
```

Returns the addresses of all collections.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collections | address[] | An array of the addresses of all collections. |

### getCollectionsNumber

```solidity
function getCollectionsNumber() external view returns (uint256 _collectionNumber)
```

Returns the number of collections.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collectionNumber | uint256 | The number of collections. |

### isCollectionAddress

```solidity
function isCollectionAddress(address _collection) external view returns (bool _isCollectionAddress)
```

Checks whether an address is a collection address.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collection | address | The address to check. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _isCollectionAddress | bool | A boolean indicating whether the address is a collection address. |

### setBluumNftContractImplementation

```solidity
function setBluumNftContractImplementation(address _bluumNftContractImplementation) external
```

Sets the address of the BluumNft contract implementation.

_Only the admin can call this function._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bluumNftContractImplementation | address | The address of the BluumNft contract implementation. |

### deployCollection

```solidity
function deployCollection(string _name, string _symbol) external returns (address collection)
```

Deploys a new collection of BluumNFTs.

_Only the admin can call this function._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _name | string | The name of the new collection. |
| _symbol | string | The symbol of the new collection. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| collection | address | The address of the newly deployed collection. |

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

