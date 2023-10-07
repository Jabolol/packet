// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Modifiers} from "../libraries/AppStorage.sol";
import {STypes} from "../libraries/DataTypes.sol";
import {Errors} from "../libraries/Errors.sol";

contract OwnerFacet is Modifiers {
    // function to withelist a new teleoperator

    // !! change by the instance
    function addTeleoperator(address teleoperator, bytes4 teleoperatorSelector, uint8 transactionFee, uint8 withdrawalFee) external onlyAdmin {
        STypes.Teleoperator storage Teleoperator = s.teleoperators[teleoperatorSelector];

        if (Teleoperator.adminAddress != address(0)) {
            revert Errors.TeleoperatorAlreadyAdded(teleoperator);
        }

        Teleoperator.adminAddress = teleoperator;
        Teleoperator.transactionFee = transactionFee;
        Teleoperator.withdrawalFee = withdrawalFee;
        s.teleoperators[teleoperatorSelector] = Teleoperator;
        s.isValidteleoperator[teleoperator] = true;
    }
}
