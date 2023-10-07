import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { arthera } from "./arthera-chain";
import { createPublicClient, http } from "viem";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
    [arthera],
    [publicProvider()]
);

export const config = createConfig({
    publicClient,
    webSocketPublicClient,
});

export const publicClientCustom = createPublicClient({
  chain: mainnet,
  transport: http()
})
