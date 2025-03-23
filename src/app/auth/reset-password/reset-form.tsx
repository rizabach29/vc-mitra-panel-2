import { Button } from "@/components/ui/button";
import { PhoneInputIndo } from "@/components/ui/custom-input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";

interface props {
  phone: string;
  setPhone: (val: string) => void;
  onSuccess: () => void;
}

function ResetForm(props: props) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!props.phone) {
      toast({
        title: "Failed",
        description: "No WA belum terisi",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    var res = await fetch("/api/forgot-password/request", {
      method: "POST",
      body: JSON.stringify({
        phone: "0" + props.phone,
      }),
    });

    if (res.ok) {
      toast({
        title: "OTP telah terkirim",
        description: "Sistem telah mengirimkan OTP reset Sandi ke WA",
        variant: "success",
      });
      props.onSuccess();
    } else {
      toast({
        title: "Failed",
        description: "Gagal mengirim request OTP",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="grid w-full max-w-sm gap-1.5 my-4">
        <div>
          <Label htmlFor="phone" className="text-left">
            No. Telpon
          </Label>
          <PhoneInputIndo
            className="bg-background mt-2"
            id="Whatsapp"
            type="tel"
            name="phone"
            value={props.phone}
            placeholder="Contoh: 81XXXXXXXXX"
            onValueChange={(e) => props.setPhone(`${e}`)}
          />
          <p className="text-muted-foreground text-xs mt-1.5">
            Masukan No. WA pada akun.
          </p>
        </div>
      </div>
      <Button onClick={onSubmit} className="w-full mt-4" disabled={loading}>
        {loading ? "Loading..." : "Reset"}
      </Button>
    </>
  );
}

export default ResetForm;
