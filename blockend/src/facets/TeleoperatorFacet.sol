// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Modifiers} from "../libraries/AppStorage.sol";
import {STypes} from "../libraries/DataTypes.sol";

import {Errors} from "../libraries/Errors.sol";

contract TelopertorFacet is Modifiers {
    function setUsers(address[] calldata users, bytes4 teleoperatorSelector)
        external
        onlyValidTeleoperator(msg.sender)
    {
        if (s.teleoperators[teleoperatorSelector].adminAddress != msg.sender) {
            revert Errors.NotAdmin();
        }

        //  ! need the dataEscrowed put by the teleoperator or no???
        for (uint64 i = 0; i < users.length; i++) {
            s.teleoperatorUser[msg.sender][i] = STypes.TeleoperatorUser({ // this can be done with selecotr
                addr: users[i],
                dataEscrowed: 0,
                isFrozen: false
            });
        }
    }

    // setter function to set the data scrowed??
}
