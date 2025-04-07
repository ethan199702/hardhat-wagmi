import { createPublicClient, http } from "viem";
import { ganacheChain } from "@/lib/config";

const client = createPublicClient({
  chain: ganacheChain,
  transport: http(),
});

export default client;
