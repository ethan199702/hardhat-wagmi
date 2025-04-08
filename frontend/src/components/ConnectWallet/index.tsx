import { FC } from "react";

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
import { ChainList } from "@/static/chain";
import useBalance from "@/hooks/useBalance";

const ConnectWallet = () => {
  const { address, isDisconnected, isConnecting, chainId } = useAccount();
  const chainAddress = ChainList[chainId as number];

  const { balance, decimals, symbol } = useBalance({
    tokenAddress: chainAddress,
    userAddress: address as `0x${string}`,
  });

  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const WalletAvatar: FC<{ size: number }> = ({ size }) => {
    const avatarUrl = `https://api.dicebear.com/9.x/dylan/svg?seed=${
      address as string
    }`;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt="wallit avatar"
        className="rounded-[50%]"
        width={size}
        height={size}
      />
    );
  };

  return (
    <div className="flex items-center justify-end">
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
      <ConnectNetwork />
      <Dialog>
        <DialogTrigger asChild>
          <span className="bg-white h-10 px-[10px] leading-10 cursor-pointer shadow-lg rounded-2xl flex items-center">
            <WalletAvatar size={30} />
            <span className="pl-3">{getSlicString(address as string)}</span>
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <WalletAvatar size={60} />
            <span>{getSlicString(address as string)}</span>
          </div>
          <DialogFooter>
            <Button variant={"outline"}>复制地址</Button>
            <Button onClick={() => disconnect()}>断开连接</Button>
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
