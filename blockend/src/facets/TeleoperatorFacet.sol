// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Modifiers} from "../libraries/AppStorage.sol";
import {STypes} from "../libraries/DataTypes.sol";

import {Errors} from "../libraries/Errors.sol";

contract TelopertorFacet is Modifiers {
    function setUsers(address[] calldata users, uint80[] calldata allocatedData)
        external
        onlyValidTeleoperator(msg.sender)
    {
        bytes4 teleoperatorSelector = s.adminToTeleoperatorSelector[msg.sender];
        if (s.teleoperators[teleoperatorSelector].adminAddress != msg.sender) {
            revert Errors.NotAdmin();
        }

        if (users.length != allocatedData.length) {
            revert Errors.invalidInputLength();
        }

        for (uint64 i = 0; i < users.length; i++) {
            s.teleoperatorUser[teleoperatorSelector][users[i]] = STypes.TeleoperatorUser({ // this can be done with selecotr
                addr: users[i],
                mobileDataEscrowed: 0,
                isFrozen: false
            });
            s.existInTeloperator[teleoperatorSelector][users[i]] = true;
        }
    }

    function setMobileDataForSell(uint256 amount, uint256 pricePerMega) external {
        _setMobileDataForSell(amount, s.adminToTeleoperatorSelector[msg.sender], pricePerMega);
    }

    function _setMobileDataForSell(uint256 dataForSell, bytes4 teleoperatorSelector, uint256 pricePerMega)
        internal
        onlyTeleoperatorAdmin(teleoperatorSelector)
    {
        s.teleoperators[teleoperatorSelector].totalDataAvailable += dataForSell;
        s.teleoperators[teleoperatorSelector].pricePerMegaByte = pricePerMega;
    }

    function decreaseMobileAvailableData(uint256 dataForSell, bytes4 teleoperatorSelector)
        external
        onlyValidTeleoperator(msg.sender)
    {
        s.teleoperators[teleoperatorSelector].totalDataAvailable -= dataForSell;
    }

    function updatPrice(uint256 price) external {
        _updatePrice(price, s.adminToTeleoperatorSelector[msg.sender]);
    }

    function _updatePrice(uint256 price, bytes4 teleoperatorSelector)
        internal
        onlyTeleoperatorAdmin(teleoperatorSelector)
    {
        s.teleoperators[teleoperatorSelector].pricePerMegaByte = price;
    }

    // add admin addresses
    // only main admin/owner can add new admins
    function addAdminAddress(address[] calldata admins) external onlyValidTeleoperator(msg.sender) {}
}
