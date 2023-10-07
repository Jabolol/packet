// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.19;

library Errors {
    error FunctionNotFound(bytes4 _functionSelector);
    error TeleoperatorNotValid(address _teleoperator);
    error NotAdmin();
    error TeleoperatorAlreadyAdded(address _teleoperator);
}
