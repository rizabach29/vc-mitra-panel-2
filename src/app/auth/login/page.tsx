"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

function Page() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    var res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (!res?.ok) {
      setLoading(false);
      return toast({
        title: "Failed",
        description: "Login gagal, periksa kembali data anda",
        variant: "destructive",
      });
    }

    toast({
      title: "Success",
      description: "Sukses login",
      variant: "success",
    });
    setTimeout(() => {
      window.location.replace(searchParams.get("callback") ?? "/");
    }, 1500);
  };

  return (
    <div className="relative h-full md:pt-12 flex md:items-center justify-center w-full px-0 bg-background md:bg-transparent">
      <div className="md:border p-8 md:rounded-xl md:shadow-md w-full max-w-md md:bg-background">
        <h1 className="pt-4 text-2xl font-semibold text-center tracking-tight text-primary">
          Login
        </h1>
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="passwor" className="text-left">
              Password
            </Label>
            <Input
              className="bg-background"
              id="password"
              type="password"
              name="password"
              placeholder="🔐 Masukan Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-4 space-y-1">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
            <div className="flex flex-col -space-y-2 items-center justify-center">
              <Link href="/auth/reset-password">
                <Button variant="link" size="sm" className="w-full font-normal">
                  Lupa Password?
                </Button>
              </Link>
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
