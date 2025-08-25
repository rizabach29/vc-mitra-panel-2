"use client";
import { PhoneInputIndo } from "@/components/ui/custom-input";
import { Input } from "@/components/ui/input";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

function FormConfirmation() {
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const { data: session } = useSession();

  return (
    <div className="grid sm:grid-cols-2 w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <h3 className="ml-1 text-sm">Email *</h3>
        <Input
          id="email"
          type="email"
          placeholder="Masukan alamat Email"
          value={data.account?.email}
          disabled={!!session}
          onChange={(e) =>
            dispatch({
              action: "SET_ACCOUNT",
              payload: {
                noWhatsapp: data.account?.noWhatsapp ?? "",
                email: e.target.value,
              },
            })
          }
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <h3 className="ml-1 text-sm">No. Whatsapp *</h3>
        <PhoneInputIndo
          id="whatsapp"
          placeholder="Contoh: 81XXXXXXXXXX"
          maxLength={13}
          value={data.account?.noWhatsapp}
          disabled={!!session}
          onValueChange={(e) => {
            dispatch({
              action: "SET_ACCOUNT",
              payload: {
                email: data.account?.email ?? "",
                noWhatsapp: `${e}`,
              },
            });
          }}
        />
      </div>
    </div>
  );
}

export default FormConfirmation;
