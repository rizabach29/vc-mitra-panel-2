"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Image from "next/image";
import { ISiteProfile } from "@/types/utils";
import Searchbar from "@/app/dashboard/searchbar";
import HelpButton from "../help-button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import ProfileDialog from "./profile-dialog";
import { EnterIcon, HomeIcon, ReaderIcon } from "@radix-ui/react-icons";

export type path = {
  name: React.ReactNode;
  path: string;
  isSession: boolean;
};

const paths: path[] = [
  {
    name: (
      <>
        <HomeIcon />
        <span>Home</span>
      </>
    ),
    path: "/",
    isSession: false,
  },
  {
    name: (
      <>
        <ReaderIcon />
        <span>Riwayat Pesananku</span>
      </>
    ),
    path: "/transaksi",
    isSession: true,
  },
];

function DesktopHeader({ profile }: { profile?: ISiteProfile }) {
  const path = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [invoice, setInvoice] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full md:flex hidden justify-center z-50 bg-white items-center top-0 sticky p-1">
      <div className="w-full flex max-w-7xl items-center justify-between">
        <div className="flex md:w-fit w-full justify-start">
          <Link href="/" className="p-1">
            {profile?.logo_url && (
              <Image
                src={profile?.logo_url}
                alt={profile.name}
                title={profile.name}
                width={30}
                height={30}
              />
            )}
          </Link>
        </div>
        <div className="flex-row-reverse flex w-full justify-start md:flex-row md:justify-end items-center gap-2">
          <div className="hidden md:flex pl-8">
            <NavigationMenu>
              <NavigationMenuList className="w-fit">
                {paths.map(
                  (i) =>
                    ((i.isSession && session) || !i.isSession) && (
                      <NavigationMenuItem
                        className="bg-transparent"
                        key={i.path}
                      >
                        <Link href={i.path} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={`${navigationMenuTriggerStyle()} flex space-x-1`}
                          >
                            {i.name}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    )
                )}
                {!session && (
                  <NavigationMenuItem className="bg-transparent">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger
                        className={`${navigationMenuTriggerStyle()} flex space-x-1`}
                        onClick={() => setOpen(true)}
                      >
                        <ReaderIcon />
                        <span>Cek Pesanan</span>
                      </PopoverTrigger>
                      <PopoverContent className="w-full rounded-2xl">
                        <div className="flex p-2 gap-2">
                          <Input
                            className="w-full min-w-[20rem]"
                            placeholder="Masukkan No.Invoice / No.Ponsel"
                            onChange={(e) => setInvoice(e.target.value)}
                          />
                          <Button
                            size="sm"
                            onClick={() => {
                              router.refresh();
                              window.location.replace(
                                `/transaksi?search=${invoice}&page=1`
                              );
                            }}
                          >
                            Cek
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
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
      </div>
    </header>
  );
}

export default DesktopHeader;
