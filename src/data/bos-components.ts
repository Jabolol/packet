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
    home: {
      id: getComponent`Hero`,
      props: {
        // TODO(jabolo): Detect if the user is logged in
        ethereum: () => !(window.ready = true),
      },
    },
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
    data_count: {
      id: getComponent`DataWidget`,
      props: {
        cipher: "200k",
        title: "active users",
        description: "Last month, this many users have used the marketplace.",
      },
    },
    data_tb: {
      id: getComponent`DataWidget`,
      props: {
        cipher: "50 TiB",
        title: "total used data",
        description: "Users around the world have used this huge amount!",
      },
    },
    data_mean: {
      id: getComponent`DataWidget`,
      props: {
        cipher: "3 GiB",
        title: "average exchange",
        description: "Normally, users exchange this amount of data.",
      },
    },
  },
};
