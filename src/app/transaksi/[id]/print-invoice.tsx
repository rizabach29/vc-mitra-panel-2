import { PrinterIcon } from "@heroicons/react/24/outline";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import { priceMask } from "@/Helpers";
import { Separator } from "@/components/ui/separator";
import VAPayment from "./(payment)/va-payment";
import LinkPayment from "./(payment)/link-payment";
import QRPayment from "./(payment)/qr-payment";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ILinkPayment, ITransactionHistoryDetail } from "@/types/transaction";
import { ISiteProfile } from "@/types/utils";
import { format, parseISO } from "date-fns";

interface Props extends ITransactionHistoryDetail {
  profile?: ISiteProfile;
}

function PrintInvoice(data: Props) {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle:
      "@media print { body { -webkit-print-color-adjust: exact; } @page { margin-top: 15mm; margin-bottom: 15mm; }}",
  });

  return (
    <>
      <div
        className="text-muted-foreground flex space-x-1 cursor-pointer"
        onClick={handlePrint}
      >
        <PrinterIcon className="w-4 h-4 text-muted-foreground" />
        <p className="p-0 text-xs">Cetak</p>
      </div>
      <div className="hidden">
        <div ref={componentRef} className="p-8">
          <div className="flex justify-between items-center mb-4">
            {data.profile?.logo_url && (
              <Image
                src={data.profile?.logo_url}
                alt="logo"
                width={40}
                height={40}
              />
            )}
            <div className="text-right space-x-2">
              <p className="font-medium ml-2 text-xl">Detail Transaksi</p>
              <p className="text-xs text-muted-foreground">
                {data.transaction_code}
              </p>
            </div>
          </div>
          <div className="w-full mt-2">
            <div className="bg-red-50 text-red-900 flex justify-center items-center gap-2 p-1.5">
              <div className="flex justify-center items-center bg-red-500 h-4 w-4 rounded-full text-white">
                <p className="text-xs font-bold">i</p>
              </div>
              <p className="text-xs">
                Transaksi tanpa login, wajib simpan ID transaksi & No HP.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-stretch items-center mt-2">
            <div className="space-y-4 w-full gap-3 h-full mt-1">
              <div className="w-full bg-background h-full px-4 pt-3 pb-6 rounded-lg shadow flex-1">
                <p className="font-medium text-lg text-primary">
                  Rincian Transaksi
                </p>
                <div className="mt-4 space-y-4 h-full">
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
                    <p className="text-muted-foreground text-sm">
                      Biaya Payment
                    </p>
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
                  <div className="w-full bg-background h-full pt-4 rounded-lg border flex-1 relative overflow-clip">
                    <div className="px-4">
                      <p className="font-medium text-lg text-primary">
                        Rincian Pembayaran
                      </p>
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
                    {(data.payment_information as ILinkPayment).deeplink_url ||
                    (data.payment_information as ILinkPayment).mobile_url ||
                    (data.payment_information as ILinkPayment).web_url ? (
                      <>
                        <Separator className="my-3 w-full" />
                        <div className="px-4">
                          <p className="font-medium text-lg text-primary">
                            Tujuan Pembayaran
                          </p>
                          <div className="mt-4 space-y-4 h-full">
                            {data.payment_information.payment_method ==
                            "VIRTUAL_ACCOUNT" ? (
                              <VAPayment
                                payment={data.payment_information}
                                printable={true}
                              />
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
                    <div className="w-full bottom-0 mt-6">
                      <div className="bg-amber-50 border flex items-center rounded-b-lg space-x-2 text-amber-800 px-4 py-1.5">
                        <InfoCircledIcon />
                        <p className="text-xs">
                          Jika transaksi gagal, saldo anda akan dikembalikan
                          dalam bentuk point
                        </p>
                      </div>
                    </div>
                  </div>
                  <>
                    {data.payment_information.guide ? (
                      <div className="w-full bg-background h-full px-4 pt-4 pb-6 rounded-lg border flex-1 text-muted-foreground">
                        <p className="font-medium text-lg text-primary mb-4">
                          Cara Pembayaran
                        </p>
                        <div
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
        </div>
      </div>
    </>
  );
}

export default PrintInvoice;
