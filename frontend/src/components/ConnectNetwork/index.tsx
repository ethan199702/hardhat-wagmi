import { useEffect, useState } from "react";

import { useAccount, useSwitchChain } from "wagmi";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
const ConnectNetwork = () => {
  const { chains, switchChain, isPending } = useSwitchChain();
  const { chain } = useAccount();

  const [selectChain, setSelectChain] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (chain) setSelectChain(chain?.id);
  }, [chain]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-white h-10 px-[10px] leading-10 cursor-pointer shadow-lg rounded-2xl mr-2">
          {chain && <>{chain.name}</>}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>网络</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {chains.map((chain) => (
          <DropdownMenuCheckboxItem
            key={chain.id}
            checked={selectChain === chain.id}
            onCheckedChange={() => {
              switchChain({ chainId: chain.id });
            }}
          >
            {isPending ? <>切换网络中...</> : <> {chain.name}</>}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConnectNetwork;
