"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import Profile from "./profile";
import { signOut, useSession } from "next-auth/react";
import { thousandMask } from "@/Helpers";
import InfoTooltip from "../info-tooltip";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function ProfileDialog() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="cursor-pointer flex space-x-1 bg-primary text-white rounded-full h-8 px-3 text-xs items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            <PersonIcon />
            <div className="text-xs">Profil</div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-5">
          <div className="px-4 py-3 w-full rounded-xl space-y-1 bg-slate-100">
            <div className="flex justify-between items-end">
              <div className="flex space-x-1 text-xs items-center">
                <p className="text-xs text-muted-foreground p-0">Saldo Point</p>
                <InfoTooltip className="w-3 h-3 text-muted-foreground">
                  <p className="text-xs">Ini Merupakan Saldo Refund</p>
                </InfoTooltip>
              </div>
              <p
                onClick={() => {
                  setOpen(false);
                  router.push("/saldo");
                }}
                className="cursor-pointer text-xs text-primary hover:underline-offset-2 hover:underline"
              >
                Riwayat Saldo
              </p>
            </div>
            <p className="font-medium">
              {thousandMask(session?.profile.saldo ?? 0)}
            </p>
          </div>
          <div className="mt-4">
            <Profile onEditClick={() => setOpen(false)} />
            <Button
              size="sm"
              className="space-x-2 w-full mt-2"
              onClick={async () => {
                setOpen(false);
                await signOut();
              }}
            >
              <ExitIcon />
              <div>Logout</div>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default ProfileDialog;
