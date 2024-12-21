"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IProductCategory, TProductGroup } from "@/Type";
import { CubeIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function ListGame({ name }: { name: string }) {
  const [group, setGroup] = useState<TProductGroup>({
    id: "",
    name: "All",
  });
  const [data, setData] = useState<IProductCategory[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<TProductGroup[]>([]);

  const getData = async (more: boolean) => {
    setLoading(true);
    var res = await fetch(
      `/api/products/categories/?` +
        new URLSearchParams({
          label_id: `${group?.id ?? ""}`,
        })
    );

    if (res.ok) {
      var result = await res.json();

      if (result.data) {
        if (more) setData((prev) => [...prev, result.data]);
        else setData(result.data);
      } else {
        if (!more) setData([]);
      }
    }
    setLoading(false);
  };

  const getGroup = async () => {
    var res = await fetch(`/api/products/groups/?`);

    if (res.ok) {
      let data: TProductGroup[] = [
        {
          id: "",
          name: "All",
        },
      ];
      var result = await res.json();
      data = data.concat(result.data);
      setGroups(data);
    }
  };

  useEffect(() => {
    getGroup();
  }, []);

  useEffect(() => {
    setPageIndex(1);
    getData(false);
  }, [group]);

  useEffect(() => {
    if (pageIndex > 0) getData(true);
  }, [pageIndex]);

  return (
    <div className="bg-[#F0F8F6] pb-4 flex justify-center rounded-t-xl">
      <div className="w-full max-w-7xl px-2">
        <div className="md:flex md:items-end md:justify-between sticky z-10 top-12 py-2 rounded-t-lg bg-[#F0F8F6] backdrop-blur-md">
          <div className="flex md:block items-center justify-between mt-4 ">
            <div
              className="no-scrollbar z-10 my-0.5"
              style={{
                display: "flex",
                flexDirection: "row",
                overflowX: "auto",
                scrollbarWidth: "none",
              }}
            >
              {groups.map((val, idx) => (
                <Badge
                  className={`mx-1 cursor-pointer inline-block whitespace-nowrap`}
                  variant={val.id == group.id ? "default" : "outline"}
                  key={`${idx}`}
                  onClick={() => {
                    setData([]);
                    setGroup(val);
                  }}
                >
                  {val.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 md:gap-4 gap-2 mt-2 place-items-center justify-center px-2">
          {loading ? (
            [...Array(3)].map((x, i) => (
              <Skeleton key={i} className="w-full aspect-square" />
            ))
          ) : data && data.length > 0 ? (
            data.map((val: IProductCategory, idx) =>
              val.name ? (
                <Link
                  href={`/games/${val.key}`}
                  key={idx}
                  className="w-full h-full"
                >
                  <Card className="w-full h-full min-w-fit rounded-xl hover:shadow-md hover:text-primary transition duration-300">
                    <div className="p-4 md:p-5 flex flex-col items-center">
                      <div className="overflow-clip h-20 md:h-28 w-auto rounded-xl bg-background aspect-square flex justify-center items-center">
                        {val.image_url !== "" ? (
                          <Image
                            height={500}
                            width={500}
                            alt={`${val.name} ${name}`}
                            title={`${val.name} ${name}`}
                            className="rounded-xl w-full hover:scale-125 transition duration-300"
                            src={val.image_url}
                          />
                        ) : (
                          <div className="w-full aspect-square hover:scale-125 flex justify-center items-center transition z-0 duration-300 hover:rotate-12">
                            <CubeIcon className="text-white m-auto h-20 w-20" />
                          </div>
                        )}
                      </div>
                      <h2 className="text-xs text-[70%] text-center mt-2 p-0">
                        {val.name}
                      </h2>
                    </div>
                  </Card>
                </Link>
              ) : null
            )
          ) : (
            <div className="col-span-full h-60 flex items-center justify-center">
              <h4 className="text-slate-300 font-semibold">
                Data Tidak Ditemukan
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
