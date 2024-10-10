"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { PhoneInputIndo } from "@/components/ui/custom-input";
import { useRouter } from "next/navigation";
import BackHeader from "@/components/header/back-header";

function Page() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast({
        title: "Failed",
        description:
          "Konfirmasi password anda tidak sesuai dengan password anda",
        variant: "destructive",
      });
    }

    setLoading(true);
    var res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        phone: "62" + phone,
        name,
      }),
    });

    if (!res.ok) {
      setLoading(false);
      return toast({
        title: "Failed",
        description: "Registrasi Akun Gagal",
        variant: "destructive",
      });
    }

    toast({
      title: "Success",
      description: "Sukses Register Akun",
      variant: "success",
    });
    router.push("/");
  };

  return (
    <>
      <BackHeader title="Daftar" />
      <div className="relative h-full md:pt-12 flex md:items-center justify-center w-full px-0 bg-background md:bg-transparent">
        <div className="md:border p-8 md:rounded-xl md:shadow-md w-full max-w-md md:bg-background">
          <p className="pt-4 text-2xl text-center font-semibold tracking-tight text-primary">
            Register
          </p>
          <form className="w-full max-w-md grid gap-4 pt-4" onSubmit={onSubmit}>
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="nama" className="text-left">
                Nama
              </Label>
              <Input
                className="bg-background"
                id="nama"
                placeholder="Masukan nama"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                className="bg-background"
                id="email"
                type="email"
                placeholder="Masukan Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="Whatsapp" className="text-left">
                No. Whatsapp
              </Label>
              <PhoneInputIndo
                className="bg-background"
                id="Whatsapp"
                type="tel"
                name="phone"
                value={phone}
                placeholder="Contoh: 81XXXXXXXXX"
                onValueChange={(e) => setPhone(`${e}`)}
              />
            </div>
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="password" className="text-left">
                Password
              </Label>
              <Input
                className="bg-background"
                id="password"
                type="password"
                name="password"
                placeholder="Minimum 8 digit sandi"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="password" className="text-left">
                Ketik Ulang Sandi
              </Label>
              <Input
                className="bg-background"
                id="password"
                type="password"
                name="password"
                placeholder="Minimum 8 digit sandi"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mt-4 space-y-1">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Register"}
              </Button>
              <div className="flex items-center justify-center space-x-1 pt-2">
                <p className="text-xs">Sudah Punya Akun? </p>
                <Link
                  href="/auth/login"
                  className="text-xs hover:underline text-primary underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Page;
