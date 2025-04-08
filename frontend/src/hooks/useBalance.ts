import { useReadContract } from "wagmi";

const erc20Abi = [
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
  {
    name: "symbol",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "string" }],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
];

interface useBalanceProps {
  tokenAddress: `0x${string}`;
  userAddress: `0x${string}`;
}
function useBalance({ tokenAddress, userAddress }: useBalanceProps): {
  balance: bigint;
  decimals: number;
  symbol: string;
} {
  const { data: balance } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [userAddress],
  }) as { data: bigint };
  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "decimals",
  }) as { data: number };
  const { data: symbol } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "symbol",
  }) as { data: string };

  return {
    balance,
    decimals,
    symbol,
  };
}

export default useBalance;
