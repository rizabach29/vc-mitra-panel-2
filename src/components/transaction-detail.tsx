"use client";

import React, { useCallback, useContext, useMemo } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableFooter, TableRow } from "./ui/table";
import Image from "next/image";
import { getFeePrice, getTotalPrice, priceMask } from "@/Helpers";
import { useSession } from "next-auth/react";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";

function TransactionDetail() {
  const { data: session } = useSession();
  const { data: transaction } = useContext(
    TransactionContext
  ) as ITransactionContext;

  const total = useMemo(() => {
    if (transaction.category?.is_postpaid) {
      if (transaction.tagihan)
        return getTotalPrice({
          product: transaction.tagihan,
          promo: transaction.promo,
          payment: transaction.payment,
          type: "inquiry",
        });
    } else {
      if (transaction.product)
        return getTotalPrice({
          product: transaction.product,
          promo: transaction.promo,
          payment: transaction.payment,
          type: "product",
        });
    }

    return 0;
  }, [
    transaction.product,
    transaction.promo,
    transaction.payment,
    transaction.category,
    transaction.tagihan,
  ]);

  const fee = useMemo(() => {
    let totalFee = 0;

    if (transaction.category?.is_postpaid) {
      if (transaction.tagihan)
        totalFee = getFeePrice({
          product: transaction.tagihan,
          payment: transaction.payment,
          type: "inquiry",
        });
    } else {
      totalFee = getFeePrice({
        product: transaction.product,
        payment: transaction.payment,
        type: "product",
      });
    }

    return priceMask(totalFee);
  }, [
    transaction.product,
    transaction.payment,
    transaction.category,
    transaction.tagihan,
  ]);

  const getTotalBelanja = useCallback(() => {
    if (transaction?.category?.is_postpaid)
      return priceMask(
        (transaction?.tagihan?.admin_total || 0) +
          (transaction?.tagihan?.bill_total || 0)
      );

    return priceMask(
      transaction.product?.discounted_price || transaction.product?.price
    );
  }, [transaction.product, transaction.tagihan, transaction.category]);

  if (transaction.product && transaction.category) {
    return (
      <div>
        <div className="grid gap-4">
          <Card className="bg-zinc-50 p-4">
            <div className="text-xs mb-4 flex space-x-4">
              <div className="h-10 w-10 p-2 relative">
                <Image
                  fill
                  alt="Remy Sharp"
                  className="rounded absolute"
                  src={
                    transaction.category?.image_url
                      ? transaction.category?.image_url
                      : "https://s3-alpha-sig.figma.com/img/933a/09a5/c2747dd0ee221420e9c6686f29720965?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K3KMtkf5K~~yfNXa2ea9tssgpbLWFv1iMb8SsvtvV3ge91j3ZZW4AmC0xllLpF4amUV-ynFUhLL-V67bEY1ZVqHfVomDFdxW920v8ewfTclN1ZVIp1u2LgV1AmDbyh~SvyFud9HrNh1H5tP-9Rnm-RKir5IS8mJaSDzNi20CeDaossF7AONxvkwNQnZCunulKYElAo133CzmYW~VeNY4WiGIAdMo-pHrAPdXLKSJ9k56scwyeUVy6gVXPe6ePXg3UnqsojH6T43JeQL2qB0O-vU~Fgmbf60Ybt-lz-DzJe21vr2RXgC8Hmb0M8n53D5~gIndUD7CSa~Cjcakv5Cduw__"
                  }
                />
              </div>
              <div>
                <p className="text-xs">{transaction.category?.name}</p>
                <p className="font-semibold">{transaction.product?.name}</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs font-semibold">Informasi</p>
              <Table className="border-y bg-background rounded mt-1">
                <TableBody className="text-xs">
                  {transaction?.form && transaction?.category?.forms
                    ? Object.keys(transaction.form).map((key) => (
                        <TableRow key={key}>
                          <TableCell>
                            {transaction.category?.forms
                              ?.find((i) => i.key == key)
                              ?.alias.replace(/_/g, " ")}
                          </TableCell>
                          <TableCell className="text-right space-y-1">
                            {transaction.form && transaction.form[key]}
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell className="text-right space-y-1">
                      {transaction?.account?.email ?? session?.profile.email}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No. Whatsapp</TableCell>
                    <TableCell className="text-right space-y-1">
                      {session ? null : "62"}
                      {transaction?.account?.noWhatsapp ??
                        session?.profile.phone}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
          <Table>
            <TableBody className="text-xs">
              <TableRow>
                <TableCell>
                  <p className="text-xs">Metode Pembayaran</p>
                </TableCell>
                <TableCell className="space-y-1">
                  <div className="flex justify-end">
                    {transaction?.payment?.image_url ? (
                      <Image
                        alt={transaction.payment.name}
                        src={transaction.payment.image_url}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <p>{transaction.payment?.name}</p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Harga</TableCell>
                <TableCell className="text-right space-y-1">
                  {/* <p className="text-xs">{getTotalBelanja()}</p> */}
                  {transaction?.category?.is_postpaid ? (
                    <p className="text-xs">{getTotalBelanja()}</p>
                  ) : (
                    <>
                      {transaction.product.discounted_price > 0 ? (
                        <>
                          <div className="flex space-x-2 justify-end text-xs">
                            <p className="text-red-500 text-xs">Discount</p>
                            <p className="line-through text-xs">
                              {priceMask(transaction.product.price)}
                            </p>
                          </div>
                          <p className="text-xs">
                            {priceMask(transaction.product.discounted_price)}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs">
                          {priceMask(transaction.product.price)}
                        </p>
                      )}
                    </>
                  )}
                </TableCell>
              </TableRow>
              {transaction?.promo ? (
                <TableRow>
                  <TableCell>Promo</TableCell>
                  <TableCell className="text-right text-red-500">
                    {!transaction.promo.is_discount_percent
                      ? `- ${priceMask(transaction.promo.discount_amount)}`
                      : `- ${transaction.promo.discount_percent}% (${priceMask(
                          (transaction.product.price *
                            transaction.promo.discount_percent) /
                            100
                        )})`}
                  </TableCell>
                </TableRow>
              ) : null}
              {transaction?.payment &&
              (transaction.payment.fee_amount ||
                transaction.payment.fee_percent) ? (
                <TableRow>
                  <TableCell>
                    Biaya Payment ({transaction.payment.payment_channel})
                  </TableCell>
                  <TableCell className="text-right">{`+ ${fee}`}</TableCell>
                </TableRow>
              ) : null}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total Harga</TableCell>
                <TableCell className="text-right font-semibold">
                  {priceMask(total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    );
  }
  return <></>;
}

export default TransactionDetail;
