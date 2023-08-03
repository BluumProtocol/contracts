# Solidity API

## AccessManager

This contract manages roles for access control.

### MINTER_ROLE

```solidity
bytes32 MINTER_ROLE
```

### ADMIN_ROLE

```solidity
bytes32 ADMIN_ROLE
```

### constructor

```solidity
constructor() public
```

_Constructor for the AccessManager contract.
Here we setup the default admin role, as well as the custom admin and minter roles,
and assign them all to the account deploying the contract._

