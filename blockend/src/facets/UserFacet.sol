// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Modifiers} from "../libraries/AppStorage.sol";
import {STypes, MTypes} from "../libraries/DataTypes.sol";

import {IDataToken} from "../interfaces/IDataToken.sol";

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

    // Token contract of each teleoparator has fee
    // add the fee here
    function depositTokenData(bytes4 teleoperatorSelector, uint256 amount)
        external
        onlyValidUser(teleoperatorSelector, msg.sender)
        onlyValidTeleoperator(teleoperatorSelector)
    {
        require(!s.locked, "System locked");
        STypes.TeleoperatorUser memory user = s.teleoperatorUser[teleoperatorSelector][msg.sender];
        STypes.Teleoperator memory teleop = s.teleoperators[teleoperatorSelector];

        if (user.isFrozen) {
            revert Errors.UserIsFrozen(msg.sender);
        }

        if (teleop.dataTokenAddress == address(0)) {
            revert Errors.TeleoperatorNotHaveToken();
        }

        uint256 userBalance = IDataToken(teleop.dataTokenAddress).balanceOf(msg.sender);
        if (userBalance < amount) {
            revert Errors.NotEnoughTokenBalance();
        }

        IDataToken(teleop.dataTokenAddress).burnFrom(msg.sender, amount);

        user.mobileDataEscrowed += amount;
        s.teleoperatorUser[teleoperatorSelector][msg.sender] = user;
        emit Events.dataDeposited(teleoperatorSelector, msg.sender, amount);
        s.locked = false;
    }

    function exitTotalOrParcial(bytes4 teleoperatorSelector, uint256 amount, address userAddress)
        external
        onlyValidUser(teleoperatorSelector, userAddress)
    {
        require(!s.locked, "System locked");
        s.locked = true;
        STypes.TeleoperatorUser memory user = s.teleoperatorUser[teleoperatorSelector][msg.sender];
        STypes.Teleoperator memory teleop = s.teleoperators[teleoperatorSelector];

        // apply the withdrawal fee set by the teleoperator
        amount = amount * (100 - teleop.withdrawalFee) / 100;
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

        IDataToken(s.teleoperators[teleoperatorSelector].dataTokenAddress).mint(msg.sender, amount);

        s.teleoperatorUser[teleoperatorSelector][msg.sender] = user;
        emit Events.dataWithdrawn(teleoperatorSelector, userAddress, amount);

        s.locked = false;
    }
}
