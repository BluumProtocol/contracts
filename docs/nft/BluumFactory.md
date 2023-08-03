# Solidity API

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

