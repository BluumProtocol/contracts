// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title IERC20Burnable
 * @notice Interface for ERC20Burnable contract, extending the interface of IERC20
 */
interface IERC20Burnable is IERC20 {
    /**
     * @notice Destroys `amount` tokens from the caller.
     * @dev A method to burn tokens directly from the token holder.
     * @param amount The quantity of tokens to burn from the caller.
     */
    function burn(uint256 amount) external;

    /**
     * @notice Destroys `amount` tokens from `account`, deducting from the caller's allowance.
     * @dev A method to burn tokens from an approved allowance. The burn allowance is consumed.
     * @param account Address from which tokens will be burned.
     * @param amount The quantity of tokens to burn from `account`.
     */
    function burnFrom(address account, uint256 amount) external;
}
