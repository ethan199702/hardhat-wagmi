"use client";
import { Button } from "@/components/ui/button";
import ConnectWallet from "@/components/ConnectWallet";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MyErc20 from "@/contracts/MyERC20.json";
import { useWriteContract } from "wagmi";
import { useForm } from "react-hook-form";
import { parseUnits, decodeEventLog } from "viem";
import useClient from "@/hooks/client";

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

  const { writeContract } = useWriteContract();

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
      }).args;
    });
    console.log("🚀 ~ decodedLogs ~ decodedLogs:", decodedLogs);
  }

  return (
    <div className="container mx-auto py-10 ">
      <ConnectWallet />

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
