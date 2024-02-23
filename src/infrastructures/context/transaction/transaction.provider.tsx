"use client";

import React, { useEffect, useState } from "react";
import TransactionContext, { TransactionDispatch } from "./transaction.context";
import { ITransaction } from "@/Type";
import { useSession } from "next-auth/react";

function TransactionProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [transaction, setTransaction] = useState<ITransaction>({
        payment: session?.user ? "transfer & points" : "transfer",
        account: {
            email: session?.user?.email ?? "",
            noWhatsapp: session?.phone ?? "",
        },
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
                setTransaction((prev) => ({
                    ...prev,
                    category: data.payload,
                    form: data.payload?.forms,
                }));

                return;
            case "SET_FORM":
                setTransaction((prev) => ({ ...prev, form: data.payload }));
                return;
            case "SET_PAYMENT":
                setTransaction((prev) => ({ ...prev, payment: data.payload }));
                return;
            case "SET_PRODUCT":
                setTransaction((prev) => ({ ...prev, product: data.payload }));
                return;
            case "SET_PROMO":
                setTransaction((prev) => ({ ...prev, promo: data.payload }));
                return;
            case "SET_ACCOUNT":
                setTransaction((prev) => ({ ...prev, account: data.payload }));
                return;
            case "SET_BANK":
                setTransaction((prev) => ({ ...prev, bank: data.payload }));
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