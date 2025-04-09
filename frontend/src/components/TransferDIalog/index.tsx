import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { isAddress } from "ethers";
import { formatWei, formatUnits, checkBalance } from "@/lib/format";
import { useWriteContract } from "wagmi";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  BalanceContext,
  type BalanceContextType,
} from "@/provider/BalanceProvider";
import MyErc20 from "@/contracts/MyERC20.json";

const TransferDialog = () => {
  const context = useContext(BalanceContext);
  const { writeContract, isPending, isSuccess } = useWriteContract();
  const { balance, decimals, symbol, refetchBalance } =
    context as BalanceContextType;
  const form = useForm({
    defaultValues: {
      to: "",
      amount: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (data: { to: string; amount: string }) => {
    const { to, amount } = data;
    if (!isAddress(to)) {
      form.setError("to", {
        message: "Please enter the correct address",
      });
      return;
    }
    const amountWei = formatWei(amount, decimals);
    const balaceFormat = formatUnits(balance, decimals);

    if (!checkBalance(balance, amount, decimals)) {
      form.setError("amount", {
        message: `The balance is insufficient. The current balance is${balaceFormat} ${symbol}`,
      });
    }
    writeContract({
      address: MyErc20.address as `0x${string}`,
      abi: MyErc20.abi,
      functionName: "transfer",
      args: [to, amountWei],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      // refetchBalance();
    }
  }, [isSuccess]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Transfer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form>
            <FormField
              name="to"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex items-center">
                    <FormLabel className="w-[100px]">To</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-[90px]" />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex mt-3 flex-col">
                  <div className="flex items-center">
                    <FormLabel className="w-[100px]">Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-[90px]" />
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 animate-spin" />}
            Transfer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferDialog;
