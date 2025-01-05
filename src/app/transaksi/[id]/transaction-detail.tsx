"use client";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { priceMask } from "@/Helpers";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "@/app/loading";
import { ILinkPayment, ITransactionHistoryDetail } from "@/types/transaction";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { Separator } from "@/components/ui/separator";
import VAPayment from "./(payment)/va-payment";
import QRPayment from "./(payment)/qr-payment";
import Image from "next/image";
import BadgeTransaksi from "../badge-transaksi";
import LinkPayment from "./(payment)/link-payment";
import { format, isFuture, parseISO } from "date-fns";
import CountdownCard from "@/app/dashboard/countdown-card";
import { useSession } from "next-auth/react";
import PrintInvoice from "./print-invoice";
import { ISiteProfile } from "@/types/utils";
import { ETransactionStatus } from "@/types/enums";

function TransactionHistoryDetail({
  id,
  profile,
}: {
  id: string;
  profile?: ISiteProfile;
}) {
  const [data, setData] = useState<ITransactionHistoryDetail | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      setLoading(true);
      var re = await fetch(`/api/transaction/${id}`);

      var res = await re.json();
      setLoading(false);
      setData(res.data);
    })();
  }, [id]);

  const isPaymentNotExpired = useMemo(() => {
    if (!data) return false;
    if (data.payment_information && data.payment_information.payment_channel)
      if (data.payment_information.expired_at)
        return isFuture(parseISO(data.payment_information.expired_at));
      else return true;
    else return false;
  }, [data]);

  const isHavePaymentDetail = () => {
    if (!data) return false;
    return (
      isPaymentNotExpired &&
      data.payment_information.payment_method == "EWALLET" &&
      ((data.payment_information as ILinkPayment).deeplink_url ||
        (data.payment_information as ILinkPayment).mobile_url ||
        (data.payment_information as ILinkPayment).web_url)
    );
  };

  if (loading) return <Loading />;

  if (data) {
    return (
      <>
        <div className="flex justify-between items-center mx-2">
          <div className="sm:flex items-center gap-2">
            <h1 className="font-medium text-xl text-primary hidden md:block">
              Detail Transaksi
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="text-xs text-muted-foreground">
                  {data.transaction_code}
                </p>
                <CopyToClipboard text={data.transaction_code} />
              </div>
            </div>
          </div>
          <PrintInvoice {...data} profile={profile} />
        </div>
        {!session ? (
          <div className="w-full mt-2 sticky top-12 md:top-14 z-20">
            <div className="bg-red-50 text-red-900 flex justify-center items-center gap-2 p-1.5">
              <div className="animate-pulse flex justify-center items-center bg-red-500 h-4 w-4 rounded-full text-white">
                <p className="text-xs font-bold">i</p>
              </div>
              <p className="text-xs">
                Transaksi tanpa login, wajib simpan ID transaksi & No HP.
              </p>
            </div>
          </div>
        ) : null}
        <div className="flex flex-row justify-stretch items-center mt-2">
          <div className="grid md:grid-cols-2 w-full gap-3 h-full mt-1">
            <div className="w-full bg-background h-full px-4 pt-3 pb-6 rounded-lg shadow flex-1">
              <h2 className="font-medium text-lg text-primary">
                Rincian Transaksi
              </h2>
              <div className="mt-4 space-y-4 h-full">
                <div className="flex justify-between w-full">
                  <p className="text-muted-foreground text-sm">Status</p>
                  <div>
                    <BadgeTransaksi status={data.status} />
                  </div>
                </div>
                {data.payment_information.expired_at &&
                isFuture(parseISO(data.payment_information.expired_at)) &&
                data.status === ETransactionStatus.Unpaid ? (
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">
                      Order Expired
                    </p>
                    <CountdownCard
                      date={parseISO(data.payment_information.expired_at)}
                    />
                  </div>
                ) : null}
                <div className="flex justify-between w-full">
                  <p className="text-muted-foreground text-sm">Tanggal</p>
                  <p>{format(parseISO(data.date), "dd MMM yyyy hh:mm")}</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-muted-foreground text-sm">Produk</p>
                  <p className="">{data.category_name}</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-muted-foreground text-sm">Item</p>
                  <p className="">{data.product_name}</p>
                </div>
                {data.customer_data ? (
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">Informasi</p>
                    <div>
                      <p>{data.customer_data}</p>
                    </div>
                  </div>
                ) : null}
                <div className="flex justify-between w-full">
                  <p className="text-muted-foreground text-sm">
                    Informasi Kontak
                  </p>
                  <div className="text-right space-y-1">
                    <p>{data.email}</p>
                    <p>{data.phone}</p>
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-muted-foreground text-sm">Harga</p>
                  <div>
                    <p>{priceMask(data.price)}</p>
                  </div>
                </div>
                {data.discount != 0 ? (
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">Promo</p>
                    <div>
                      <p>-{priceMask(data.discount)}</p>
                    </div>
                  </div>
                ) : null}
                <div className="flex justify-between w-full">
                  <p className="text-muted-foreground text-sm">Biaya Payment</p>
                  <div>
                    <p>{priceMask(data.admin_fee)}</p>
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-muted-foreground text-sm">
                    Total Pembayaran
                  </p>
                  <div>
                    <p>{priceMask(data.grand_total)}</p>
                  </div>
                </div>
              </div>
            </div>
            {data.payment_information ? (
              <>
                <div className="w-full bg-background h-full pb-24 pt-3 min-h-[16rem] rounded-lg shadow flex-1 relative overflow-clip">
                  <div className="px-4">
                    <h2 className="font-medium text-lg text-primary">
                      Rincian Pembayaran
                    </h2>
                    <div className="mt-4 space-y-4 h-full">
                      <div className="flex justify-between w-full">
                        <p className="text-muted-foreground text-sm">
                          Pilihan Pembayaran
                        </p>
                        <div className="flex flex-col items-end">
                          <p className="text-sm">
                            {data.payment_information.payment_channel
                              ? `${data.payment_information.payment_method.replace(
                                  "_",
                                  " "
                                )} - ${
                                  data.payment_information.payment_channel
                                }`
                              : "🪙 Saldo Point"}
                          </p>
                          {data.payment_information.image_url ? (
                            <Image
                              className="mt-1.5"
                              alt={data.payment_information.payment_method}
                              src={data.payment_information.image_url}
                              width={50}
                              height={50}
                            />
                          ) : null}
                        </div>
                      </div>
                      <div className="flex justify-between w-full">
                        <p className="text-muted-foreground text-sm">
                          Total Pembayaran
                        </p>
                        <p className="font-semibold text-green-600">
                          {priceMask(data.grand_total)}
                        </p>
                      </div>
                    </div>
                  </div>
                  {data.order_description ? (
                    <>
                      <Separator className="my-3 w-full" />
                      <div className="px-4">
                        <h2 className="font-medium text-lg text-primary">
                          Catatan
                        </h2>
                        <div
                          className="mt-4 text-sm text-muted-foreground"
                          dangerouslySetInnerHTML={{
                            __html: data.order_description,
                          }}
                        ></div>
                      </div>
                    </>
                  ) : null}
                  {isPaymentNotExpired ? (
                    <>
                      <Separator className="my-3 w-full" />
                      <div className="px-4">
                        <h2 className="font-medium text-lg text-primary">
                          Tujuan Pembayaran
                        </h2>
                        <div className="mt-4 space-y-4 h-full">
                          {data.payment_information.payment_method ==
                          "VIRTUAL_ACCOUNT" ? (
                            <VAPayment payment={data.payment_information} />
                          ) : data.payment_information.payment_method ==
                            "EWALLET" ? (
                            <LinkPayment payment={data.payment_information} />
                          ) : (
                            <QRPayment payment={data.payment_information} />
                          )}
                        </div>
                      </div>
                    </>
                  ) : null}
                  {data.status === ETransactionStatus.Refunded ||
                  data.status === ETransactionStatus.Failed ? (
                    <div className="w-full bottom-0 absolute">
                      <div className="bg-amber-50 border flex items-center rounded-b-lg space-x-2 text-amber-800 px-4 py-1.5">
                        <InfoCircledIcon />
                        <p className="text-xs">
                          Saldo anda sudah dikembalikan. Silahkan cek{" "}
                          <Link href="/saldo" className="font-semibold">
                            Saldo Point
                          </Link>
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
                <>
                  {data.payment_information.guide ? (
                    <div className="w-full bg-background h-full px-4 pt-3 pb-6 rounded-lg shadow flex-1 text-muted-foreground col-span-full">
                      <div className="flex justify-between items-center">
                        <h2 className="font-medium text-lg text-primary">
                          Cara Pembayaran
                        </h2>
                      </div>
                      <div
                        className="mt-4"
                        dangerouslySetInnerHTML={{
                          __html: data.payment_information.guide,
                        }}
                      ></div>
                    </div>
                  ) : null}
                </>
              </>
            ) : null}
          </div>
        </div>
      </>
    );
  } else
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <h3 className="font-bold text-slate-300 text-center">
          Transaksi Tidak Ada
        </h3>
      </div>
    );
}

export default TransactionHistoryDetail;
