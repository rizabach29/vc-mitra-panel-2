import { priceMask } from "@/Helpers";
import {
    IFlashSaleInProduct,
    IFlashSaleProduct,
    IPromo,
    ITransaction,
    TProduct,
} from "@/Type";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableRow,
} from "@/components/ui/table";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import { isWithinInterval, parseISO } from "date-fns";

const getTotalPrice = (
    product: TProduct,
    flashSale?: IFlashSaleInProduct,
    promo?: IPromo
) => {
    let num = 0;

    num += product.sale_price;
    if (flashSale) num -= flashSale.discount_price;
    if (promo) {
        if (promo.promo_type == "fix") num -= promo.promo_value;
        else num -= (promo.promo_value * product.sale_price) / 100;
    }

    return priceMask(num);
};

interface IDetailProp extends ITransaction {
    isOpen: boolean;
    onOpenChange: (e: boolean) => void;
}

export function Purchase({
    product,
    category,
    promo,
    isOpen,
    onOpenChange,
}: IDetailProp) {
    if (promo) {
        if (
            !isWithinInterval(new Date(), {
                start: parseISO(promo.start_at),
                end: parseISO(promo.finish_at),
            })
        )
            promo = undefined;
    }

    let flashSale;
    if (product.flash_sales && product.flash_sales.length > 0)
        flashSale = product.flash_sales[0];

    const total = getTotalPrice(product, flashSale, promo);

    return (
        <Dialog open={isOpen} defaultOpen={false} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Detail Pesanan</DialogTitle>
                    <DialogDescription>
                        Cek pesanan anda terlebih dahulu sebelum melanjutkan
                        pembayaran.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Card className="bg-slate-50 text-xs p-4 flex items-center space-x-4">
                        {/* {val.logo_image !== "" ? (
                                        <img
                                            alt="Remy Sharp"
                                            className="rounded hover:scale-125 transition duration-300 hover:rotate-12"
                                            src={val.logo_image}
                                        />
                                    ) : ( */}
                        <div className="h-fit w-fit p-2">
                            <SketchLogoIcon className="m-auto" />
                        </div>
                        {/* )} */}
                        <div>
                            <p>{category}</p>
                            <p className="font-semibold">
                                {product.product_name}
                            </p>
                        </div>
                    </Card>
                    <Table>
                        <TableBody className="text-xs">
                            <TableRow>
                                <TableCell>Harga</TableCell>
                                <TableCell className="text-right space-y-1">
                                    {flashSale ? (
                                        <>
                                            <div className="flex space-x-2 justify-end">
                                                <p className="text-red-500">
                                                    Flash Sale
                                                </p>
                                                <p className="line-through">
                                                    {priceMask(
                                                        product.sale_price
                                                    )}
                                                </p>
                                            </div>
                                            <p>
                                                {priceMask(
                                                    product.sale_price -
                                                        flashSale.discount_price
                                                )}
                                            </p>
                                        </>
                                    ) : (
                                        <>{priceMask(product.sale_price)}</>
                                    )}
                                </TableCell>
                            </TableRow>
                            {promo && (
                                <TableRow>
                                    <TableCell>Promo</TableCell>
                                    <TableCell className="text-right text-red-500">
                                        {promo.promo_type == "fix"
                                            ? `- ${priceMask(
                                                  promo.promo_value
                                              )}`
                                            : `- ${promo.promo_value}%`}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>Total Harga</TableCell>
                                <TableCell className="text-right">
                                    {total}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
                <DialogFooter>
                    <Button type="submit">Bayar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
