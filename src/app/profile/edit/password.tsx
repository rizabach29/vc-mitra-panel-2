"use client";

import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/custom-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

function Password() {
  const { data: session } = useSession();
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newConfirmPassword, setNewConfirmPassword] = useState<string>("");
  const { toast } = useToast();

  const submitPassword = async () => {
    if (!password)
      return toast({
        title: "Error",
        description: "Password harus diisi",
        variant: "destructive",
      });
    if (!newPassword)
      return toast({
        title: "Error",
        description: "Password baru harus diisi",
        variant: "destructive",
      });
    if (!newConfirmPassword)
      return toast({
        title: "Error",
        description: "Konfirmasi password baru harus diisi",
        variant: "destructive",
      });

    if (newPassword.length < 8) {
      return toast({
        title: "Error",
        description: "Password minimal 8 digit",
        variant: "destructive",
      });
    }

    if (newPassword != newConfirmPassword) {
      return toast({
        title: "Error",
        description: "Konfirmasi password harus sesuai dengan password baru",
        variant: "destructive",
      });
    }

    const response = await fetch("/api/reset", {
      method: "POST",
      body: JSON.stringify({
        username: session?.profile.email,
        old_password: password,
        password: newPassword,
      }),
    });

    if (!response.ok) {
      const res = await response.json();
      return toast({
        title: "Failed",
        description: res.data,
        variant: "destructive",
      });
    }

    return toast({
      title: "Success",
      description: "Reset password success",
      variant: "default",
    });
  };

  return (
    <div>
      <div className="h-full w-full my-4 space-y-3">
        <div className="w-full space-y-1">
          <Label htmlFor="invoice">Ketik Sandi Lama</Label>
          <PasswordInput
            id="old-password"
            name="old-password"
            autoFocus={false}
            placeholder="Tulis Sandi"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="invoice">Ketik Sandi Baru</Label>
          <PasswordInput
            id="new-password"
            name="new-password"
            autoFocus={false}
            placeholder="Minimum 8 Digit Sandi"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="invoice">Ketik Ulang Sandi Baru</Label>
          <PasswordInput
            id="new-confirm-password"
            name="new-confirm-password"
            autoFocus={false}
            placeholder="Minimum 8 Digit Sandi"
            onChange={(e) => setNewConfirmPassword(e.target.value)}
            value={newConfirmPassword}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={submitPassword}
          className="mt-2 inline-flex justify-end items-end"
        >
          Simpan
        </Button>
      </div>
    </div>
  );
}

export default Password;
