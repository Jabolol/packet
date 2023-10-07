// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DataToken is ERC20 {
    address private immutable diamond;
    uint256 public tranferFee;
    uint256 public totalFee;
    address public feeCollector;

    error NotDiamond();

    constructor(address diamondAddr, string memory name, string memory symbol) ERC20(name, symbol) {
        diamond = diamondAddr;
    }

    modifier onlyDiamond() {
        if (msg.sender != diamond) {
            revert NotDiamond();
        }
        _;
    }

    function mint(address to, uint256 amount) external onlyDiamond {
        _mint(to, amount);
    }

    function burnFrom(address account, uint256 amount) external onlyDiamond {
        _burn(account, amount);
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        uint256 amountBefore = amount;
        amount = amount * (100 - tranferFee) / 100;
        uint256 fee = amountBefore - amount;
        _IncreseTotalCollectedFee(fee);
        _transfer(_msgSender(), to, amount);
        return true;
    }

    function setTransferFee(uint256 NewFee) external onlyDiamond {
        tranferFee = NewFee;
    }

    function _IncreseTotalCollectedFee(uint256 NewFee) internal onlyDiamond {
        totalFee += NewFee;
    }

    function withdrawFee() external onlyDiamond returns (uint256) {
        totalFee = 0;
        _transfer(feeCollector, diamond, totalFee);
        return (totalFee);
    }
}
