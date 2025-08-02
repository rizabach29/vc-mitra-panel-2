"use client";
import React, { useEffect, useState } from "react";
import FlashSaleCard from "./flash-sale-card";
import Image from "next/image";
import Loading from "../loading";
import { IFlashSaleInfo } from "@/types/flash-sale";
import CountdownCard from "../dashboard/countdown-card";
import { parseISO } from "date-fns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Page() {
  const [data, setData] = useState<IFlashSaleInfo | undefined>();
  const [loading, setLoading] = useState(true);

  const getFlashSale = async () => {
    let searchParams = new URLSearchParams({
      page_num: "1",
    });

    setLoading(true);
    var res = await fetch(`/api/flash-sales?` + searchParams);
    setLoading(false);
    if (res.ok) {
      const dataJson = await res.json();
      if (dataJson.data) {
        setData(dataJson.data);
        // setTotal(dataJson.pagination.total_data);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setData(undefined);
    }
  };

  useEffect(() => {
    (async () => {
      await getFlashSale();
    })();
  }, []);

  return (
    <div className="md:pt-4 pb-4 px-2 flex w-full justify-center">
      <div className="max-w-7xl w-full flex flex-col justify-center items-center">
        <Breadcrumb className="mb-4 hidden md:inline-flex justify-start w-full">
          <BreadcrumbList>
            <BreadcrumbItem position={1}>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem position={2}>
              <BreadcrumbPage>Flash Sale</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="max-w-5xl w-full">
          {loading ? (
            <div
              className={`container min-h-full flex items-center justify-center md:mx-2 px-4`}
            >
              <Loading />
            </div>
          ) : data ? (
            <>
              <div className="flex px-2 sticky top-10 py-4 backdrop-blur-lg rounded-xl bg-[#F0F8F6] flex-col space-y-1.5 mb-3 z-10">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-lg flex">
                    <span className="mr-3">
                      <Image
                        src={"/assets/illustration/lightning.gif"}
                        alt="flash"
                        width={20}
                        height={20}
                      />
                    </span>
                    {data.name}
                  </p>
                  <CountdownCard date={parseISO(data.expired_at)} />
                </div>
              </div>
              <div className="min-h-[68vh]">
                {data.products?.length > 0 ? (
                  <div className="grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 grid-cols-2 gap-4 mx-2">
                    {data.products.map((item, idx) => (
                      <div className="w-full h-full" key={`${idx}`}>
                        <FlashSaleCard data={item} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <h5 className="text-xl font-bold">Tidak ada Flash Sale</h5>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              className={`container min-h-full flex items-center justify-center md:mx-2 px-4`}
            >
              <h4 className="text-2xl text-muted-foreground font-semibold my-10">
                Tidak ada Flash Sale
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
