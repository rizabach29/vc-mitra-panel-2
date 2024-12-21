import Head from "next/head";
import { headers } from "next/headers";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  var url = headers().get("host") ?? "";

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
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
      </Head>
      {children}
    </>
  );
}
