"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface props {
  phone: string;
  backToPhoneForm: () => void;
}

function OTP(props: props) {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!props.phone || !otp) {
      toast({
        title: "Failed",
        description: "No WA atau OTP belum terisi",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    var res = await fetch("/api/forgot-password/otp", {
      method: "POST",
      body: JSON.stringify({
        phone: "0" + props.phone,
        otp,
      }),
    });

    setLoading(false);
    if (res.ok) {
      toast({
        title: "OTP telah terkirim",
        description: "Sistem telah mengirimkan OTP reset Sandi ke WA",
        variant: "success",
      });
      var body = await res.json();
      return router.push("/auth/reset-password/", body.data.token);
    }
  };

  return (
    <>
      <div className="grid w-full max-w-sm gap-1.5 mb-4 mt-6">
        <div>
          <div className="flex justify-center">
            <InputOTP
              name="otp"
              onChange={(e) => setOtp(e)}
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        <p className="text-muted-foreground text-xs mt-1.5 text-center">
          Masukan OTP yang telah dikirim ke WA anda.
        </p>
      </div>
      <Button onClick={onSubmit} className="w-full mt-4" disabled={loading}>
        {loading ? "Loading..." : "Send OTP"}
      </Button>
      <div className="flex justify-center">
        <p
          onClick={props.backToPhoneForm}
          className="mt-2 -mb-1 cursor-pointer text-xs hover:underline text-primary underline-offset-4"
        >
          Ubah No WA
        </p>
      </div>
    </>
  );
}

export default OTP;
