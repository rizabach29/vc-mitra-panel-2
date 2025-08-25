import { TProductItemWithTags } from "@/Type";
import React from "react";
import ProductCard from "./(product-card)/product-card";
import BadgeGroup from "./badge-group";
import ProductAction from "./product-action";

interface IProductList {
  products?: TProductItemWithTags;
  nextRef: string;
}

function ProductList(prop: IProductList) {
  return (
    <>
      <div className="relative -mx-2 px-2">
        {prop.products && prop.products.tags?.length > 0 ? (
          <div className="flex -mt-2 sticky top-12 bg-background z-10 py-2 gap-2">
            {prop.products.tags?.map((item) => (
              <BadgeGroup key={item.value} {...item}>
                <h3 className="text-xs p-0">{item.label}</h3>
              </BadgeGroup>
            ))}
          </div>
        ) : (
          <></>
        )}
        <div>
          {prop.products &&
            prop.products.products?.map((item) => (
              <div
                id={"tag-" + item.name}
                key={item.name}
                className="mt-4 scroll-mt-14"
              >
                <p className="text-muted-foreground">{item.name}</p>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-2 mt-4">
                  {item.products.map((val) => (
                    <div className="h-full" key={val.key}>
                      <ProductAction nextRef={prop.nextRef} val={val}>
                        <ProductCard data={val} />
                      </ProductAction>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
