"use client";

import { Button } from "@/components/ui/button";
import { PhoneInputIndo } from "@/components/ui/custom-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Profile() {
  const { data: session, status, update } = useSession();
  const [email, setEmail] = useState<string>(session?.profile?.name ?? "");
  const [name, setName] = useState<string>(session?.profile?.email ?? "");
  const [phone, setPhone] = useState<string>(session?.profile?.phone ?? "");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (status && session) {
      setEmail(session.profile.email);
      setName(session.profile.name);
      setPhone(session.profile.phone);
    }
  }, [status]);

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const handleSubmit = async () => {
    const body = {
      name,
      email,
      phone: `62${phone}`,
    };
    const response = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const res = await response.json();
      return toast({
        title: "Failed",
        description: res.remark,
        variant: "destructive",
      });
    }

    if (session) {
      let res = await update({
        ...session,
        profile: {
          ...session.profile,
          body,
        },
      });
      reloadSession();
    }
    toast({
      title: "Success",
      description: "Update profile success",
      variant: "success",
    });

    router.refresh();
    return;
  };

  return (
    <div>
      <div className="h-full w-full my-4 space-y-3">
        <div className="w-full space-y-1">
          <Label htmlFor="invoice">Nama</Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoFocus={false}
            placeholder="Masukan Nama"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="invoice">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoFocus={false}
            placeholder="Masukan Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-full space-y-1">
          <Label htmlFor="invoice">No. Whatsapp</Label>
          <PhoneInputIndo
            onValueChange={(e) => {
              setPhone(`${e}`);
            }}
            autoFocus={false}
            value={phone[0] == "0" ? "62" + phone.substring(1) : phone}
            placeholder="Contoh: 81XXXXXXXXX"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          className="mt-2 inline-flex justify-end items-end"
        >
          Simpan
        </Button>
      </div>
    </div>
  );
}

export default Profile;
