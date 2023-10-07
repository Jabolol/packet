import { Chain } from '@wagmi/core'
 
export const arthera = {
  id: 10243,
  name: 'Arthera',
  network: 'arthera testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Arthera',
    symbol: 'AA',
  },
  rpcUrls: {
    public: { http: ['https://rpc-test.arthera.net'] },
    default: { http: ['https://rpc-test.arthera.net'] },
  },
  blockExplorers: {
    etherscan: { name: 'BlockScout', url: 'https://explorer-test.arthera.net' },
    default: { name: 'BlockScout', url: 'https://explorer-test.arthera.net' },
  },
  contracts: {
  },
} as const satisfies Chain
