// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Modifiers} from "../libraries/AppStorage.sol";
import {STypes, MTypes} from "../libraries/DataTypes.sol";

import {Errors} from "../libraries/Errors.sol";
import {Events} from "../libraries/Events.sol";

contract UserFacet is Modifiers {
    // @dev user can escrow data, withdraw data....abi

    // only diamond only the ones that re call the funciton form the diamond if not msgSender is delecated

    // called only by the teleoperator wallet
    function escrowData(bytes4 teloperatorSelector, uint88 amount, address userAddress)
        external
        onlyValidUser(teloperatorSelector, userAddress)
        onlyTeleoperatorAdmin(teloperatorSelector)
    {
        STypes.TeleoperatorUser memory user = s.teleoperatorUser[teloperatorSelector][msg.sender];

        if (user.isFrozen) {
            revert Errors.UserIsFrozen(msg.sender);
        }

        user.mobileDataEscrowed += amount;
        s.teleoperatorUser[teloperatorSelector][msg.sender] = user;

        emit Events.dataEscrowed(teloperatorSelector, userAddress, amount);
    }

    // ! NEED TO WITHDRAW + FEE IN THE CONTRACT ERC20

    function exitTotalOrParcial(bytes4 teleoperatorSelector, uint88 amount, address userAddress)
        external
        onlyValidUser(teleoperatorSelector, userAddress)
    {
        STypes.TeleoperatorUser memory user = s.teleoperatorUser[teleoperatorSelector][msg.sender];

        if (user.isFrozen) {
            revert Errors.UserIsFrozen(msg.sender);
        }

        if (user.mobileDataEscrowed < amount) {
            revert Errors.NotEnoughDataEscrowed();
        }

        if (amount == user.mobileDataEscrowed) {
            user.mobileDataEscrowed = 0;
        } else {
            user.mobileDataEscrowed -= amount;
        }

        s.teleoperatorUser[teleoperatorSelector][msg.sender] = user;
        emit Events.dataWithdrawn(teleoperatorSelector, userAddress, amount);
    }
}
