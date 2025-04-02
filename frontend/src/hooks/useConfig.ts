import MyErc20 from "@/contracts/MyERC20.json";

function useConfig() {
  return {
    address: MyErc20.address as `0x${string}`,
    abi: MyErc20.abi,
  };
}

export { useConfig };
