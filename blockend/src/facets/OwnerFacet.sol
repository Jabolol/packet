// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Modifiers} from "../libraries/AppStorage.sol";
import {STypes} from "../libraries/DataTypes.sol";
import {Errors} from "../libraries/Errors.sol";

import {DataToken} from "../tokens/DataToken.sol";

import {Events} from "../libraries/Events.sol";
// Qadd all the events

contract OwnerFacet is Modifiers {
    function addTeleoperator(
        address teleoperator,
        bytes4 teleoperatorSelector,
        uint8 transactionFee,
        uint8 withdrawalFee,
        string calldata teleoperatorName,
        string calldata name, // se if with memory maybe it works
        string calldata symbol
    ) external onlyAdmin {
        STypes.Teleoperator memory Teleoperator = s.teleoperators[teleoperatorSelector];

        if (Teleoperator.ownerAddress != address(0)) {
            revert Errors.TeleoperatorAlreadyAdded(teleoperator);
        }

        DataToken Datatoken = new DataToken(address(this), name, symbol);
        if (address(Datatoken) == address(0)) {
            revert Errors.ErrorWhileDeployingToken();
        }

        if (s.isValidteleoperator[teleoperatorSelector]) {
            revert Errors.TeleoperatorAlreadyAdded(teleoperator);
        }

        Teleoperator.dataTokenAddress = address(Datatoken);
        Teleoperator.ownerAddress = teleoperator;
        Teleoperator.transactionFee = transactionFee;
        Teleoperator.withdrawalFee = withdrawalFee;
        Teleoperator.name = teleoperatorName;
        s.isTeleoperatorAdmin[teleoperatorSelector][msg.sender] = true;
        s.isValidteleoperator[teleoperatorSelector] = true;
        s.adminToTeleoperatorSelector[teleoperator] = teleoperatorSelector;
        s.isTeleoperatorAdmin[teleoperatorSelector][teleoperator] = true;
        s.teleoperators[teleoperatorSelector] = Teleoperator;

        // event teleoperatorAdded(bytes4 indexed teleoperatorSelector, address indexed ownerAddress, address indexed dataTokenAddress, uint256 transactionFee, uint256 withdrawalFee, uint256 pricePerMegaByte);

        emit Events.teleoperatorAdded(
            teleoperatorSelector, teleoperator, address(Datatoken), transactionFee, withdrawalFee, 0
        );
    }
}
