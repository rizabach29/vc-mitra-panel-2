"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { uniqeProduct } from "@/Helpers";
import { TProduct } from "@/Type";
import Loading from "@/app/loading";
import Header from "./header";
import ProductList from "./(product)/product-list";
import Promo from "./(promo)/promo-list";
import { useSearchParams } from "next/navigation";
import NotFound from "@/app/not-found";
import FormAccount from "./(form-id)/form-account";
import TransactionContext, {
    ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import FormConfirmation from "./(account-confirmation)/form-confirmation";
import CheckoutAction from "./(checkout)/checkout-action";
import Payment from "./(payment-method)/payment";
import TransactionProvider from "@/infrastructures/context/transaction/transaction.provider";

function Page({ params }: { params: { slug: string } }) {
    const { data, dispatch } = useContext(
        TransactionContext
    ) as ITransactionContext;
    const [product, setProduct] = useState<TProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();

    const formRef = useRef<HTMLDivElement>(null);
    const productListRef = useRef<HTMLDivElement>(null);
    const methodRef = useRef<HTMLDivElement>(null);
    const couponRef = useRef<HTMLDivElement>(null);
    const confirmationRef = useRef<HTMLDivElement>(null);

    const getData = async () => {
        setLoading(true);
        var res = await fetch(`/api/products/categories/${params.slug}?`);

        if (res.ok) {
            var result = await res.json();

            if (result.data) {
                dispatch({
                    action: "SET_CATEGORY",
                    payload: result.data,
                });

                if (result.data.products) {
                    setProduct(uniqeProduct(result.data.products));

                    var flashSaleItem = searchParams.get("fs");
                    dispatch({
                        action: "SET_PRODUCT",
                        payload: result.data.products.find(
                            (i: TProduct) => i.uuid == flashSaleItem
                        ),
                    });
                }
            }
        } else
            dispatch({
                action: "SET_CATEGORY",
                payload: null,
            });

        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading) return <Loading />;

    if (data.category === null) return <NotFound />;
    else if (data.category !== null && data.category !== undefined)
        return (
            <div className="md:grid md:grid-cols-5 md:gap-4">
                <div className="col-span-2">
                    <div>
                        <Header category={data.category} />
                    </div>
                </div>
                <div className="col-span-3">
                    {data.category.forms && (
                        <Card ref={formRef} className="w-full my-4 md:mt-2">
                            <CardContent className="mt-3">
                                <FormAccount forms={data.category.forms} />
                            </CardContent>
                        </Card>
                    )}
                    <div ref={productListRef}>
                        <ProductList
                            category={data.category.alias}
                            nextRef={methodRef}
                            products={product}
                            productSelected={data.product}
                        />
                    </div>
                    <div className="my-4" ref={methodRef}>
                        <Payment />
                    </div>
                    <Card className="w-full my-4" ref={couponRef}>
                        <CardContent>
                            <div className="flex mt-3">
                                <h4 className="font-semibold ml-1">Promo</h4>
                            </div>
                            <Separator className="my-3" />
                            <Promo
                                onPromoSelected={(e) =>
                                    dispatch({
                                        action: "SET_PROMO",
                                        payload: e,
                                    })
                                }
                                listProductId={product.map((i) => i.uuid)}
                                categoryUuid={params.slug}
                                product={data.product}
                            />
                        </CardContent>
                    </Card>
                    <div ref={confirmationRef}>
                        <FormConfirmation />
                    </div>
                    {data.product && (
                        <CheckoutAction
                            confirmationRef={confirmationRef}
                            formRef={formRef}
                            paymentRef={methodRef}
                        />
                    )}
                </div>
            </div>
        );
}

export default Page;
