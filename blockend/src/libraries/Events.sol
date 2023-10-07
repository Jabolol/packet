// SPDX-License-Identifier: GPL-3.0-only
pragma solidity 0.8.19;

import {STypes} from "../libraries/DataTypes.sol";

library Events {

    // add all the events

    // exchange facet
    event auctionStarted(uint256 indexed auctionId, uint256  startBlock, uint256 endBlock, uint256 startPrice, uint256 endPrice, uint256 megaBytesToSell, bytes4 indexed teleoperatorSelector, address indexed seller);
    event dataBuyed(uint256 indexed auctionId, address indexed buyer, uint256 indexed amount);
    event auctionEnded(uint256 indexed auctionId, address indexed winner, uint256 indexed amount, uint256 price);

    // owner Facet
    event teleoperatorAdded(bytes4 indexed teleoperatorSelector, address indexed ownerAddress, address indexed dataTokenAddress, uint256 transactionFee, uint256 withdrawalFee, uint256 pricePerMegaByte);
    // user facet
    event dataEscrowed(bytes4 indexed teleoperatorSelector, address indexed user, uint256 indexed amount);
    event dataWithdrawn(bytes4 indexed teleoperatorSelector, address indexed user, uint256 indexed amount);

    // teleoperator facet
    event usersAdded(bytes4 indexed teleoperatorSelector, address[] indexed users, uint256 indexed amount);
    event dataAvailableAdded(bytes4 indexed teleoperatorSelector, uint256 indexed amount, uint256 indexed pricePerMegaByte);
    event pricePerMegaByteUpdated(bytes4 indexed teleoperatorSelector, uint256 indexed pricePerMegaByte);
    event decreaseMobileAvailableData(bytes4 indexed teleoperatorSelector, uint256 indexed amoun, uint256 indexed actualAmount);
    event addminAddressesAdded(bytes4 indexed teleoperatorSelector, address[] indexed admins, uint256 indexed amount);

    // ERC-721
    event Transfer(address indexed from, address indexed to, uint256 indexed id);
    event Approval(address indexed owner, address indexed spender, uint256 indexed id);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
}
