"use client";

import React from "react";
import TransactionProvider from "@/infrastructures/context/transaction/transaction.provider";
import { SessionProvider } from "next-auth/react";

function Providers({ children }: React.PropsWithChildren) {
  return (
    <SessionProvider>
      <TransactionProvider>{children}</TransactionProvider>
    </SessionProvider>
  );
}

export default Providers;
