// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Modifiers} from "../libraries/AppStorage.sol";
import {STypes} from "../libraries/DataTypes.sol";

import {Errors} from "../libraries/Errors.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {Events} from "../libraries/Events.sol";

contract ExchangeFacet is Modifiers {
    function buyData(bytes4 teleoperatorSelector, uint256 megaBytesToBuy)
        external
        payable
        onlyValidTeleoperator(teleoperatorSelector)
        onlyValidUser(teleoperatorSelector, msg.sender)
    {
        require(!s.locked);
        s.locked = true;
        STypes.Teleoperator memory teleop = s.teleoperators[teleoperatorSelector];

        // cost calculated with price of ETH

        // price need to be fetched outide the contract

        uint256 cost = teleop.pricePerMegaByte * megaBytesToBuy; // cost in eth

        require(msg.value >= cost, "Insufficient funds sent"); // by now price in ethereum but need to do it

        s.teleoperatorUser[teleoperatorSelector][msg.sender].mobileDataEscrowed += megaBytesToBuy;
        teleop.totalDataSold += megaBytesToBuy;
        teleop.totalDataAvailable -= megaBytesToBuy;
        s.teleoperators[teleoperatorSelector] = teleop;

        (bool sent,) = teleop.ownerAddress.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        s.locked = false;
    }

    function startAuction(
        uint256 startPrice,
        uint256 reservePrice,
        uint256 endBlock,
        uint256 megaBytesToSell,
        bytes4 teleoperatorSelector
    ) external {}

    function _startAuction(
        uint256 startPrice,
        uint256 reservePrice,
        uint256 endBlock,
        uint256 megaBytesToSell,
        bytes4 teleoperatorSelector
    ) internal onlyValidTeleoperator(teleoperatorSelector) onlyValidUser(teleoperatorSelector, msg.sender) {
        STypes.Teleoperator memory teleop = s.teleoperators[teleoperatorSelector];
        STypes.TeleoperatorUser memory user = s.teleoperatorUser[teleoperatorSelector][msg.sender];

        if (startPrice < reservePrice || startPrice < teleop.pricePerMegaByte || reservePrice < teleop.pricePerMegaByte)
        {
            revert Errors.InvalidStartPrice();
        }

        if (endBlock < block.number) {
            revert Errors.InvalidEndBlock();
        }

        if (megaBytesToSell > user.mobileDataEscrowed) {
            revert Errors.InvalidMegaBytesToSell();
        }

        s.auctions[s.nextAuctionId] = STypes.Auction({
            seller: msg.sender,
            startPrice: startPrice,
            reservePrice: reservePrice,
            endBlock: endBlock,
            startBlock: block.number,
            megaBytesToSell: megaBytesToSell,
            active: true,
            teleoperatorSelector: teleoperatorSelector
        });

        emit Events.auctionStarted(
            s.nextAuctionId,
            block.number,
            endBlock,
            startPrice,
            reservePrice,
            megaBytesToSell,
            teleoperatorSelector,
            msg.sender
        );
        s.nextAuctionId++;
    }

    function getCurrentPrice(uint256 auctionId) public view returns (uint256) {
        if (auctionId > s.nextAuctionId) {
            revert Errors.InvalidAuctionId();
        }
        STypes.Auction memory auction = s.auctions[auctionId];

        if (auction.active == false) {
            revert Errors.AuctionNotActive();
        }

        if (block.number >= auction.endBlock) {
            return auction.reservePrice; // if time has passed retunr the ser
        } else {
            uint256 blocksPassed = block.number - auction.startBlock;
            uint256 priceDropPerBlock = (auction.startPrice - auction.reservePrice) / blocksPassed;
            return auction.startPrice - (block.number * priceDropPerBlock);
        }
    }

    function buyData(uint256 auctionId) external payable {
        STypes.Auction memory auction = s.auctions[auctionId];
        _buyData(auctionId, auction);
    }

    function _buyData(uint256 auctionId, STypes.Auction memory a) internal {
        require(!s.locked);
        s.locked = true;
        if (auctionId > s.nextAuctionId) {
            revert Errors.InvalidAuctionId();
        }
        if (a.active == false) {
            revert Errors.AuctionNotActive();
        }

        uint256 currentPrice = getCurrentPrice(auctionId);
        uint256 cost = currentPrice * a.megaBytesToSell;

        if (cost < msg.value) {
            revert Errors.InsufficientFundsSent();
        }

        uint256 rest = msg.value - cost;

        (bool sent,) = a.seller.call{value: cost}("");
        require(sent, "Failed to send Ether");

        if (rest > 0) {
            (bool refunded,) = msg.sender.call{value: rest}("");
            require(refunded, "Failed to refund excess Ether");
        }
        s.auctions[auctionId].active = false;
        s.locked = false;
        emit Events.auctionEnded(auctionId, msg.sender, a.megaBytesToSell, currentPrice);
    }
}
