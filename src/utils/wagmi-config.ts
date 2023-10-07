
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { arthera } from './arthera-chain'

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [arthera],
    [publicProvider()],
  )

  export const config = createConfig({
    publicClient,
    webSocketPublicClient,
  })
