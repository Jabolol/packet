// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.19;

// import {console} from "contracts/libraries/console.sol";

// DataTypes used in storage
library STypes {
    // 2 slots

    struct Teleoperator {
        address adminAddress;
        uint256 transactionFee;
        uint256 withdrawalFee;
        uint256 totalDataAvailable;
        uint256 totalDataSold;
        uint256 pricePerMegaByte; // price per mega byte -> 1000 mega bytes = 1 giga byte
    }

    // data availabe outside the system
    struct TeleoperatorUser {
        // SLOT 2: 160 + 88 + 88 + 8 = 344 (24 unused)
        address addr;
        uint256 mobileDataEscrowed;
        bool isFrozen; // 8 bits
    }
}
// @dev DataTypes only used in memory

library MTypes {
   
}
