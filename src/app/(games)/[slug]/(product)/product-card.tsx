"use client";

import { priceMask } from "@/Helpers";
import React, { useMemo } from "react";

type prop = {
  selected?: boolean;
  onClick: () => void;
  name: string;
  imageURL: string;
  price: number;
  discountedPrice: number | undefined;
  discount?: string | undefined;
};

function ProductCard(props: prop) {
  const discountPercent = useMemo(() => {
    if (props.discountedPrice)
      return Math.ceil(
        ((props.price - props.discountedPrice) / props.price) * 100
      );
    return null;
  }, [props.discountedPrice, props.price]);

  return (
    <div
      className={`min-h-[4.2rem] overflow-clip flex items-center p-2 relative h-full bg-white hover:bg-slate-50 rounded-xl cursor-pointer ${
        props.selected ? `border-2 border-primary` : "border"
      }`}
      onClick={props.onClick}
    >
      {props.discountedPrice ? (
        <div className="absolute right-0 top-0 py-0.5 px-1 bg-amber-300 rounded-bl-lg">
          <p className="font-bold text-xs">{discountPercent}%</p>
        </div>
      ) : null}
      <div className="p-0 flex flex-col m-0">
        <div className="flex h-full items-start">
          <div className="w-full pl-1 ">
            <p
              className={`text-xs font-semibold ${
                props.selected ? `text-primary` : ""
              }`}
            >
              {props.name}
            </p>
            <div className="flex justify-between items-end">
              {props.discountedPrice && props.discountedPrice > 0 ? (
                <div className="md:flex items-center gap-1">
                  <p
                    className="line-through font-normal text-muted-foreground text-xs mt-0.5"
                    style={{ fontSize: "70%" }}
                  >
                    {priceMask(props.price)}
                  </p>
                  <p
                    className="text-green-500 text-xs font-medium"
                    style={{ fontSize: "75%" }}
                  >
                    {priceMask(props.discountedPrice)}
                  </p>
                </div>
              ) : (
                <div>
                  <p
                    className="text-xs font-normal text-muted-foreground"
                    style={{ fontSize: "80%" }}
                  >
                    {priceMask(props.price)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
