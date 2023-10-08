// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface IDiamond {
    // loupe facet

    enum FacetCutAction {
        Add,
        Replace,
        Remove
    }

    struct Facet {
        address facetAddress;
        bytes4[] functionSelectors;
    }

    function facetAddress(bytes4 _functionSelector) external view returns (address facetAddress_);
    function facetAddresses() external view returns (address[] memory facetAddresses_);
    function facetFunctionSelectors(address _facet) external view returns (bytes4[] memory _facetFunctionSelectors);
    function facets() external view returns (Facet[] memory facets_);

    // cut facet
    event DiamondCut(FacetCut[] _diamondCut, address _init, bytes _calldata);

    struct FacetCut {
        address facetAddress;
        FacetCutAction action;
        bytes4[] functionSelectors;
    }

    function diamondCut(FacetCut[] memory _diamondCut, address _init, bytes memory _calldata) external;

    // exchange facet

    function buyDataToTelco(uint256 auctionId) external payable;
    function buyData(bytes4 teleoperatorSelector, uint256 megaBytesToBuy) external payable;
    function getCurrentPrice(uint256 auctionId) external view returns (uint256);
    function startAuction(
        uint256 startPrice,
        uint256 reservePrice,
        uint256 endBlock,
        uint256 megaBytesToSell,
        bytes4 teleoperatorSelector
    ) external;

    // owner facet

    function addTeleoperator(
        address teleoperator,
        bytes4 teleoperatorSelector,
        uint8 transactionFee,
        uint8 withdrawalFee,
        string memory teleoperatorName,
        string memory name,
        string memory symbol
    ) external;

    // teleoperator facet
    function addAdminAddress(address[] memory admins) external;
    function decreaseMobileAvailableData(uint256 dataForSell) external;
    function setMobileDataForSell(uint256 amount, uint256 pricePerMega) external;
    function setUsers(address[] memory users) external;
    function updatPrice(uint256 price) external;

    // user facet
    function depositTokenData(bytes4 teleoperatorSelector, uint256 amount) external;
    function escrowData(bytes4 teloperatorSelector, uint88 amount, address userAddress) external;
    function exitTotalOrParcial(bytes4 teleoperatorSelector, uint256 amount, address userAddress) external;
}
