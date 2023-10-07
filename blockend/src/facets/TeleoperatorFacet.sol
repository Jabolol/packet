// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Modifiers} from "../libraries/AppStorage.sol";
import {STypes} from "../libraries/DataTypes.sol";

import {Errors} from "../libraries/Errors.sol";

import {Events} from "../libraries/Events.sol";

contract TelopertorFacet is Modifiers {
    function setUsers(address[] calldata users) external {
        _setUsers(users, s.adminToTeleoperatorSelector[msg.sender]);
    }

    function _setUsers(address[] memory users, bytes4 teleoperatorSelector)
        internal
        onlyValidTeleoperator(teleoperatorSelector)
    {
        uint64 i;
        if (s.teleoperators[teleoperatorSelector].ownerAddress != msg.sender) {
            revert Errors.NotAdmin();
        }

        for (i = 0; i < users.length; i++) {
            s.teleoperatorUser[teleoperatorSelector][users[i]] = STypes.TeleoperatorUser({ // this can be done with selecotr
                addr: users[i],
                mobileDataEscrowed: 0,
                isFrozen: false
            });
            s.existInTeloperator[teleoperatorSelector][users[i]] = true;
        }

        emit Events.usersAdded(teleoperatorSelector, users, i);
    }

    function setMobileDataForSell(uint256 amount, uint256 pricePerMega) external {
        _setMobileDataForSell(amount, s.adminToTeleoperatorSelector[msg.sender], pricePerMega);
    }

    function _setMobileDataForSell(uint256 dataForSell, bytes4 teleoperatorSelector, uint256 pricePerMega)
        internal
        onlyTeleoperatorAdmin(teleoperatorSelector)
        onlyValidTeleoperator(teleoperatorSelector)
    {
        s.teleoperators[teleoperatorSelector].totalDataAvailable += dataForSell;
        s.teleoperators[teleoperatorSelector].pricePerMegaByte = pricePerMega;
        emit Events.dataAvailableAdded(teleoperatorSelector, dataForSell, pricePerMega);
    }

    function decreaseMobileAvailableData(uint256 dataForSell) external {
        _decreaseMobileAvailableData(dataForSell, s.adminToTeleoperatorSelector[msg.sender]);
    }

    function _decreaseMobileAvailableData(uint256 dataForSell, bytes4 teleoperatorSelector)
        internal
        onlyTeleoperatorAdmin(teleoperatorSelector)
        onlyValidTeleoperator(teleoperatorSelector)
    {
        s.teleoperators[teleoperatorSelector].totalDataAvailable -= dataForSell;
        emit Events.decreaseMobileAvailableData(
            teleoperatorSelector, dataForSell, s.teleoperators[teleoperatorSelector].totalDataAvailable
        );
    }

    function updatPrice(uint256 price) external {
        _updatePrice(price, s.adminToTeleoperatorSelector[msg.sender]);
    }

    function _updatePrice(uint256 price, bytes4 teleoperatorSelector)
        internal
        onlyTeleoperatorAdmin(teleoperatorSelector)
    {
        s.teleoperators[teleoperatorSelector].pricePerMegaByte = price;
        emit Events.pricePerMegaByteUpdated(teleoperatorSelector, price);
    }

    function addAdminAddress(address[] calldata admins) external {
        _addAdminAdress(admins, s.adminToTeleoperatorSelector[msg.sender]);
    }

    // set fees...

    function _addAdminAdress(address[] calldata admins, bytes4 teleoperatorSelector)
        internal
        onlyTeleoperatorOwner(teleoperatorSelector)
    {
        uint64 i;
        for (i = 0; i < admins.length; i++) {
            s.isTeleoperatorAdmin[teleoperatorSelector][admins[i]] = true;
        }
        emit Events.addminAddressesAdded(teleoperatorSelector, admins, i);
    }
}
