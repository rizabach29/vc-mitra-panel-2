import { TProductItemWithTags } from "@/Type";
import React from "react";
import PostpaidList from "./postpaid-list";
import ProductList from "./product-list";

interface IProductList {
  products?: TProductItemWithTags;
  nextRef: string;
  isPostpaid?: boolean;
}

function ProductWrapper(prop: IProductList) {
  if (prop.isPostpaid)
    return <PostpaidList products={prop.products} nextRef={prop.nextRef} />;
  return <ProductList products={prop.products} nextRef={prop.nextRef} />;
}

export default ProductWrapper;
