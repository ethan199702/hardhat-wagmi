"use client";

import { FC, ReactNode } from "react";

import { WagmiProvider } from "wagmi";
import config from "@/lib/config";

interface ProvidersProps {
  children: ReactNode;
}
const Providers: FC<ProvidersProps> = ({ children }) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};
export default Providers;
