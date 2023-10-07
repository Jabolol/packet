// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.19;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {Errors} from "../libraries/Errors.sol";

import {STypes} from "./DataTypes.sol";
// import {Constants} from "../libraries/Constants.sol";

// import {console} from "contracts/libraries/console.sol";

struct AppStorage {
    // the variables
    // mappings
    // no custom arrays
    address admin;
    mapping(address => bool) isValidteleoperator; // valid is that teleoperator is added by the admin
    mapping(bytes4 name => STypes.Teleoperator) teleoperators; // all the teleoperators (teleoperator selector)
    mapping(address teleoperator => mapping(uint64 userId => STypes.TeleoperatorUser)) teleoperatorUser; // all the asset users
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

    modifier onlyValidTeleoperator(address teleoperator) {
        if (!s.isValidteleoperator[teleoperator]) {
            revert Errors.TeleoperatorNotValid(teleoperator);
        }
        _;
    }

    modifier onlyAdmin() {
        LibDiamond.enforceIsContractOwner();
        _;
    }
}
