"use client";

import { Select } from "@/components/ui/select";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { TProductItem } from "@/Type";
import React, { useContext } from "react";

function PostpaidSelectWrapper({
  children,
  nextRef,
  selected,
  products,
}: {
  children: React.ReactNode;
  nextRef: string;
  selected?: string;
  products: TProductItem[];
}) {
  const { dispatch, data } = useContext(
    TransactionContext
  ) as ITransactionContext;

  const onClick = (val: string) => {
    var product = products?.find((item) => item.key === val);

    dispatch({
      action: "SET_PRODUCT",
      payload: product,
    });
    if (nextRef)
      document.getElementById(nextRef)?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <Select defaultValue={selected} onValueChange={onClick}>
      {children}
    </Select>
  );
}

export default PostpaidSelectWrapper;
