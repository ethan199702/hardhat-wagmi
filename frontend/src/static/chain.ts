import MyErc20 from "@/contracts/MyERC20.json";
const ChainList: Record<number, `0x${string}`> = {
  1: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  56: "0x55d398326f99059fF775485246999027B3197955",
  1337: MyErc20.address as `0x${string}`,
};

export { ChainList };
