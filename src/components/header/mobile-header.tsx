"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { ISiteProfile } from "@/types/utils";
import Searchbar from "@/app/dashboard/searchbar";
import HelpButton from "../help-button";
import { Separator } from "../ui/separator";
import ProfileDialog from "./profile-dialog";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";

export type path = {
  name: React.ReactNode;
  path: string;
  isSession: boolean;
};

const ignorePath = [
  "/games/",
  "/transaksi/",
  "/auth/register",
  "/profile/edit",
  "/kebijakan",
  "/syarat-ketentuan",
];

function MobileHeader({ profile }: { profile?: ISiteProfile }) {
  const path = usePathname();
  const { data: session } = useSession();

  const ishome = useMemo(() => {
    if (path === "/") return true;
    return false;
  }, [path]);

  const isprofile = useMemo(() => {
    if (path === "/profile") return true;
    return false;
  }, [path]);

  const isInlist = useMemo(() => {
    return ignorePath.some((i) => path.includes(i));
  }, [path]);

  if (!isInlist)
    return (
      <header className="w-full flex md:hidden justify-center z-50 bg-white items-center top-0 sticky p-1 h-[50px]">
        <div className="w-full flex max-w-7xl items-center justify-between">
          <div className="flex md:w-fit w-full justify-start">
            <Link href="/" className="p-1">
              {profile?.logo_url && (
                <Image
                  src={profile?.logo_url}
                  alt={`logo ${profile.name}`}
                  title={`logo ${profile.name}`}
                  width={29}
                  height={29}
                />
              )}
            </Link>
          </div>
          {ishome ? (
            <div className="flex-row-reverse flex w-full justify-start md:flex-row md:justify-end items-center gap-2">
              <Searchbar />
              <Separator
                className="mx-0.5 h-10 md:block hidden"
                orientation="vertical"
              />
              {session ? (
                <div className="my-1 mx-1 hidden md:block">
                  <ProfileDialog />
                </div>
              ) : (
                <Link href="/auth/login" className="m-2 hidden md:block">
                  <Button size="sm" className="flex space-x-1">
                    <EnterIcon />
                    <div className="text-xs">Login</div>
                  </Button>{" "}
                </Link>
              )}
              <div>
                <HelpButton />
              </div>
            </div>
          ) : null}
          {isprofile ? (
            <div>
              <Button size="sm" onClick={async () => await signOut()}>
                <ExitIcon className="text-white" />
              </Button>
            </div>
          ) : null}
        </div>
      </header>
    );
}

export default MobileHeader;
