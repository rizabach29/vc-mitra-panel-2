import { IPromo } from "@/Type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import PromoCard from "./promo-card";
import { useToast } from "@/components/ui/use-toast";

type GetType = "category" | "product";

function Promo({
    categoryUuid,
    productUuid,
    listProductId,
    onPromoSelected,
}: {
    categoryUuid: string;
    productUuid?: string;
    listProductId: string[];
    onPromoSelected: (promo?: IPromo) => void;
}) {
    const [selectedPromo, setSelectedPromo] = useState<IPromo>();
    const [promos, setPromos] = useState<IPromo[]>([]);
    const [productPromos, setProductPromos] = useState<IPromo[]>([]);
    const [hiddenPromo, setHiddenPromo] = useState<IPromo>();
    const [hiddenPromoCode, setHiddenPromoCode] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const useOtherPromo = async () => {
        await getHiddenPromo();
    };

    const getData = async (id?: string) => {
        setLoading(true);
        let qParams = new URLSearchParams();

        if (id) qParams.append("product_uuid", id);
        else qParams.append("category_uuid", categoryUuid);

        var res = await fetch(`/api/products/promo?` + qParams);

        if (res.ok) {
            var result = await res.json();

            if (result.data) {
                if (id) {
                    setProductPromos(result.data);
                    setLoading(false);
                    return;
                }

                setPromos(result.data);
                setLoading(false);
                return;
            }

            if (id) {
                setProductPromos([]);
                setLoading(false);
                return;
            }

            setPromos([]);
        }
        setLoading(false);
    };

    const getHiddenPromo = async () => {
        setLoading(true);
        var res = await fetch(`/api/products/promo/${hiddenPromoCode}?`);

        if (res.ok) {
            var result = await res.json();

            if (result.data) {
                if (
                    (result.data.ref_category &&
                        result.data.ref_category?.uuid == categoryUuid) ||
                    (result.data.ref_product &&
                        listProductId.some(
                            (i) => i === result.data.ref_product?.uuid
                        ))
                ) {
                    setHiddenPromo(result.data);
                    setLoading(false);
                    setSelectedPromo(result.data.id);
                    return;
                }
            }
        }

        toast({
            title: "Failed",
            description: "Promo Tidak Ditemukan",
            variant: "destructive",
        });
        setHiddenPromo(undefined);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getData(productUuid);
        if (selectedPromo?.ref_product?.uuid != productUuid) {
            setSelectedPromo(undefined);
            onPromoSelected();
        }
    }, [productUuid]);

    const selectPromo = (isSecret: boolean, promo?: IPromo) => {
        if (promo) {
            if (
                !isSecret ||
                (isSecret && promo?.ref_product?.uuid == productUuid)
            ) {
                setSelectedPromo(promo);
                onPromoSelected(promo);
                return;
            }

            toast({
                title: "Failed",
                description:
                    "Promo tidak dapat digunakan untuk product yang dipilih",
                variant: "destructive",
            });
            return;
        }
        setSelectedPromo(undefined);
        onPromoSelected(undefined);
    };

    return (
        <div className="space-y-3">
            <div className="mt-2 flex space-x-2 items-center">
                <Input
                    placeholder="Punya Kode Promo? Masukan di sini"
                    value={hiddenPromoCode}
                    onChange={(e) => setHiddenPromoCode(e.target.value)}
                />
                <Button disabled={loading} size="sm" onClick={useOtherPromo}>
                    {loading ? "Loading..." : "Get Promo"}
                </Button>
            </div>
            {hiddenPromo && (
                <PromoCard
                    promo={hiddenPromo}
                    selected={selectedPromo}
                    setSelected={(e) => selectPromo(true, e)}
                    isSecret
                />
            )}
            {productPromos.map((i) => (
                <PromoCard
                    promo={i}
                    selected={selectedPromo}
                    setSelected={(e) => selectPromo(false, e)}
                />
            ))}
            {promos.map((i) => (
                <PromoCard
                    promo={i}
                    selected={selectedPromo}
                    setSelected={(e) => selectPromo(false, e)}
                />
            ))}
        </div>
    );
}

export default Promo;
