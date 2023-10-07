// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.19;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {Errors} from "../libraries/Errors.sol";

import {STypes} from "./DataTypes.sol";
// import {Constants} from "../libraries/Constants.sol";

// import {console} from "contracts/libraries/console.sol";

struct AppStorage {
    address admin;
    mapping(address => bool) isValidteleoperator; // valid is that teleoperator is added by the admin
    mapping(bytes4 teleoperatorSelector => STypes.Teleoperator) teleoperators; // all the teleoperators (teleoperator selector)
    mapping(bytes4 teleoperatorSelector => mapping(address userAddress => STypes.TeleoperatorUser)) teleoperatorUser; // all the asset users
    mapping(bytes4 teloperatorSelector => mapping(address user => bool)) existInTeloperator; // all the users of a teleoperator
    mapping (bytes4 teleoperatorSelector => mapping(address admin => bool)) isTeleoperatorAdmin; // whitlelist address to exexute transactions as admin
    mapping (address adminAddres => bytes4 teleoperatorSelector) adminToTeleoperatorSelector; // admin address to teleoperator selector
}

function appStorage() pure returns (AppStorage storage s) {
    // solhint-disable-next-line no-inline-assembly
    assembly {
        s.slot := 0
    }
}

contract Modifiers { // modifiers
    AppStorage internal s;
    // put all the modifiers

    modifier onlyValidTeleoperator(address teleoperator) {
        if (!s.isValidteleoperator[teleoperator]) {
            revert Errors.TeleoperatorNotValid(teleoperator);
        }
        _;
    }

    modifier onlyTeleoperatorAdmin(bytes4 teleoperatorSelector) {
        if (!s.isTeleoperatorAdmin[teleoperatorSelector][msg.sender]) {
            revert Errors.NotAdmin();
        }
        _;
    }

    modifier onlyAdmin() {
        LibDiamond.enforceIsContractOwner();
        _;
    }

    modifier onlyDiamond() {
        if (msg.sender != address(this)) revert Errors.NotDiamond();
        _;
    }

    modifier onlyValidUser(bytes4 teleoperatorSelector, address userAddress) {
        if (!s.existInTeloperator[teleoperatorSelector][userAddress]) {
            revert Errors.userNotFoundInTeleoperator(userAddress);
        }
        _;
    }
}
