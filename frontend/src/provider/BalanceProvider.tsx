"use client";
import { createContext, ReactNode } from "react";
import { useAccount } from "wagmi";
import useBalance from "@/hooks/useBalance";
import { ChainList } from "@/static/chain";

export interface BalanceContextType {
  decimals: number;
  symbol: string;
  balance: bigint;
  refetchBalance: () => void;
}

export const BalanceContext = createContext<BalanceContextType | undefined>(
  undefined
);

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const { address, chainId } = useAccount();
  const chainAddress = ChainList[chainId as number];
  const { decimals, symbol, balance, refetchBalance } = useBalance({
    tokenAddress: chainAddress,
    userAddress: address as `0x${string}`,
  });
  return (
    <BalanceContext.Provider
      value={{ decimals, symbol, balance, refetchBalance }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
