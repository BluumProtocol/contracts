// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../nft/BluumNft.sol";

contract BluumNftV2 is BluumNft {
    function sayHello() public pure returns (string memory _hello) {
        _hello = "Hello";
    }
}