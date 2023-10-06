import type { NetworkId } from "@/utils/types";

type NetworkComponents = {
  [k: string]: { id: string; props?: Record<string, unknown> };
};

export const componentsByNetworkId: Record<
  NetworkId,
  NetworkComponents | undefined
> = {
  testnet: {
    home: { id: "near-examples.testnet/widget/HelloNEAR" },
  },

  mainnet: {
    home: {
      id:
        "c5d50293c3a3ed146051462e6e02e469acda10b517bfffeb3d34652076f0cb7c/widget/HomeWhatIsBOS",
      props: {
        author: ["Jabolo", "Alex", "David"],
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    },
  },
};
