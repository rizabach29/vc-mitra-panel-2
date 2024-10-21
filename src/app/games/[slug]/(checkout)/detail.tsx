"use client";

import TransactionDetail from "@/components/transaction-detail";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  ICategoryForm,
  ITransaction,
  ITransactionCreate,
} from "@/types/transaction";
import { useState } from "react";
import Swal from "@/components/swal";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

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
  form,
  payment,
  account,
  products,
}: IDetailProp) {
  const [success, setSuccess] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const createTransaction = async () => {
    setLoading(true);
    if (!account || !payment || !product || !category) {
      return setLoading(false);
    }

    let phone = session ? "" : "62";

    var payload: ITransactionCreate = {
      category_key: category?.key,
      product_key: product?.key,
      payment_method: payment.payment_method,
      payment_channel: payment.payment_channel,
      email: account?.email,
      phone: phone + account?.noWhatsapp,
    };

    if (promo) payload.promo_code = promo.promo_code;

    if (form) {
      var forms: ICategoryForm[] = [];
      for (const [key, value] of Object.entries(form)) {
        forms.push({
          key,
          value: value as string,
        });
      }

      payload.form_data = forms;
    }

    var res = await fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    onOpenChange(false);
    var data = await res.json();
    if (res.ok) {
      toast({
        title: "Success",
        description: "Transaksi Sukses",
        variant: "success",
      });

      setLoading(false);
      router.push(`/transaksi/${data.data.transaction_code}`);
      return;
    }

    setSuccess(false);
    setLoading(false);
    return toast({
      title: "Failed",
      description: data.data,
      variant: "destructive",
    });
  };

  if (!product) return <></>;
  return (
    <>
      <Dialog open={isOpen} defaultOpen={false} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>Detail Pesanan</DialogTitle>
            <DialogDescription>
              Cek pesanan anda terlebih dahulu sebelum melanjutkan pembayaran.
            </DialogDescription>
          </DialogHeader>
          {!session && (
            <Alert className="bg-red-50 text-red-900">
              <InfoCircledIcon className="text-white" />
              <AlertTitle>Penting!</AlertTitle>
              <AlertDescription className="text-xs">
                Pastikan anda menyimpan nomor transaksi dan email serta nomor
                telpon yang anda gunakan dalam proses transaksi.
              </AlertDescription>
            </Alert>
          )}
          <TransactionDetail
            products={products}
            payment={payment}
            category={category}
            form={form}
            product={product}
            promo={promo}
            account={account}
          />
          <Alert className="bg-amber-50 text-amber-900">
            <InfoCircledIcon className="text-white" />
            <AlertDescription className="text-xs">
              Jika transaksi gagal, saldo anda akan dikembalikan dalam bentuk
              saldo point
            </AlertDescription>
          </Alert>
          <div className="flex justify-between items-center">
            <Button
              size="sm"
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 space-x-2"
              onClick={createTransaction}
            >
              <ShoppingCartIcon className="text-white h-4 w-4" />
              {!loading ? <div>Bayar</div> : <div>Loading...</div>}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Swal
        open={alertOpen}
        variant={success ? "success" : "failed"}
        title="Checkout Berhasil"
        description="Terimakasih telah memesan"
      />
    </>
  );
}
