import { LooseObject, TProductForm } from "@/Type";
import Spinner from "@/components/spinner";
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
}

function FormAccount({ forms }: Prop) {
  const { dispatch, data: selectedData } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const [data, setData] = useState<LooseObject>();
  const { toast } = useToast();
  const [nickName, setNickName] = useState<string | null>(null);
  const [checkIdLoading, setCheckIdLoading] = useState(false);
  const [isFormFull, setIsFormFull] = useState(false);

  const checkId = async () => {
    if (data) {
      setCheckIdLoading(true);
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
        // check id
        var res = await fetch(`/api/products/categories/check-id`, {
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const resData = await res.json();
          if (resData.data.is_valid) {
            setNickName(resData.data.nickname);
            setCheckIdLoading(false);
            return dispatch({
              action: "SET_FORM",
              payload: data,
            });
          }
          setNickName(null);
          setCheckIdLoading(false);
          return toast({
            title: "Failed",
            description: "Akun tidak ditemukan",
            variant: "destructive",
          });
        }
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
  }, [data]);

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
      {isFormFull && (
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
