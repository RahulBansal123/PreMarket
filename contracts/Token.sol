// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    constructor() ERC20("PreToken", "PRE") {
        _mint(address(this), 10000000 * 10**18);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

     function giveTestTokens() public payable{
        require(balanceOf(msg.sender) <= 5 * 10**18, "Can't give more than 5 test tokens");
        
        uint256 preBal = balanceOf(address(this));
        require(preBal >= 1000 * 10**18, "Not enough tokens");

        _transfer(address(this), msg.sender, 5 * 10**18);
    }
}