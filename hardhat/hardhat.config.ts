import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545",
      chainId: 1337,
      accounts: [
        "0xd34b633f2d734a375901e3a17069589d22321267429d504508616b131e3beb35",
      ],
    },
  },
};

export default config;
