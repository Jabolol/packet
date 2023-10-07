// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.19;

// import {console} from "contracts/libraries/console.sol";


// DataTypes used in storage
library STypes {
    // 2 slots
    
    struct Teleoperator {
        // SLOT 1: 160 + 8 + 8 = 176 (80 unused)
        address adminAddress;
        uint8 transactionFee;
        uint8 withdrawalFee;
    }

    struct TeleoperatorUser {
        // SLOT 1: 160 + 8 + 8 = 176 (80 unused)
        address addr;
        uint88 dataEscrowed;
        bool isFrozen; // 8 bits
    }

}

// @dev DataTypes only used in memory
library MTypes {
    
}
