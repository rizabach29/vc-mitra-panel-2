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
  const [mounted, setMounted] = useState(false);

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
    setMounted(true);
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

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: ` :root {
                      --primary: ${HexToHSL(profile?.theme_color ?? "#000")};
                    }
                      
                    .article-content h1, .article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6, .article-content ul, .article-content ol {
                      margin-top: 20px;
                      line-height: 1.25;
                    }

                    .article-content h1 { font-size: 1.875rem; }
                    .article-content h2 { font-size: 1.5rem; }
                    .article-content h3 { font-size: 1.25rem; }
                    .article-content h4 { font-size: 1.125rem; }
                    .article-content h5 { font-size: 1rem; }
                    .article-content h6 { font-size: 0.875rem; }
              
                    .article-content p {
                      margin-top: 8px;
                      line-height: 1.5;
                    }
              
                    .article-content li {
                      margin-top: 2px;
                    }
            
                    .article-content li.child {
                      padding-left: 2em;
                    }
                  </style>
                `,
        }}
      />
      <SessionProvider>
        <TransactionProvider>
          <PWAAlert profile={profile} />
          <Header profile={profile} />
          <main
            className={`min-h-[92vh] pb-12 md:pb-4 bg-[#F0F8F6] scroll-mt-28`}
          >
            {children}
            <BottomNav />
          </main>
          <Footer profile={profile} />
          <Toaster />
        </TransactionProvider>
      </SessionProvider>
    </>
  );
}
