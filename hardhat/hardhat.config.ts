import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:9545",
      chainId: 1337,
      accounts: [
        "0xd6942b03eacd66e319b9f14d518f1ee462b0e0aabd90d3c57bc5056248bcbe98",
      ],
    },
  },
};

export default config;
