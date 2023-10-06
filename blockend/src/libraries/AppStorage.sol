// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.19;

import {LibDiamond} from "../libraries/LibDiamond.sol";
// import {Errors} from "../libraries/Errors.sol";
// import {Constants} from "../libraries/Constants.sol";

// import {console} from "contracts/libraries/console.sol";

struct AppStorage {
    // the variables
    // mappings
    // no custom arrays
    address admin;
    
}
function appStorage() pure returns (AppStorage storage s) {
    // solhint-disable-next-line no-inline-assembly
    assembly {
        s.slot := 0
    }
}

// ! put all the modifiers here

contract Modifiers { // modifiers
    AppStorage internal s; 
   // put all the modifiers
}
