"use client";

import React, { useState } from "react";
import TransactionContext, { TransactionDispatch } from "./transaction.context";
import { LooseObject } from "@/Type";
import { useSession } from "next-auth/react";
import { ITransaction } from "@/types/transaction";

function TransactionProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [transaction, setTransaction] = useState<ITransaction>({
    account: {
      email: session?.profile?.email ?? "",
      noWhatsapp: session?.profile?.phone ?? "",
    },
    products: [],
  });

  // Local Storage: setting & getting data
  // useEffect(() => {
  //     const data = localStorage.getItem("transaction");
  //     if (data) {
  //         setTransaction(JSON.parse(data));
  //     }
  // }, []);

  // useEffect(() => {
  //     localStorage.setItem("transaction", JSON.stringify(transaction));
  // }, [transaction]);

  const dispatch = (data: TransactionDispatch) => {
    switch (data.action) {
      case "SET_CATEGORY":
        let form: LooseObject = {};
        data.payload?.forms?.forEach((i) => {
          form[i.key] = null;
        });

        setTransaction((prev) => ({
          ...prev,
          category: data.payload,
          form,
        }));

        return;
      case "SET_FORM":
        setTransaction((prev) => ({ ...prev, form: data.payload }));
        return;
      case "SET_PAYMENT_METHOD":
        setTransaction((prev) => ({ ...prev, payment: data.payload }));
        return;
      case "SET_PRODUCT":
        setTransaction((prev) => ({ ...prev, product: data.payload }));
        return;
      case "SET_PRODUCTS":
        setTransaction((prev) => ({ ...prev, products: data.payload }));
        return;
      case "SET_PROMO":
        setTransaction((prev) => ({ ...prev, promo: data.payload }));
        return;
      case "SET_ACCOUNT":
        setTransaction((prev) => ({ ...prev, account: data.payload }));
        return;
      default:
        return;
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        data: transaction,
        dispatch,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export default TransactionProvider;
