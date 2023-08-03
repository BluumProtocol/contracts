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

