"use client";

import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { TProductItem } from "@/Type";
import React, { useContext, useEffect } from "react";

interface IProps {
  children: React.ReactNode;
  data: TProductItem;
  selected?: string | string[] | undefined;
}

function ProductCardWrapper(props: IProps) {
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;

  useEffect(() => {
    if (props.selected == props.data.key && typeof props.selected === "string")
      dispatch({
        action: "SET_PRODUCT",
        payload: props.data,
      });
  }, [props.selected, props.data]);

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
