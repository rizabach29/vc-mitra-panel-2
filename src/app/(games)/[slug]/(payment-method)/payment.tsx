"use client";
import React, { RefObject, useContext, useEffect, useState } from "react";
import PaymentList from "./payment-list";
import { IPaymentGroup } from "@/types/transaction";
import { IProductCategory } from "@/Type";

function Payment({
  nextRef,
  category,
}: {
  nextRef: string | null;
  category: IProductCategory;
}) {
  const [paymentGroups, setPaymentGroups] = useState<IPaymentGroup[]>([]);

  const getBank = async () => {
    var res = await fetch(`/api/payment`);

    if (res.ok) {
      const resData = await res.json();
      if (resData) {
        setPaymentGroups(resData.data);
        return;
      }
    }
  };

  useEffect(() => {
    getBank();
  }, []);

  if (paymentGroups.length > 0)
    return (
      <PaymentList
        nextRef={nextRef}
        paymentGroup={paymentGroups}
        category={category}
      />
    );
}

export default Payment;
