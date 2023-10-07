// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Modifiers} from "../libraries/AppStorage.sol";
import {STypes} from "../libraries/DataTypes.sol";
import {Errors} from "../libraries/Errors.sol";

import {DataToken} from "../tokens/DataToken.sol";

// Qadd all the events

contract OwnerFacet is Modifiers {
    function addTeleoperator(
        address teleoperator,
        bytes4 teleoperatorSelector,
        uint8 transactionFee,
        uint8 withdrawalFee,
        string calldata name, // se if with memory maybe it works
        string calldata symbol
    ) external onlyAdmin {
        STypes.Teleoperator memory Teleoperator = s.teleoperators[teleoperatorSelector];

        if (Teleoperator.adminAddress != address(0)) {
            revert Errors.TeleoperatorAlreadyAdded(teleoperator);
        }

        DataToken Datatoken = new DataToken(address(this), name, symbol);
        if (address(Datatoken) == address(0)) {
            revert Errors.ErrorWhileDeployingToken();
        }

        Teleoperator.dataTokenAddress = address(Datatoken);
        Teleoperator.adminAddress = teleoperator;
        Teleoperator.transactionFee = transactionFee;
        Teleoperator.withdrawalFee = withdrawalFee;
        s.isTeleoperatorAdmin[teleoperatorSelector][msg.sender] = true;
        s.isValidteleoperator[teleoperator] = true;
        s.adminToTeleoperatorSelector[teleoperator] = teleoperatorSelector;
        s.isTeleoperatorAdmin[teleoperatorSelector][teleoperator] = true;
        s.teleoperators[teleoperatorSelector] = Teleoperator;
    }
}
