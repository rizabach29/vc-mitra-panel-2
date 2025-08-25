import { TProductItem } from "@/Type";
import React from "react";
import ProductCardWrapper from "./product-card-wrapper";
import ProductCardDetail from "./product-card-detail";

interface IProps {
  data: TProductItem;
}

function ProductCard(props: IProps) {
  return (
    <ProductCardWrapper data={props.data}>
      <ProductCardDetail
        discountedPrice={props.data.discounted_price}
        imageURL={props.data.image_url}
        name={props.data.name}
        price={props.data.price}
      />
    </ProductCardWrapper>
  );
}

export default ProductCard;
