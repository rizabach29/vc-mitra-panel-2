import { IProductCategory } from "@/Type";
import { Card, CardContent } from "@/components/ui/card";
import { CubeIcon } from "@radix-ui/react-icons";
import React from "react";

function Header({ category }: { category: IProductCategory }) {
    return (
        <Card className="w-full mt-2 h-full min-w-fit">
            <CardContent className="p-0 pb-4">
                {category?.banner_image ? (
                    <img
                        alt="Remy Sharp"
                        src={category?.banner_image}
                        style={{ aspectRatio: 64 / 9 }}
                        className={`relative object-cover rounded-t-xl`}
                    />
                ) : (
                    <div
                        className="relative object-cover rounded-t-xl bg-slate-300"
                        style={{ aspectRatio: 64 / 9 }}
                    />
                )}
                <div className="px-6">
                    <div className="flex -mt-4 ml-4 z-40 absolute items-end">
                        {category?.logo_image ? (
                            <img
                                alt="Remy Sharp"
                                className="rounded  border bg-card text-card-foreground shadow w-16"
                                src={category?.logo_image}
                            />
                        ) : (
                            <div className="border rounded flex items-center justify-center w-16 h-16 bg-slate-200">
                                <CubeIcon className="w-10 h-10 text-white" />
                            </div>
                        )}
                        <div className="flex flex-col mb-2 ml-3">
                            <h5 className="font-bold">{category?.alias}</h5>
                        </div>
                    </div>
                    <p className="text-xs pt-[64px] text-muted-foreground leading-5">
                        {category?.description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default Header;
