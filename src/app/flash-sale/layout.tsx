import Head from "next/head";
import { headers } from "next/headers";
import Script from "next/script";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  var url = headers().get("host") ?? "";

  return (
    <>
      <Script
        id="flash-sale-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: { "@id": url, name: "Home" },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@id": url + "/flash-sale",
                  name: "Flash Sale",
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
