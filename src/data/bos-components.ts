import type { NetworkId } from "@/utils/types";

type NetworkComponents = {
  [k: string]: { id: string; props?: Record<string, unknown> };
};

const getComponent = (...[name]: TemplateStringsArray[]) =>
  `c5d50293c3a3ed146051462e6e02e469acda10b517bfffeb3d34652076f0cb7c/widget/${name}`;

export const componentsByNetworkId: Record<
  NetworkId,
  NetworkComponents | undefined
> = {
  testnet: {},
  mainnet: {
    home: { id: getComponent`Hero` },
    feature_data: {
      id: getComponent`ImageWidget`,
      props: {
        title: "Interoperable",
        description: "Never worry again about carrier lock-in.",
        icon: "switch",
      },
    },
    feature_privacy: {
      id: getComponent`ImageWidget`,
      props: {
        title: "Private",
        description: "Your data is yours. We limit access to your data.",
        icon: "eye",
      },
    },
    feature_global: {
      id: getComponent`ImageWidget`,
      props: {
        title: "Global",
        description: "Swap data with anyone, anywhere in the world.",
        icon: "world",
      },
    },
  },
};
