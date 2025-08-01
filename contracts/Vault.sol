// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Vault {
    address public owner;
    uint256 public vaultBalance;

    constructor() {
        owner = msg.sender;
    }

    function deposit() external payable {
        vaultBalance += msg.value;
    }

    function withdraw(address payable winner) external {
        require(msg.sender == owner, "Only owner");
        uint256 amount = vaultBalance;
        vaultBalance = 0;
        (bool sent,) = winner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}
