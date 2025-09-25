"use client";

import { priceMask } from "@/Helpers";
import React from "react";

type prop = {
  name: string;
  imageURL: string;
  price: number;
  discountedPrice: number | undefined;
};

function ProductCardDetail(props: prop) {
  return (
    <div
      className={`min-h-[4.2rem] overflow-clip flex items-center p-2 relative h-full bg-white hover:bg-slate-50 rounded-xl cursor-pointer`}
    >
      {props.discountedPrice ? (
        <div className="absolute right-0 top-0 py-0.5 px-1 bg-amber-300 rounded-bl-lg">
          <p className="font-bold text-xs">
            {Math.ceil(
              ((props.price - props.discountedPrice) / props.price) * 100
            )}
            %
          </p>
        </div>
      ) : null}
      <div className="p-0 flex flex-col m-0">
        <div className="flex h-full items-start">
          <div className="w-full pl-1 ">
            <h4 className={`text-xs font-semibold`}>{props.name}</h4>
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

export default ProductCardDetail;
