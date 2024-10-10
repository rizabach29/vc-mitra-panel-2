"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ISiteProfile, ISosmed } from "@/types/utils";
import Socmed from "./socmed-icon";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";

function Footer({ profile }: { profile?: ISiteProfile }) {
  const path = usePathname();
  const router = useRouter();
  const [data, setData] = useState<ISosmed[]>([]);

  useEffect(() => {
    (async () => {
      var res = await fetch("/api/social-media");
      if (res.ok) {
        var data = await res.json();
        setData(data.data);
        return;
      }

      setData([]);
    })();
  }, []);

  return (
    <div
      // style={{ backgroundImage: 'url("/assets/illustration/v1/footer.svg")' }}
      className="bg-no-repeat bg-right bg-background w-full"
    >
      {!path.includes("/games/") && !path.includes("/auth/") ? (
        <>
          {!path.includes("/transaksi/") &&
          !path.includes("/syarat-ketentuan") &&
          !path.includes("/profile") &&
          !path.includes("/saldo") &&
          !path.includes("/kebijakan") ? (
            <div className="flex justify-center pt-2 w-full md:hidden">
              <div className="w-full mb-8 md:container">
                <div className="px-4 md:px-6">
                  <div className="grid my-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:gap-8">
                    <div className="md:col-span-2 mt-8">
                      {profile?.logo_url && (
                        <Image
                          src={profile?.logo_url}
                          alt="logo"
                          width={40}
                          height={40}
                        />
                      )}
                      {profile ? (
                        <>
                          <p className="text-lg font-medium mt-2">
                            {profile.name} - {profile.title}
                          </p>
                          <p
                            className="text-muted-foreground text-xs leading-5"
                            dangerouslySetInnerHTML={{
                              __html: profile?.description,
                            }}
                          ></p>
                        </>
                      ) : null}
                    </div>
                    <div className={`bg-background flex flex-col mt-8`}>
                      <p className="font-bold text-foreground text-sm">
                        Menu Lainnya
                      </p>
                      <div className="space-y-2.5 mt-3 text-sm">
                        <Link
                          href="/kebijakan"
                          className="flex items-center space-x-2"
                        >
                          <ArrowRightIcon />{" "}
                          <p className="text-xs">Kebijakan Privasi</p>
                        </Link>
                        <Link
                          href="/syarat-ketentuan"
                          className="flex items-center space-x-2"
                        >
                          <ArrowRightIcon />{" "}
                          <p className="text-xs">Syarat Ketentuan</p>
                        </Link>
                      </div>
                    </div>
                    <div className={`bg-background flex flex-col mt-8`}>
                      <p className="font-bold text-foreground text-sm">
                        Kontak
                      </p>
                      <div className="space-y-2.5 mt-3 text-sm">
                        {data
                          ?.filter((i) => i.type === "contact")
                          .map((item, idx) => (
                            <div
                              onClick={() => {
                                var link = "";
                                if (item.key === "email")
                                  link = "mailto:" + item.value;
                                else if (item.key === "telegram")
                                  link = "https://telegram.me/" + item.value;
                                else if (item.key === "whatsapp") {
                                  let val = item.value;
                                  if (item.value[0] == "0")
                                    val = "62" + item.value.substring(1);
                                  link = "https://wa.me/" + val;
                                }

                                if (link) router.push(link);
                              }}
                              key={idx.toString()}
                              className="cursor-pointer flex items-center text-xs space-x-2"
                            >
                              <Socmed black={true} type={item.key} />
                              <p className="text-xs">{item.value}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div
                      className={`bg-background flex flex-col mt-8 md:col-span-full lg:col-span-1`}
                    >
                      <p className="font-bold text-foreground text-sm">
                        Ikuti kami di
                      </p>
                      <div className="flex flex-wrap mt-2">
                        {data
                          ?.filter((i) => i.type === "social")
                          .map((item, idx) => (
                            <Link
                              key={`${idx}`}
                              className={`mr-2 mb-2 rounded-full`}
                              href={item.value}
                            >
                              <div className="p-0.5">
                                <div className="w-6 h-6">
                                  <Socmed type={item.key} />
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="md:flex justify-center pt-2 w-full hidden">
            <div className="w-full mb-8 md:container">
              <div className="px-4 md:px-6">
                <div className="grid my-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:gap-8">
                  <div className="md:col-span-2 mt-8">
                    {profile?.logo_url && (
                      <Image
                        src={profile?.logo_url}
                        alt="logo"
                        width={40}
                        height={40}
                      />
                    )}
                    {profile ? (
                      <>
                        <p className="text-lg font-medium mt-2">
                          {profile.name} - {profile.title}
                        </p>
                        <p
                          className="text-muted-foreground text-xs leading-5"
                          dangerouslySetInnerHTML={{
                            __html: profile?.description,
                          }}
                        ></p>
                      </>
                    ) : null}
                  </div>
                  <div className={`bg-background flex flex-col mt-8`}>
                    <p className="font-bold text-foreground text-sm">
                      Menu Lainnya
                    </p>
                    <div className="space-y-2.5 mt-3 text-sm">
                      <Link
                        href="/kebijakan"
                        className="flex items-center space-x-2"
                      >
                        <ArrowRightIcon />{" "}
                        <p className="text-xs">Kebijakan Privasi</p>
                      </Link>
                      <Link
                        href="/syarat-ketentuan"
                        className="flex items-center space-x-2"
                      >
                        <ArrowRightIcon />{" "}
                        <p className="text-xs">Syarat Ketentuan</p>
                      </Link>
                    </div>
                  </div>
                  <div className={`bg-background flex flex-col mt-8`}>
                    <p className="font-bold text-foreground text-sm">Kontak</p>
                    <div className="space-y-2.5 mt-3 text-sm">
                      {data
                        ?.filter((i) => i.type === "contact")
                        .map((item, idx) => (
                          <div
                            onClick={() => {
                              var link = "";
                              if (item.key === "email")
                                link = "mailto:" + item.value;
                              else if (item.key === "telegram")
                                link = "https://telegram.me/" + item.value;
                              else if (item.key === "whatsapp")
                                link = "https://wa.me/" + item.value;

                              if (link) router.push(link);
                            }}
                            key={idx.toString()}
                            className="cursor-pointer flex items-center text-xs space-x-2"
                          >
                            <Socmed black={true} type={item.key} />
                            <p className="text-xs">{item.value}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div
                    className={`bg-background flex flex-col mt-8 md:col-span-full lg:col-span-1`}
                  >
                    <p className="font-bold text-foreground text-sm">
                      Ikuti kami di
                    </p>
                    <div className="flex flex-wrap mt-2">
                      {data
                        ?.filter((i) => i.type === "social")
                        .map((item, idx) => (
                          <Link
                            key={`${idx}`}
                            className={`mr-2 mb-2 rounded-full`}
                            href={item.value}
                          >
                            <div className="p-0.5">
                              <div className="w-6 h-6">
                                <Socmed type={item.key} />
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div
        className={`w-full p-3 bg-primary hidden md:flex justify-between items-center`}
      >
        <p className="text-white text-xs px-2">
          {`Copyright © ${new Date().getFullYear()}. All Right Reserved`}
        </p>
        <p className="text-white text-xs px-2">
          {`Designed by ${profile?.name}`}
        </p>
      </div>
    </div>
  );
}

export default Footer;
