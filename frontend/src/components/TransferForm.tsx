"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useConfig } from "@/hooks/useConfig";
import { parseUnits } from "../utils";

export default function TransferForm() {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const { address } = useAccount();
  const config = useConfig();
  const { data: balance } = useReadContract({
    ...config,
    functionName: "balanceOf",
    args: [address],
  });

  const { writeContract } = useWriteContract();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toAddress || !amount) return;
    writeContract({
      ...config,
      functionName: "transfer",
      args: [toAddress, amount],
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">转账</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">当前余额</p>
        <p className="text-lg font-semibold text-gray-800">
          {balance && parseUnits(balance, 18)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="toAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            接收地址
          </label>
          <input
            type="text"
            id="toAddress"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0x..."
            required
          />
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            转账数量
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.0"
            step="0.000000000000000001"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          转账
        </button>
      </form>
    </div>
  );
}
