import { TProductItemWithTags } from "@/Type";
import React from "react";
import PostpaidList from "./postpaid-list";
import ProductList from "./product-list";

interface IProductList {
  products?: TProductItemWithTags;
  nextRef: string;
  isPostpaid?: boolean;
  selected?: string | string[] | undefined;
}

function ProductWrapper(prop: IProductList) {
  if (prop.isPostpaid)
    return (
      <PostpaidList
        products={prop.products}
        nextRef={prop.nextRef}
        selected={prop.selected}
      />
    );
  return (
    <ProductList
      products={prop.products}
      nextRef={prop.nextRef}
      selected={prop.selected}
    />
  );
}

export default ProductWrapper;
