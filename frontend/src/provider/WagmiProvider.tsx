"use client";

import { FC, ReactNode } from "react";

import { WagmiProvider } from "wagmi";
import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";

import config from "@/lib/config";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>{children}</WagmiProvider>
    </TanstackQueryClientProvider>
  );
};

export default Providers;
