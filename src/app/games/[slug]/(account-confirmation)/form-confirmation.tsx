"use client";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneInput } from "@/components/ui/custom-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import TransactionContext, {
    ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

function FormConfirmation() {
    const { data, dispatch } = useContext(
        TransactionContext
    ) as ITransactionContext;
    const { data: session } = useSession();

    if (session) <></>;
    return (
        <Card className="w-full my-4">
            <CardContent>
                <div className="flex mt-3">
                    <h4 className="font-semibold ml-1">Data Konfirmasi</h4>
                </div>
                <Separator className="my-3" />
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Masukan alamat Email"
                                value={data.account?.email}
                                onChange={(e) =>
                                    dispatch({
                                        action: "SET_ACCOUNT",
                                        payload: {
                                            noWhatsapp:
                                                data.account?.noWhatsapp ?? "",
                                            email: e.target.value,
                                        },
                                    })
                                }
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="whatsapp">No. Whatsapp *</Label>
                            <PhoneInput
                                id="whatsapp"
                                placeholder="Masukan No. Whatasapp"
                                maxLength={13}
                                value={data.account?.noWhatsapp}
                                onValueChange={(e) => {
                                    dispatch({
                                        action: "SET_ACCOUNT",
                                        payload: {
                                            email: data.account?.email ?? "",
                                            noWhatsapp: `${e}`,
                                        },
                                    });
                                }}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default FormConfirmation;