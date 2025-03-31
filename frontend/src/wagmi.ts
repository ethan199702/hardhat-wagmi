import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

const ganacheChain = {
  id: 1337,
  name: "Ganache",
  nativeCurrency: {
    name: "EthanToken",
    symbol: "ETBNB",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://localhost:9545"],
    },
  },
  testnet: true,
};

export const config = createConfig({
  chains: [mainnet, sepolia, ganacheChain],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [ganacheChain.id]: http("http://localhost:9545"),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
