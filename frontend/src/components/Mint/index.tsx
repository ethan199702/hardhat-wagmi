import { FC, useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import useWrite from "@/hooks/useWrite";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import MyErc20 from "@/contracts/MyERC20.json";

import { Button } from "ui/button";
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

interface IProps {
  address: `0x${string}`;
}

const Mint: FC<IProps> = ({ address }) => {
  const form = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const { writeContract, isPending, isSuccess } = useWrite();

  const { data: owner } = useReadContract({
    address: MyErc20.address as `0x${string}`,
    abi: MyErc20.abi,
    functionName: "owner",
  });

  const handleSubmit = (data: { amount: string }) => {
    const { amount } = data;
    if (!amount) {
      form.setError("amount", {
        message: "Please enter the amount",
      });
      return;
    }

    writeContract({
      address: MyErc20.address as `0x${string}`,
      abi: MyErc20.abi,
      functionName: "mint",
      args: [address, amount],
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {address === owner && (
          <Button
            variant={"default"}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Mint
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mint</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form>
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex items-center">
                    <FormLabel className="w-[100px]">Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-[90px]" />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            variant={"outline"}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </Button>
          <Button
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 animate-spin" />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default Mint;
