"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import TransactionProvider from "@/infrastructures/context/transaction/transaction.provider";
import { useEffect, useState } from "react";
import { ISiteProfile } from "@/types/utils";
import { HexToHSL } from "@/Helpers";
import Loading from "./loading";
import PWAAlert from "@/components/header/pwa-alert";
import Header from "@/components/header/page-header";
import BottomNav from "@/components/bottom-nav";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

export default function RootTemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<ISiteProfile>();
  const [loading, setLoading] = useState(true);

  const get = async () => {
    setLoading(true);
    const res = await fetch("/api/site-profile");
    if (res.ok) {
      var body = await res.json();
      setProfile(body.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    get();
    if (
      process.env.NEXT_PUBLIC_QONTAK_ID &&
      process.env.NEXT_PUBLIC_QONTAK_CODE
    ) {
      if (typeof window === "object") {
        const qchatInit = document.createElement("script");
        qchatInit.src = "https://webchat.qontak.com/qchatInitialize.js";
        const qchatWidget = document.createElement("script");
        qchatWidget.src = "https://webchat.qontak.com/js/app.js";
        document.head.prepend(qchatInit);
        document.head.prepend(qchatWidget);
        qchatInit.onload = function () {
          window.qchatInitialize({
            id: process.env.NEXT_PUBLIC_QONTAK_ID,
            code: process.env.NEXT_PUBLIC_QONTAK_CODE,
          });
        };
        const iframeQontak = document.getElementById("qontak-webchat-widget");
        if (iframeQontak) iframeQontak.style.bottom = "24px";
      }
    }
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: ` :root {
                      --primary: ${HexToHSL(profile?.theme_color ?? "#000")};
                    }`,
        }}
      />
      <SessionProvider>
        <TransactionProvider>
          <div className="bg-zinc-50">
            <PWAAlert profile={profile} />
            <Header profile={profile} />
            <div>
              <div
                className={`min-h-[92vh] pb-12 md:pb-4 bg-[#F0F8F6] scroll-mt-16`}
              >
                {children}
              </div>
              <BottomNav />
            </div>
            <Footer profile={profile} />
            <Toaster />
          </div>
        </TransactionProvider>
      </SessionProvider>
    </>
  );
}
