"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import FlashSaleCard from "./flash-sale-card";
import { IFlashSaleProduct } from "@/Type";
import { debounce } from "@/Helpers";

function Page() {
    const [total, setTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [data, setData] = useState<IFlashSaleProduct[]>([]);
    const [search, setSearch] = useState("");

    const totalPage = useMemo(() => Math.ceil(total / 12), [total]);

    const getFlashSale = async () => {
        let searchParams = new URLSearchParams({
            page_num: "1",
            page_size: "12",
            product_search: search,
        });

        var res = await fetch(`/api/flash-sales?` + searchParams);

        if (res.ok) {
            const dataJson = await res.json();
            if (dataJson.data) {
                setData(dataJson.data);
                setTotal(dataJson.pagination.total_data);
                return;
            }
            setData([]);
            setTotal(0);
        }
    };

    useEffect(() => {
        (async () => {
            await getFlashSale();
        })();
    }, [search]);

    const doSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, 500);

    return (
        <div className="md:mx-2">
            <div className="flex px-2 sticky top-0 py-4 bg-zinc-50 flex-col space-y-1.5 mb-3">
                <p className="font-semibold text-lg">Flash Sale⚡</p>
                <div className="flex space-x-1">
                    <Input
                        id="invoice"
                        placeholder="Search..."
                        className="bg-white"
                        onChange={doSearch}
                    />
                </div>
            </div>
            <div className="min-h-[72vh]">
                <div className="grid sm:grid-cols-4 grid-cols-3 gap-2 mx-2">
                    {data?.map((item, idx) => (
                        <div className="w-full h-full" key={`${idx}`}>
                            <FlashSaleCard data={item} />
                        </div>
                    ))}
                </div>
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