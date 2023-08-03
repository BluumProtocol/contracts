// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../Dex.sol";

/**
 * @title Dex contract
 * @notice This contract allows for buying NFTs from different collections with different payment tokens.
 */
contract DexV2 is Dex {
    function sayHello() public pure returns (string memory _hello) {
        _hello = "Hello";
    }
}
