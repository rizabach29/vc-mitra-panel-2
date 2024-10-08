"use client";

import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { format } from "date-fns";
import Script from "next/script";
import React, { useContext, useMemo, useState } from "react";

function Ldjson({ appName, url }: { appName: string; url: string }) {
  const { data } = useContext(TransactionContext) as ITransactionContext;
  const [date, _] = useState(new Date());

  const minimal = useMemo(() => {
    if (data.products.length > 0)
      return Math.min(...data.products.map((i) => i.price));
    return 0;
  }, [data.products]);

  const maximal = useMemo(() => {
    if (data.products.length > 0)
      return Math.max(...data.products.map((i) => i.price));
    return 0;
  }, [data.products]);

  const ratingValue = useMemo(() => {
    let base = 4.7;

    return base + (date.getMonth() % 3);
  }, [date.getMonth]);

  const reviewCount = useMemo(() => {
    return format(date, "yyMMdd");
  }, [date.getMonth]);

  if (minimal && maximal)
    return (
      <>
        <Script
          id=""
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
                    "@id": url + "/games",
                    name: "Daftar Produk",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@id": url + "/games/" + data.category?.key,
                    name: "Daftar Produk",
                  },
                },
              ],
            }),
          }}
        />
        <Script
          id=""
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org/",
              "@type": "Product",
              name: `Beli/Top Up ${
                data.category?.name
              } Termurah ${date.getMonth()} ${date.getFullYear()} | ${appName}`,
              description: `Daftar harga voucher/top up ${
                data.category?.name
              } murah ${date.getMonth()} ${date.getFullYear()} di ${appName}. Transaksi cepat, aman, dan banyak pilihan metode pembayaran.`,
              image: data.category?.image_url,
              url: url + "/games/" + data.category?.key,
              brand: {
                "@type": "Brand",
                name: data.category?.name,
              },
              offers: {
                "@type": "AggregateOffer",
                availability: "https://schema.org/InStock",
                priceCurrency: "IDR",
                lowPrice: minimal,
                highPrice: maximal,
                offerCount: data.products.length,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue,
                reviewCount,
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />
      </>
    );
}

export default Ldjson;
