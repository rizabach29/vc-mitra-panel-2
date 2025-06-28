"use client";
import React, { useEffect, useState } from "react";
import { TProductItemWithTags } from "@/Type";
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
import { Badge } from "@/components/ui/badge";

function ListCategory() {
  const [data, setData] = useState<TProductItemWithTags | null>(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<TValue | undefined>();
  const route = useRouter();

  const getList = async () => {
    let searchParams = new URLSearchParams({
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
          window.scrollTo({ top: 0, behavior: "smooth" });
          setLoading(false);
          return;
        }
        setData(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, [category]);

  function onTagSelected(tag: string) {
    const section = document.getElementById("tag-" + tag);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex justify-center w-full px-2">
      <div className="max-w-7xl w-full md:mt-4 mb-4 flex flex-col justify-center items-center">
        <Breadcrumb className="mb-4 hidden md:inline-flex justify-start w-full">
          <BreadcrumbList>
            <BreadcrumbItem position={1}>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem position={2}>
              <BreadcrumbPage>Daftar Produk</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="max-w-5xl w-full bg-background md:px-4 rounded-xl">
          <div className="flex px-2 sticky top-12 py-4 bg-background rounded-b-xl flex-col space-y-1.5 mb-3 z-10">
            <p className="font-semibold text-primary text-2xl">Produk</p>
            <Filter onChange={setCategory} />
          </div>
          <div className="min-h-[68vh] bg-background pb-8 px-2">
            {loading ? (
              <Loading />
            ) : (
              <>
                {data ? (
                  <div className="relative -mx-2 px-2">
                    {data && data.tags?.length > 0 ? (
                      <div className="flex -mt-2 sticky top-[150px] bg-background z-10 py-2 gap-2">
                        {data.tags?.map((item) => (
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
                      {data &&
                        data.products?.map((item) => (
                          <div
                            id={"tag-" + item.name}
                            key={item.name}
                            className="mt-4 scroll-mt-44"
                          >
                            <p className="text-muted-foreground">{item.name}</p>
                            <div className="grid md:grid-cols-3 grid-cols-2 gap-2 mt-4">
                              {item.products.map((val) => (
                                <div className="h-full w-full" key={val.key}>
                                  <ProductCard
                                    // category={item.category_alias}
                                    discountedPrice={val.discounted_price}
                                    name={val.name}
                                    imageURL={val.image_url}
                                    price={val.price}
                                    onClick={() =>
                                      route.push(
                                        `/games/${category?.value}?item=${val.key}`
                                      )
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
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
