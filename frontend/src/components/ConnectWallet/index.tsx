"use client";
import { useState, useContext } from "react";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

import { getSlicString, formatUnits } from "@/lib/format";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import ConnectNetwork from "../ConnectNetwork";
import WalletAvatar from "../WalletAvatar";
import {
  BalanceContext,
  type BalanceContextType,
} from "@/provider/BalanceProvider";

const ConnectWallet = () => {
  const context = useContext(BalanceContext);
  const { balance, decimals, symbol } = context as BalanceContextType;
  const { address, isDisconnected, isConnecting, chainId } = useAccount();

  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-end gap-2">
      {isConnecting && <Button variant={"outline"}>连接钱包中.....</Button>}
      {isDisconnected && (
        <Button
          variant={"outline"}
          onClick={() => {
            connect({ connector: injected() });
          }}
        >
          连接钱包
        </Button>
      )}
      {chainId && <ConnectNetwork />}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <span
            className="bg-white h-10 px-[10px] leading-10 cursor-pointer shadow-lg rounded-2xl flex items-center"
            onClick={() => setIsOpen(true)}
          >
            <WalletAvatar size={30} address={address as string} />
            <span className="pl-3">{getSlicString(address as string)}</span>
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <WalletAvatar size={60} address={address as string} />
            <span>{getSlicString(address as string)}</span>
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant={"outline"}>复制地址</Button>
            <Button
              onClick={() => {
                disconnect();
                setIsOpen(false);
              }}
            >
              断开连接
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="bg-white h-10 px-[10px] leading-10 cursor-pointer shadow-lg rounded-2xl ml-2 min-w-9">
        {balance !== null && balance !== undefined ? (
          <>
            {formatUnits(balance, decimals)} {symbol}
          </>
        ) : (
          "-"
        )}
      </div>
    </div>
  );
};
export default ConnectWallet;
