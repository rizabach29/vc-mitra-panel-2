import React from "react";
import Link from "next/link";
import { priceMask } from "@/Helpers";
import { IFlashSaleInProduct } from "@/types/flash-sale";
import { Progress } from "@/components/ui/progress";

function FlashSaleCard({
  data,
  selected,
}: {
  data: IFlashSaleInProduct;
  selected?: boolean;
}) {
  const disc = Math.ceil(
    ((data.price - data.discounted_price) / data.price) * 100
  );
  return (
    <Link
      href={`/${data.category_key}?item=${data.key}`}
      className="w-full h-full"
    >
      <div
        className={`min-h-[6rem] h-full bg-white hover:bg-zinc-50 text-[85%] md:text-[100%] rounded-xl overflow-clip border-t-0 border-r-0 ${
          selected ? "border-4" : "border"
        }`}
      >
        <div className="p-0 flex flex-col m-0 h-full">
          <div className="pt-3 flex flex-col justify-between h-full items-start">
            <div className="flex space-x-0.5 px-3 ">
              <p className="text-xs font-semibold" style={{ fontSize: "80%" }}>
                {data.name}
              </p>
            </div>
            <div className="w-full px-3 ">
              <div className="flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-1">
                    <p
                      className="px-1.5 py-0.5 text-xs my-0.5 font-semibold rounded-md bg-amber-300 "
                      style={{ fontSize: "75%" }}
                    >
                      {disc}%
                    </p>
                    <p
                      className="line-through text-xs mt-0.5"
                      style={{ fontSize: "70%" }}
                    >
                      {priceMask(data.price)}
                    </p>
                  </div>
                  <p
                    className="text-red-500 text-xs font-medium"
                    style={{ fontSize: "80%" }}
                  >
                    {priceMask(data.discounted_price)}
                  </p>
                </div>
              </div>
              <Progress
                value={
                  (100 * data.flash_sale_info.remaining) /
                  data.flash_sale_info.total
                }
                className="mt-2"
              />
              <p
                className="text-xs mt-0.5 text-muted-foreground"
                style={{ fontSize: "65%" }}
              >
                Tersisa {data.flash_sale_info.remaining} Lagi
              </p>
            </div>
            <div className="h-full w-full flex items-end mt-2.5">
              <div className="bg-zinc-100 text-zinc-400 w-full">
                <p
                  className="text-xs text-center md:py-0.5"
                  style={{ fontSize: "75%" }}
                >
                  {data.category_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FlashSaleCard;
