"use client";

import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { TProductItem } from "@/Type";
import React, { useContext } from "react";

interface IProps {
  children: React.ReactNode;
  data: TProductItem;
}

function ProductCardWrapper(props: IProps) {
  const { data } = useContext(TransactionContext) as ITransactionContext;

  return (
    <div
      className={`rounded-xl ${
        data.product?.key == props.data.key
          ? `border-2 border-primary text-primary`
          : "border"
      }`}
    >
      {props.children}
    </div>
  );
}

export default ProductCardWrapper;
