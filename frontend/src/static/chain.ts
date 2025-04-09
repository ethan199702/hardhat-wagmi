import MyErc20 from "@/contracts/MyERC20.json";
const ChainList: Record<number, `0x${string}`> = {
  1: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  56: "0xB8c77482e45F1F44De1745F52C74426C631bDD52",
  1337: MyErc20.address as `0x${string}`,
};

export { ChainList };
