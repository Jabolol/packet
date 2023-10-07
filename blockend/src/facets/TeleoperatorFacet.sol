// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Modifiers} from "../libraries/AppStorage.sol";


contract TelopertorFacet is Modifiers {

    // NEED THE MODIFIER ONLY VALID TELEOPERATOR

    // setter to add a batch of users

    //" set a batch of users but pass the array of the type...
    // pass user addresses and create all the users
    function setUsers(address[] calldata users) external onlyValidTeleoperator(msg.sender) {
       // valid operartors
    }
}
