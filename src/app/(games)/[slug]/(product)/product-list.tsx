import { TProductItemWithTags } from "@/Type";
import React, { RefObject, useContext, useRef } from "react";
import ProductCard from "./product-card";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { Badge } from "@/components/ui/badge";

interface IProductList {
  products?: TProductItemWithTags;
  nextRef: RefObject<HTMLDivElement>;
}

function ProductList(prop: IProductList) {
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;

  const ref = useRef<HTMLDivElement>(null);

  function onTagSelected(tag: string) {
    const section = document.getElementById("tag-" + tag);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className="relative -mx-2 px-2" ref={ref}>
        {prop.products && prop.products.tags?.length > 0 ? (
          <div className="flex -mt-2 sticky top-12 bg-background z-10 py-2 gap-2">
            {prop.products.tags?.map((item) => (
              <Badge
                className="cursor-pointer"
                variant="outline"
                key={item.value}
                onClick={() => onTagSelected(item.label)}
              >
                {item.label}
              </Badge>
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
                      <ProductCard
                        selected={val.key === data.product?.key}
                        onClick={() => {
                          dispatch({
                            action: "SET_PRODUCT",
                            payload: val,
                          });
                          prop.nextRef.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                        discountedPrice={val.discounted_price}
                        name={val.name}
                        imageURL={val.image_url}
                        price={val.price}
                      />
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
