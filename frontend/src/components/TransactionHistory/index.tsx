"use client";
import { useEffect, useState, useContext } from "react";

import { decodeEventLog } from "viem";
import { useAccount } from "wagmi";
import useClient from "@/hooks/client";

import MyErc20 from "@/contracts/MyERC20.json";
import { formatUnits, getSlicString } from "@/lib/format";
import CopyIcon from "@/assets/images/copy.svg";
import WalletAvatar from "../WalletAvatar";
import TransferDialog from "../TransferDIalog";
import {
  BalanceContext,
  type BalanceContextType,
} from "@/provider/BalanceProvider";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Separator } from "../ui/separator";

interface ITableData {
  from: string;
  to: string;
  value: string;
}

const TransactionHistory = () => {
  const context = useContext(BalanceContext);
  const { decimals, symbol } = context as BalanceContextType;
  const { chainId } = useAccount();

  const [tableData, setTableData] = useState<ITableData[]>([]);

  async function getEventLogs() {
    const logs = await useClient.getLogs({
      address: MyErc20.address as `0x${string}`,
      // @ts-ignore
      abi: MyErc20.abi,
      eventName: "Transfer",
      // @ts-ignore
      fromBlock: 0n,
      toBlock: "latest",
    });

    const decodedLogs = logs.map((log) => {
      return decodeEventLog({
        abi: MyErc20.abi,
        data: log.data,
        topics: log.topics,
      }).args as unknown as ITableData;
    });
    setTableData(decodedLogs);
  }

  useEffect(() => {
    if (chainId) {
      getEventLogs();
    }
  }, [chainId]);
  return (
    <div className="bg-white my-6 rounded-lg p-4 shadow-lg">
      <div className="flex justify-end gap-1">
        <TransferDialog />
      </div>
      <Separator className="my-2" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>from</TableHead>
            <TableHead>to</TableHead>
            <TableHead className="text-right">amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-1">
                  <WalletAvatar size={20} address={item.from} />
                  {getSlicString(item.from, 4)}
                  <CopyIcon width={16} height={16} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <WalletAvatar size={20} address={item.to} />

                  {getSlicString(item.to, 4)}
                  <CopyIcon width={16} height={16} />
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatUnits(item.value, decimals)} {symbol}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionHistory;
