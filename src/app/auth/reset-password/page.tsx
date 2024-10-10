"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

function Page() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    toast({
      title: "Email Reset Sandi Terkirim",
      description:
        "Sistem mengirimkan link reset Sandi ke email, Harap periksa email",
      variant: "success",
    });
    setLoading(false);

    setTimeout(() => {
      window.location.replace("/auth/login");
    }, 5000);
  };

  return (
    <div className="relative h-full md:pt-12 flex md:items-center justify-center w-full px-0 bg-background md:bg-transparent">
      <div className="md:border p-8 md:rounded-xl md:shadow-md w-full max-w-md md:bg-background">
        <p className="pt-4 text-2xl font-semibold text-center tracking-tight text-primary">
          Reset Password
        </p>
        <form onSubmit={onSubmit} className="w-full max-w-md grid gap-4 pt-4">
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="username" className="text-left">
              Email
            </Label>
            <Input
              className="bg-background"
              id="username"
              name="username"
              type="email"
              placeholder="✉️ Masukan Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4 space-y-1">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Reset"}
            </Button>
            <div className="flex flex-col -space-y-2 items-center justify-center">
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
        </form>
      </div>
    </div>
  );
}

export default Page;
