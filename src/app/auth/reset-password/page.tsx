"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import ResetForm from "./reset-form";
import OTP from "./otp";

function Page() {
  const [phone, setPhone] = useState("");
  const [isOtpSended, setIsOtpSended] = useState(false);

  return (
    <div className="relative h-full md:pt-12 flex md:items-center justify-center w-full px-0 bg-background md:bg-transparent">
      <div className="md:border p-8 md:rounded-xl md:shadow-md w-full max-w-md md:bg-background">
        <p className="pt-4 text-2xl font-semibold text-center tracking-tight text-primary">
          Reset Password
        </p>
        <div className="w-full max-w-md grid pt-4">
          <div className="grid w-full max-w-sm gap-1.5">
            <div className={isOtpSended ? "hidden" : "block"}>
              <ResetForm
                phone={phone}
                setPhone={setPhone}
                onSuccess={() => setIsOtpSended(true)}
              />
            </div>
            <div className={isOtpSended ? "block" : "hidden"}>
              <OTP
                phone={phone}
                backToPhoneForm={() => setIsOtpSended(false)}
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex flex-col -space-y-1 items-center justify-center">
              <div className="flex items-center justify-center space-x-1 pt-2">
                <p className="text-xs">Belum Punya Akun? </p>
                <Link
                  href="/auth/register"
                  className="text-xs hover:underline text-primary underline-offset-4"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
