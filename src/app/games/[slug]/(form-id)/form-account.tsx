import { debounce } from "@/Helpers";
import { LooseObject, TProductForm } from "@/Type";
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
import React, { useContext, useState } from "react";

interface Prop {
  forms: TProductForm[];
}

function FormAccount({ forms }: Prop) {
  const { dispatch, data: selectedData } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const [data, setData] = useState<LooseObject>();
  const { toast } = useToast();

  const checkId = async () => {
    if (data) {
      let isNull = false;
      Object.values(data).forEach((val) => {
        if (!val) isNull = true;
      });
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
            return dispatch({
              action: "SET_FORM",
              payload: data,
            });
          }
          return toast({
            title: "Failed",
            description: "Akun tidak ditemukan",
            variant: "destructive",
          });
        }
      }
    }
  };

  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, valueAsNumber } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: e.target.type == "number" ? valueAsNumber : value,
    }));

    checkId();
  }, 2500);

  return (
    <div className="grid w-full items-center gap-4">
      {forms.map((item) => (
        <div key={item.key} className="flex flex-col space-y-1.5">
          <h3 className="ml-1 text-sm">{item.alias.replace(/_/g, " ")} *</h3>
          {item.type === "option" ? (
            <Select
              disabled={!selectedData.product}
              onValueChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  [item.key]: e,
                }))
              }
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
              onChange={handleChange}
              disabled={!selectedData.product}
              placeholder={`Masukan ${item.alias.replace(/_/g, " ")}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default FormAccount;
