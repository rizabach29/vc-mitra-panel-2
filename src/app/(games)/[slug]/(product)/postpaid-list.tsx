"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useContext, useEffect, useState } from "react";
import ProductAction from "./product-action";
import { TProductItem, TProductItemWithTags } from "@/Type";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";

interface IProductList {
  products?: TProductItemWithTags;
  nextRef: string;
}

function PostpaidList(prop: IProductList) {
  const { dispatch } = useContext(TransactionContext) as ITransactionContext;
  const [productKey, setProductKey] = useState<string>(
    prop.products?.products[0].products[0].key || ""
  );
  const [products, setProducts] = useState<TProductItem[]>([]);

  const onClick = (val?: TProductItem) => {
    dispatch({
      action: "SET_PRODUCT",
      payload: val,
    });
    // if (prop.nextRef && productKey)
    //   document.getElementById(prop.nextRef)?.scrollIntoView({
    //     behavior: "smooth",
    //   });
  };

  useEffect(() => {
    let selectedProduct = products.find((item) => item.key === productKey);
    if (!productKey) selectedProduct = products[0];

    onClick(selectedProduct);
  }, [productKey, products]);

  useEffect(() => {
    let formedProducts: TProductItem[] = [];
    if (prop.products) {
      formedProducts = prop.products.products.flatMap((detail) =>
        detail.products.map((item) => item)
      );
    }
    setProducts(formedProducts);
  }, [prop.products]);

  return (
    <div className="relative -mx-2 px-2">
      <Select onValueChange={(e) => setProductKey(e)} value={productKey}>
        <SelectTrigger className="col-span-2">
          <SelectValue placeholder={`Pilih Variasi`} />
        </SelectTrigger>
        <SelectContent>
          {products && products.length > 0 && (
            <>
              {products.map((item, index) => (
                <SelectItem key={index} value={item.key}>
                  {item.name}
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}

export default PostpaidList;
