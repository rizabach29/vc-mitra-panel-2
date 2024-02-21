import { TProductForm } from "@/Type";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";

export interface LooseObject {
    [key: string]: any;
}

interface Prop {
    forms: TProductForm[];
    onChange?: (e: LooseObject) => void;
}

function FormAccount({ forms, onChange }: Prop) {
    const [data, setData] = useState<LooseObject>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, valueAsNumber } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: e.target.type == "number" ? valueAsNumber : value,
        }));
    };

    useEffect(() => {
        if (onChange) onChange(data);
    }, [data]);

    return (
        <>
            <h4 className="font-semibold ml-1">Data Akun</h4>
            <Separator className="my-3" />
            <div className="grid w-full items-center gap-4">
                {forms.map((item) => (
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="id" className="ml-1">
                            {item.alias.replace(/_/g, " ")} *
                        </Label>
                        {item.type === "option" ? (
                            <Select
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
                                        placeholder={`Pilih ${item.alias.replace(
                                            /_/g,
                                            " "
                                        )}`}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {item.form_details.map((detail) => (
                                        <SelectItem value={detail.value}>
                                            {detail.value_alias}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : (
                            <Input
                                id="id"
                                type={
                                    item.type == "numeric" ? "number" : "text"
                                }
                                name={item.key}
                                onChange={handleChange}
                                placeholder={`Masukan ${item.alias.replace(
                                    /_/g,
                                    " "
                                )}`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default FormAccount;
