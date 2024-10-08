"use client";
import React, { useContext, useEffect, useState } from "react";
import { TProductItem } from "@/Type";
import ProductCard from "./[slug]/(product)/product-card";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import Filter from "./filter";
import { TValue } from "@/components/ui/combobox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function ListCategory() {
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [data, setData] = useState<TProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<TValue | undefined>();
  const route = useRouter();

  const getList = async () => {
    let searchParams = new URLSearchParams({
      page_num: `${pageIndex}`,
      page_size: "30",
    });

    setLoading(true);
    if (category) {
      var res = await fetch(
        `/api/products/items/${category.value}?` + searchParams
      );

      if (res.ok) {
        const dataJson = await res.json();

        if (dataJson.data) {
          setData(dataJson.data);
          setTotal(dataJson.data.length);
          window.scrollTo({ top: 0, behavior: "smooth" });
          setLoading(false);
          return;
        }
        setData([]);
        setTotal(0);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, [pageIndex, category]);

  return (
    <div className="flex justify-center w-full px-2">
      <div className="max-w-7xl w-full md:mt-4 mb-4 flex flex-col justify-center items-center">
        <Breadcrumb className="mb-4 hidden md:inline-flex justify-start w-full">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Daftar Produk</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="max-w-5xl w-full bg-background md:px-4 rounded-xl">
          <div className="flex px-2 sticky top-12 py-4 bg-background rounded-b-xl flex-col space-y-1.5 mb-3 z-10">
            <p className="font-semibold text-primary text-2xl">Produk</p>
            <Filter onChange={setCategory} />
          </div>
          <div className="min-h-[68vh] bg-background pb-8">
            {loading ? (
              <Loading />
            ) : (
              <>
                {data.length > 0 ? (
                  <div className="grid sm:grid-cols-4 md:grid-cols-5 grid-cols-2 gap-2 mx-2">
                    {data.map((item, idx) => (
                      <div className="w-full h-full" key={`${idx}`}>
                        <ProductCard
                          // category={item.category_alias}
                          discountedPrice={item.discounted_price}
                          name={item.name}
                          imageURL={item.image_url}
                          price={item.price}
                          onClick={() =>
                            route.push(
                              `/games/${category?.value}?item=${item.key}`
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full"></div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCategory;
