"use client";
import { IQRPayment } from "@/types/transaction";
import React from "react";
import QRCode from "react-qr-code";

function QRPayment({ payment }: { payment: IQRPayment }) {
  if (payment.qr_code || payment.qr_image_url)
    return (
      <div className="w-full">
        <p className="text-muted-foreground">QR Code Pembayaran</p>
        <div className="h-full max-h-44 aspect-square mt-3">
          {payment.qr_code ? (
            <QRCode
              size={256}
              style={{
                height: "auto",
                maxWidth: "100%",
                width: "100%",
              }}
              value={payment.qr_code}
              viewBox={`0 0 256 256`}
            />
          ) : (
            <img src={payment.qr_image_url} height={164} width={164} />
          )}
        </div>
      </div>
    );
}

export default QRPayment;
