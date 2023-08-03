# Solidity API

## Whitelist

This contract manages a whitelist for each collection.

### accessManager

```solidity
contract IAccessManager accessManager
```

### isWhitelistRequired

```solidity
mapping(address => bool) isWhitelistRequired
```

### constructor

```solidity
constructor(contract IAccessManager _accessManager) public
```

_Constructor for the Whitelist contract._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _accessManager | contract IAccessManager | The address of the AccessManager contract. |

### isWhitelisted

```solidity
function isWhitelisted(address _address, address _collection) external view returns (bool _isWhitelisted)
```

Function to check whether an address is whitelisted for a specific collection.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _address | address | The address to check. |
| _collection | address | The collection to check against. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _isWhitelisted | bool | The whitelist status. |

### setWhitelistRequired

```solidity
function setWhitelistRequired(address _collection, bool _isWhitelistRequired) external
```

Function to set the whitelist requirement for a specific collection.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _collection | address | The collection to set the requirement for. |
| _isWhitelistRequired | bool | Whether the whitelist is required or not. |

### addToWhitelist

```solidity
function addToWhitelist(address[] _addresses, address _collection) external
```

Function to add addresses to the whitelist for a specific collection.

_Only callable by an admin._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _addresses | address[] | The array of addresses to add. |
| _collection | address | The collection to add the addresses to. |

### removeFromWhitelist

```solidity
function removeFromWhitelist(address[] _addresses, address _collection) external
```

Function to remove addresses from the whitelist for a specific collection.

_Only callable by an admin._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _addresses | address[] | The array of addresses to remove. |
| _collection | address | The collection to remove the addresses from. |

