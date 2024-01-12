"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import React, { useEffect, useMemo, useState } from "react";
import Filter, { TFilter } from "./filter";
import { Label } from "@/components/ui/label";
import FlashSaleCard from "./flash-sale-card";
import { IFlashSaleProduct } from "@/Type";

function Page() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState<TFilter>();
    const [total, setTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [data, setData] = useState<IFlashSaleProduct[]>([]);

    const totalPage = useMemo(() => Math.ceil(total / 12), [total]);

    const getFlashSale = async () => {
        var res = await fetch(
            `/api/flash-sales?` +
                new URLSearchParams({
                    page_num: "1",
                    page_size: "12",
                }),
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${cookieStore.get("mantapu")?.value}`,
                },
            }
        );

        if (res.ok) {
            const dataJson = await res.json();
            setData(dataJson.data);
            setTotal(dataJson.pagination.total_data);
        }
    };

    useEffect(() => {
        (async () => {
            await getFlashSale();
        })();
    }, [filter]);

    return (
        <div className="md:mx-2">
            <div className="flex px-2 sticky top-10 py-4 bg-zinc-50 flex-col space-y-1.5 mb-3">
                <p className="font-semibold text-lg">Flash Sale⚡</p>
                <div className="flex space-x-1">
                    <Input
                        id="invoice"
                        placeholder="Search..."
                        className="bg-white"
                    />
                    <Filter onChange={setFilter} />
                </div>
            </div>
            <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 mx-2 min-h-[72vh]">
                {data.map((item, idx) => (
                    <FlashSaleCard key={`${idx}`} data={item} />
                ))}
            </div>
            <div className="flex items-center justify-between space-x-2 py-4 mt-2">
                <p className="text-xs text-muted-foreground mx-2">
                    Total {total} data
                </p>
                <div className="flex items-center justify-end space-x-2">
                    <p className="font-semibold text-xs mr-2">
                        Page {pageIndex} of {totalPage}
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPageIndex((prev) => prev - 1)}
                        disabled={pageIndex == 1}
                        className="flex items-center justify-center"
                    >
                        <span>Prev</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPageIndex((prev) => prev + 1)}
                        disabled={pageIndex >= totalPage}
                        className="flex justify-center items-center"
                    >
                        <span>Next</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Page;
