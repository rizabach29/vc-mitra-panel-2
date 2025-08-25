"use client";

import { priceMask } from "@/Helpers";
import { IInquiryCheck, LooseObject, TProductForm } from "@/Type";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React, { useContext, useEffect, useState } from "react";

interface Prop {
  forms: TProductForm[];
  isCheckRequired?: boolean;
  isPostpaid?: boolean;
}

function FormAccount({ forms, isCheckRequired, isPostpaid }: Prop) {
  const { dispatch, data: selectedData } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const [data, setData] = useState<LooseObject>();
  const { toast } = useToast();
  const [nickName, setNickName] = useState<string | null>(null);
  const [checkIdLoading, setCheckIdLoading] = useState(false);
  const [isFormFull, setIsFormFull] = useState(false);
  const [inquiryResponse, setInquiryResponse] = useState<IInquiryCheck | null>(
    null
  );

  const checkInquiry = async () => {
    if (data) {
      let isNull = false;
      Object.values(data).forEach((val) => {
        if (!val) isNull = true;
      });
      const isFull = forms.length == Object.keys(data).length && !isNull;
      setIsFormFull(isFull);

      if (!isFull) {
        toast({
          title: "Failed",
          description: "Lengkapi semua form terlebih dahulu",
          variant: "destructive",
        });
        return;
      }
      if (forms.length == Object.keys(data).length && !isNull) {
        const payload = {
          category_key: selectedData.category?.key,
          product_key: selectedData.product?.key,
          phone: selectedData.account?.noWhatsapp,
          email: selectedData.account?.email,
          form_data: Object.keys(data).map((key) => ({
            key,
            value: data[key],
          })),
        };

        // check id
        setCheckIdLoading(true);
        const res = await fetch(`/api/products/categories/inquiry`, {
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const resData = await res.json();

          if (resData?.code == 200) {
            setInquiryResponse(resData.data);
            dispatch({
              action: "SET_TAGIHAN",
              payload: resData.data,
            });
          } else {
            setInquiryResponse(null);
            dispatch({
              action: "SET_TAGIHAN",
              payload: null,
            });
            toast({
              title: "Failed",
              description: "Tagihan tidak ditemukan atau telah dibayar",
              variant: "destructive",
            });
          }
        } else {
          setInquiryResponse(null);
          toast({
            title: "Failed",
            description: "Tagihan tidak ditemukan atau telah dibayar",
            variant: "destructive",
          });
        }

        setCheckIdLoading(false);
        return dispatch({
          action: "SET_FORM",
          payload: data,
        });
      }
    }
  };

  const checkId = async () => {
    if (data) {
      let isNull = false;
      Object.values(data).forEach((val) => {
        if (!val) isNull = true;
      });
      setIsFormFull(forms.length == Object.keys(data).length && !isNull);
      if (forms.length == Object.keys(data).length && !isNull) {
        const payload = {
          category_key: selectedData.category?.key,
          product_key: selectedData.product?.key,
          form_data: Object.keys(data).map((key) => ({
            key,
            value: data[key],
          })),
        };

        if (!isCheckRequired) {
          return dispatch({
            action: "SET_FORM",
            payload: data,
          });
        }

        // check id
        setCheckIdLoading(true);
        const res = await fetch(`/api/products/categories/check-id`, {
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setNickName(null);
          const resData = await res.json();
          if (resData.data.is_valid) {
            setNickName(resData.data.nickname);
          } else
            toast({
              title: "Failed",
              description: "Akun tidak ditemukan",
              variant: "destructive",
            });
        }

        setCheckIdLoading(false);
        return dispatch({
          action: "SET_FORM",
          payload: data,
        });
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, valueAsNumber } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: e.target.type == "number" ? valueAsNumber : value,
    }));
  };

  useEffect(() => {
    checkId();
  }, [data, isCheckRequired]);

  return (
    <div className="grid w-full items-center gap-4">
      {forms.map((item) => (
        <div key={item.key} className="flex flex-col space-y-1.5">
          <h3 className="ml-1 text-sm">{item.alias.replace(/_/g, " ")} *</h3>
          {item.type === "option" ? (
            <Select
              disabled={!selectedData.product}
              onValueChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  [item.key]: e,
                }));
                checkId();
              }}
              name={item.key}
            >
              <SelectTrigger className="col-span-2">
                <SelectValue
                  placeholder={`Pilih ${item.alias.replace(/_/g, " ")}`}
                />
              </SelectTrigger>
              <SelectContent>
                {item.options.map((detail) => (
                  <SelectItem key={detail} value={detail}>
                    {detail}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id="id"
              type={item.type == "numeric" ? "number" : "text"}
              name={item.key}
              onBlur={onChange}
              disabled={!selectedData.product}
              placeholder={`Masukan ${item.alias.replace(/_/g, " ")}`}
            />
          )}
        </div>
      ))}
      {isPostpaid && (
        <Button onClick={checkInquiry} disabled={checkIdLoading}>
          Cek Tagihan
        </Button>
      )}
      {isPostpaid && inquiryResponse && (
        <table className="text-xs mx-3">
          <tbody>
            <tr>
              <th
                colSpan={2}
                className="text-center w-full mb-3 text-base pb-2 font-semibold"
              >
                Informasi Pembayaran
              </th>
            </tr>
            <tr className="even:bg-black/5">
              <th className="w-full text-left mb-3 px-2 py-1 font-semibold">
                Id
              </th>
              <td className="w-full text-right px-2 py-1">
                {inquiryResponse?.customer_no}
              </td>
            </tr>
            <tr className="even:bg-black/5">
              <th className="w-full text-left mb-3 px-2 py-1 font-semibold">
                Nama
              </th>
              <td className="w-full text-right px-2 py-1 nowrap">
                {inquiryResponse?.customer_name}
              </td>
            </tr>
            <tr className="even:bg-black/5">
              <th className="w-full text-left mb-3 px-2 py-1 font-semibold">
                Tagihan
              </th>
              <td className="w-full text-right px-2 py-1">
                {priceMask(inquiryResponse?.bill_total ?? 0)}
              </td>
            </tr>
            <tr className="even:bg-black/5">
              <th className="w-full text-left mb-3 px-2 py-1 font-semibold">
                Admin
              </th>
              <td className="w-full text-right px-2 py-1">
                {priceMask(inquiryResponse?.admin_total ?? 0)}
              </td>
            </tr>
            <tr>
              <th
                className="text-center w-full mb-3 text-base pb-2 font-semibold pt-4"
                colSpan={2}
              >
                Detail Pelanggan
              </th>
            </tr>
            {inquiryResponse?.bill_detail?.headers.map((item) => (
              <tr key={item.key} className="even:bg-black/5">
                <th className="w-full text-left font-semibold px-2 py-1">
                  {item.key}
                </th>
                <td className="w-full text-right px-2 py-1">{item.value}</td>
              </tr>
            ))}
            <tr>
              <th
                className="text-center w-full mb-3 text-base pb-2 font-semibold pt-4"
                colSpan={2}
              >
                Detail Tagihan
              </th>
            </tr>
            {inquiryResponse?.bill_detail?.details.map((item, index) => (
              <React.Fragment key={index}>
                <tr key={index}>
                  <th className="w-full text-left font-semibold text-black/50 px-2 pb-1 pt-4">
                    Data {index + 1}
                  </th>
                </tr>
                {item.map((detail) => (
                  <tr key={detail.key} className="even:bg-black/5">
                    <th className="w-full text-left font-semibold pr-2 pl-4 py-1">
                      {detail.key}
                    </th>
                    <td className="w-full text-right px-2 py-1">
                      {detail.value}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
      {isFormFull && isCheckRequired && (
        <>
          {checkIdLoading ? (
            <div className="flex gap-2 items-center animate-pulse">
              <Spinner size="sm" />
              <p className="text-muted-foreground text-xs">Pengecekan Akun</p>
            </div>
          ) : nickName ? (
            <p className="text-green-500 text-xs">Akun ditemukan: {nickName}</p>
          ) : (
            <div className="text-red-500 text-xs flex gap-2 items-end">
              <ExclamationTriangleIcon />
              <p className="text-xs">Akun tidak ditemukan</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FormAccount;
