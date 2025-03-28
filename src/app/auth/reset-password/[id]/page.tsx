"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/custom-input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function FormResetPassword({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const onSubmitReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast({
        title: "Failed",
        description: "Password atau Konfirmasi Password belum terisi",
        variant: "destructive",
      });
      return;
    }

    if (password != confirmPassword) {
      toast({
        title: "Failed",
        description: "Konfirmasi Password dan Password belum sesuai",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    var res = await fetch("/api/forgot-password/reset", {
      method: "POST",
      body: JSON.stringify({
        password,
        token: params.id,
      }),
    });

    if (res.ok) {
      toast({
        title: "Success",
        description: "Password berhasil direset",
        variant: "success",
      });
      router.push("/auth/login/");
    } else {
      toast({
        title: "Failed",
        description: "Gagal mereset password",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="relative h-full md:pt-12 flex md:items-center justify-center w-full px-0 bg-background md:bg-transparent">
      <div className="md:border p-8 md:rounded-xl md:shadow-md w-full max-w-md md:bg-background">
        <p className="pt-4 text-2xl font-semibold text-center tracking-tight text-primary">
          Reset Password
        </p>
        <form
          onSubmit={onSubmitReset}
          className="w-full max-w-md grid gap-4 pt-4"
        >
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="password" className="text-left">
              New Password
            </Label>
            <PasswordInput
              id="password"
              placeholder="Masukan New Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="confirmPassword" className="text-left">
              Confirmation Password
            </Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Masukan New Password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="mt-4 space-y-1">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Reset"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormResetPassword;
