"use client";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { IVAPayment } from "@/types/transaction";
import React from "react";

function VAPayment({
  payment,
  printable = false,
}: {
  payment: IVAPayment;
  printable?: boolean;
}) {
  if (payment.virtual_account_number)
    return (
      <>
        <div className="flex justify-between w-full">
          <p className="text-muted-foreground">No Virtual Account</p>
          <div className="flex items-center justify-end">
            <p className="font-semibold">{payment.virtual_account_number}</p>
            {!printable ? (
              <CopyToClipboard text={payment.virtual_account_number} />
            ) : null}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-muted-foreground">Pemiliki Akun Rekening a.n.</p>
          <p className="">{payment.virtual_account_name}</p>
        </div>
      </>
    );
}

export default VAPayment;
