"use client";

import React, { RefObject, useCallback, useContext } from "react";
import Image from "next/image";
import { priceMask } from "@/Helpers";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IPayment, IPaymentGroup } from "@/types/transaction";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

function PaymentList({
  paymentGroup,
  nextRef,
}: {
  paymentGroup: IPaymentGroup[];
  nextRef: RefObject<HTMLDivElement>;
}) {
  const { toast } = useToast();
  const { dispatch, data } = useContext(
    TransactionContext
  ) as ITransactionContext;

  const paymentFee = useCallback(
    (payment: IPayment) => {
      let total = 0;

      if (data.product) {
        total = data.product.discounted_price || data.product.price;
        let fee = payment.fee_percent
          ? (total * payment.fee_percent) / 100
          : payment.fee_amount;

        total += fee;

        if (total > 0) return priceMask(total);
      }

      if (total > 0) return `+ ${priceMask(total)}`;
    },
    [data.product, data.payment]
  );

  const selectPayment = useCallback(
    (payment: IPayment) => {
      if (!data.product) {
        return toast({
          title: "Failed",
          description: "Pilih produk terlebih dahulu",
          variant: "destructive",
        });
      }
      if (payment.payment_method == "SALDO") {
        let price = data.product.discounted_price || data.product.price;
        price += payment.fee_amount;
        if (price > payment.saldo)
          return toast({
            title: "Failed",
            description: "Saldo anda tidak cukup",
            variant: "destructive",
          });
      }
      dispatch({
        action: "SET_PAYMENT_METHOD",
        payload: payment,
      });
      nextRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    },
    [data.product, data.payment]
  );

  return (
    <>
      <Accordion type="multiple" defaultValue={paymentGroup.map((i) => i.name)}>
        {paymentGroup.map((group, idx) => (
          <AccordionItem key={idx.toString()} value={group.name}>
            <AccordionTrigger className="text-muted-foreground text-xs">
              {group.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid sm:grid-cols-3 grid-cols-2 gap-2">
                {group.payment_method.map((item) => (
                  <Card
                    key={item.name}
                    className={`flex hover:bg-zinc-50 rounded-lg justify-between items-center px-3 py-3 cursor-pointer ${
                      data.payment?.payment_channel == item.payment_channel &&
                      `border-2 border-primary`
                    }`}
                    onClick={(e) => selectPayment(item)}
                  >
                    <div>
                      <p className="text-xs md:mt-0">{item.name}</p>

                      <p
                        className={`text-xs mt-0.5 ${
                          data.payment?.payment_channel == item.payment_channel
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {paymentFee(item)}
                      </p>
                    </div>
                    <div className="md:flex items-center gap-4">
                      {item.image_url ? (
                        <Image
                          alt={item.name}
                          title={item.name}
                          src={item.image_url}
                          width={50}
                          height={50}
                        />
                      ) : (
                        <p className="text-xl text-left">🪙</p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default PaymentList;
