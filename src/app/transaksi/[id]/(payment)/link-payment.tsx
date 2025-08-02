"use client";
import { Button } from "@/components/ui/button";
import { ILinkPayment } from "@/types/transaction";
import { useRouter } from "next/navigation";
import React from "react";

function LinkPayment({ payment }: { payment: ILinkPayment }) {
  const router = useRouter();

  return (
    <>
      <div className="w-full">
        <p className="text-muted-foreground w-full">
          Klik tombol untuk link pembayaran
        </p>
        <div className="block md:hidden">
          <Button
            className="w-full bg-green-500 text-white mt-2"
            size="sm"
            onClick={() =>
              router.push(
                payment.deeplink_url ||
                  payment.mobile_url ||
                  payment.web_url ||
                  ""
              )
            }
          >
            Bayar Sekarang
          </Button>
        </div>
        <div className="hidden md:block">
          <Button
            className="w-full bg-green-500 text-white mt-2"
            size="sm"
            onClick={() =>
              router.push(
                payment.deeplink_url ||
                  payment.web_url ||
                  payment.mobile_url ||
                  ""
              )
            }
          >
            Bayar Sekarang
          </Button>
        </div>
      </div>
    </>
  );
}

export default LinkPayment;
