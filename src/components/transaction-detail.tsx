"use client";

import React, { useMemo } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableFooter, TableRow } from "./ui/table";
import Image from "next/image";
import { getFeePrice, getTotalPrice, priceMask } from "@/Helpers";
import { useSession } from "next-auth/react";
import { ITransaction } from "@/types/transaction";

function TransactionDetail({
  product,
  category,
  promo,
  form,
  payment,
  account,
}: ITransaction) {
  const { data: session } = useSession();

  const total = useMemo(() => {
    if (product) return getTotalPrice(product, promo, payment);
    return 0;
  }, [product, promo, payment]);

  if (product && category) {
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
                    category.image_url
                      ? category.image_url
                      : "https://s3-alpha-sig.figma.com/img/933a/09a5/c2747dd0ee221420e9c6686f29720965?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K3KMtkf5K~~yfNXa2ea9tssgpbLWFv1iMb8SsvtvV3ge91j3ZZW4AmC0xllLpF4amUV-ynFUhLL-V67bEY1ZVqHfVomDFdxW920v8ewfTclN1ZVIp1u2LgV1AmDbyh~SvyFud9HrNh1H5tP-9Rnm-RKir5IS8mJaSDzNi20CeDaossF7AONxvkwNQnZCunulKYElAo133CzmYW~VeNY4WiGIAdMo-pHrAPdXLKSJ9k56scwyeUVy6gVXPe6ePXg3UnqsojH6T43JeQL2qB0O-vU~Fgmbf60Ybt-lz-DzJe21vr2RXgC8Hmb0M8n53D5~gIndUD7CSa~Cjcakv5Cduw__"
                  }
                />
              </div>
              <div>
                <p className="text-xs">{category.name}</p>
                <p className="font-semibold">{product.name}</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs font-semibold">Informasi</p>
              <Table className="border-y bg-background rounded mt-1">
                <TableBody className="text-xs">
                  {form && category.forms
                    ? Object.keys(form).map((key) => (
                        <TableRow key={key}>
                          <TableCell>
                            {category.forms
                              ?.find((i) => i.key == key)
                              ?.alias.replace(/_/g, " ")}
                          </TableCell>
                          <TableCell className="text-right space-y-1">
                            {form[key]}
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell className="text-right space-y-1">
                      {account?.email ?? session?.profile.email}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>No. Whatsapp</TableCell>
                    <TableCell className="text-right space-y-1">
                      {session ? null : "62"}
                      {account?.noWhatsapp ?? session?.profile.phone}
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
                    {payment?.image_url ? (
                      <Image
                        alt={payment.name}
                        src={payment.image_url}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <p>{payment?.name}</p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Harga</TableCell>
                <TableCell className="text-right space-y-1">
                  {product.discounted_price > 0 ? (
                    <>
                      <div className="flex space-x-2 justify-end text-xs">
                        <p className="text-red-500 text-xs">Discount</p>
                        <p className="line-through text-xs">
                          {priceMask(product.price)}
                        </p>
                      </div>
                      <p className="text-xs">
                        {priceMask(product.discounted_price)}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs">{priceMask(product.price)}</p>
                  )}
                </TableCell>
              </TableRow>
              {promo ? (
                <TableRow>
                  <TableCell>Promo</TableCell>
                  <TableCell className="text-right text-red-500">
                    {!promo.is_discount_percent
                      ? `- ${priceMask(promo.discount_amount)}`
                      : `- ${promo.discount_percent}% (${priceMask(
                          (product.price * promo.discount_percent) / 100
                        )})`}
                  </TableCell>
                </TableRow>
              ) : null}
              {payment && (payment.fee_amount || payment.fee_percent) ? (
                <TableRow>
                  <TableCell>
                    Biaya Payment ({payment.payment_channel})
                  </TableCell>
                  <TableCell className="text-right">
                    {`+ ${priceMask(getFeePrice(product, payment))}`}
                  </TableCell>
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
