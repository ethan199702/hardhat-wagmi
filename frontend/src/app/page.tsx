"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MyErc20 from "@/contracts/MyERC20.json";
import {
  useAccount,
  useReadContract,
  useConnect,
  useWriteContract,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { useForm } from "react-hook-form";
import { parseUnits, formatUnits, decodeEventLog } from "viem";
import useClient from "@/hooks/client";

import { getSlicString } from "@/lib/format";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    getEventLogs();
  }, []);
  const form = useForm({
    defaultValues: {
      to: "",
      amount: "",
    },
  });
  const { connect } = useConnect();
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const { data: tokenName } = useReadContract({
    address: MyErc20.address as `0x${string}`,
    abi: MyErc20.abi,
    functionName: "name",
  });

  const { data: balanceOf } = useReadContract({
    address: MyErc20.address as `0x${string}`,
    abi: MyErc20.abi,
    functionName: "balanceOf",
    args: [address],
  });

  function handleSubmit({ to, amount }: { to: string; amount: string }) {
    if (to && amount) {
      const chainAmount = parseUnits(amount, 18);
      writeContract({
        address: MyErc20.address as `0x${string}`,
        abi: MyErc20.abi,
        functionName: "transfer",
        args: [to, chainAmount],
      });
    }
  }

  async function getEventLogs() {
    const logs = await useClient.getLogs({
      address: MyErc20.address as `0x${string}`,
      abi: MyErc20.abi,
      eventName: "Transfer",
      fromBlock: 0n,
      toBlock: "latest",
    });

    const decodedLogs = logs.map((log) => {
      return decodeEventLog({
        abi: MyErc20.abi,
        data: log.data,
        topics: log.topics,
      }).args;
    });
    console.log("🚀 ~ decodedLogs ~ decodedLogs:", decodedLogs);
  }

  return (
    <div className="container mx-auto py-10 ">
      <Button
        onClick={() => {
          connect({ connector: injected() });
        }}
      >
        wallit
      </Button>
      <p>address:{getSlicString(address as string)}</p>
      <p>tokenName:{tokenName as string}</p>
      {balanceOf && <p>balanceOf:{formatUnits(balanceOf as bigint, 18)}</p>}

      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
          <FormField
            name="to"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex">
                <FormLabel className="w-[100px]">To</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex mt-2">
                <FormLabel className="w-[100px] text-right">Amount</FormLabel>
                <FormControl>
                  <Input placeholder="plase input amount" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
