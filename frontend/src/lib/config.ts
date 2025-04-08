import { createConfig, http } from "wagmi";
import { Chain, mainnet, bsc } from "wagmi/chains";

const ganacheChain: Chain = {
  id: 1337,
  name: "Ganache",
  nativeCurrency: {
    name: "EthanToken",
    symbol: "ETBNB",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["http://localhost:7545"] },
    public: { http: ["http://localhost:7545"] },
  },
  testnet: true,
};
const config = createConfig({
  chains: [mainnet, bsc, ganacheChain],
  ssr: true,
  transports: {
    [ganacheChain.id]: http(),
  },
});

export default config;
export { ganacheChain };
