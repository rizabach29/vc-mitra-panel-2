"use client";

import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { TProductItem } from "@/Type";
import React, { useContext } from "react";

interface IProps {
  nextRef: string | null;
  val: TProductItem;
  children: React.ReactNode;
}

function ProductAction(props: IProps) {
  const { dispatch } = useContext(TransactionContext) as ITransactionContext;

  const onClick = () => {
    console.log("Selected Product", props.val);
    dispatch({
      action: "SET_PRODUCT",
      payload: props.val,
    });
    if (props.nextRef)
      document.getElementById(props.nextRef)?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return <div onClick={onClick}>{props.children}</div>;
}

export default ProductAction;
