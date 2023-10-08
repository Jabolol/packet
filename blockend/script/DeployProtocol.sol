// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Test} from "../lib/forge-std/src/Test.sol";
import {IDiamond} from "../src/interfaces/IDiamond.sol";
import {DiamondCutFacet} from "../src/facets/DiamondCutFacet.sol";
import {Diamond} from "../src/Diamond.sol";
import {DiamondLoupeFacet} from "../src/facets/DiamondLoupeFacet.sol";
import {ExchangeFacet} from "../src/facets/ExchangeFacet.sol";
import {OwnerFacet} from "../src/facets/OwnerFacet.sol";
import {TelopertorFacet} from "../src/facets/TeleoperatorFacet.sol";
import {UserFacet} from "../src/facets/UserFacet.sol";
import {console} from "../lib/forge-std/src/console.sol";

contract DeployProtocol is Test {
    // DiamondLogic contracts
    //IDiamond public diamond;
    address public _diamond;
    address public _diamondLoupe;
    address public _diamondCut;

    // Core protocol logic contracts
    address public exchangeFacet;
    address public ownerFacet;
    address public teleoperatorFacet;
    address public userFacet;

    // Function Selectors of each contract
    bytes4[] internal diamondSelectors;
    bytes4[] internal loupeSelectors;
    bytes4[] internal cutSelectors;

    bytes4[] internal exchangeFacetSelectors;
    bytes4[] internal OwnerFacetSelector;
    bytes4[] internal TeleoperatorFacetSelector;
    bytes4[] internal UserFacetSelecotrs;

    function getSelector(string memory _func) internal pure returns (bytes4) {
        return bytes4(keccak256(bytes(_func)));
    }

    function run() external {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        address owner = vm.addr(privateKey);

        console.log("Deploying contracts, with address: ", owner);

        vm.startBroadcast(privateKey); // pass the input key

        // Selectors per contract
        loupeSelectors = [
            IDiamond.facets.selector,
            IDiamond.facetFunctionSelectors.selector,
            IDiamond.facetAddresses.selector,
            IDiamond.facetAddress.selector
        ];

        exchangeFacetSelectors =
            [IDiamond.buyData.selector, IDiamond.startAuction.selector, IDiamond.getCurrentPrice.selector, IDiamond.buyDataToTelco.selector];

        OwnerFacetSelector = [IDiamond.addTeleoperator.selector];

        TeleoperatorFacetSelector = [
            IDiamond.addAdminAddress.selector,
            IDiamond.decreaseMobileAvailableData.selector,
            IDiamond.setMobileDataForSell.selector,
            IDiamond.setUsers.selector,
            IDiamond.updatPrice.selector
        ];

        UserFacetSelecotrs = [IDiamond.escrowData.selector, IDiamond.exitTotalOrParcial.selector];

        _diamondCut = address(new DiamondCutFacet());
        _diamond = address(new Diamond(0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519, _diamondCut)); // precalculated address added
        _diamondLoupe = address(new DiamondLoupeFacet());
        exchangeFacet = address(new ExchangeFacet());
        ownerFacet = address(new OwnerFacet());
        teleoperatorFacet = address(new TelopertorFacet());
        userFacet = address(new UserFacet());
        vm.stopBroadcast();

        IDiamond.FacetCut[] memory cut;

        cut = new IDiamond.FacetCut[](5);

        cut[0] = (
            IDiamond.FacetCut({
                facetAddress: _diamondLoupe,
                action: IDiamond.FacetCutAction.Add,
                functionSelectors: loupeSelectors
            })
        );

        cut[1] = (
            IDiamond.FacetCut({
                facetAddress: exchangeFacet,
                action: IDiamond.FacetCutAction.Add,
                functionSelectors: exchangeFacetSelectors
            })
        );

        cut[2] = (
            IDiamond.FacetCut({
                facetAddress: ownerFacet,
                action: IDiamond.FacetCutAction.Add,
                functionSelectors: OwnerFacetSelector
            })
        );

        cut[3] = (
            IDiamond.FacetCut({
                facetAddress: teleoperatorFacet,
                action: IDiamond.FacetCutAction.Add,
                functionSelectors: TeleoperatorFacetSelector
            })
        );

        cut[4] = (
            IDiamond.FacetCut({
                facetAddress: userFacet,
                action: IDiamond.FacetCutAction.Add,
                functionSelectors: UserFacetSelecotrs
            })
        );

        assertNotEq(_diamond, address(0));
        assertNotEq(_diamondLoupe, address(0));
        assertNotEq(_diamondCut, address(0));
        assertNotEq(exchangeFacet, address(0));
        assertNotEq(ownerFacet, address(0));
        assertNotEq(teleoperatorFacet, address(0));
        assertNotEq(userFacet, address(0));

        IDiamond diamond = IDiamond(payable(_diamond));
        diamond.diamondCut(cut, address(0x0), "");
        console.log("after diamond facet cut");
        IDiamond.Facet[] memory facets = diamond.facets();

        // @dev first facet is DiamondCutFacet
        assertEq(facets.length, cut.length + 1);
        for (uint256 i = 0; i < facets.length - 1; i++) {
            assertNotEq(facets[i].facetAddress, address(0));
            assertEq(facets[i + 1].functionSelectors.length, cut[i].functionSelectors.length);
            for (uint256 y = 0; y < facets[i + 1].functionSelectors.length; y++) {
                assertEq(facets[i + 1].functionSelectors[y], cut[i].functionSelectors[y]);
            }
        }
        console.log("Diamond deployed with address: ", _diamond);
        console.log("DiamondCutFacet deployed with address: ", _diamondCut);
        console.log("DiamondLoupeFacet deployed with address: ", _diamondLoupe);
        console.log("ExchangeFacet deployed with address: ", exchangeFacet);
        console.log("OwnerFacet deployed with address: ", ownerFacet);
        console.log("TeleoperatorFacet deployed with address: ", teleoperatorFacet);
        console.log("UserFacet deployed with address: ", userFacet);
        console.log("TeleoperatorFacet deployed with address: ", teleoperatorFacet);
    }
}
