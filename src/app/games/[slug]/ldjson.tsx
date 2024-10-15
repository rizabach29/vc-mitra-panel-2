"use client";

import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Script from "next/script";
import React, { useContext, useMemo, useState } from "react";

function Ldjson({ appName, url }: { appName: string; url: string }) {
  const { data } = useContext(TransactionContext) as ITransactionContext;
  const [date, _] = useState(new Date());

  const product = useMemo(() => {
    if (data.products.length > 0) {
      const min = Math.min(...data.products.map((i) => i.price));
      const max = Math.max(...data.products.map((i) => i.price));
      return {
        min,
        max,
      };
    }
    return {
      min: 0,
      max: 0,
    };
  }, [data.products]);

  const rating = useMemo(() => {
    let base = 4.7;

    return {
      ratingValue: base + (date.getMonth() % 3),
      reviewCount: format(date, "yyMMdd"),
    };
  }, [date.getMonth]);

  const month = useMemo(() => {
    return format(new Date(date), "MMMM", {
      locale: id,
    });
  }, [date.getMonth]);

  if (product.min && product.max)
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
                  position: 3,
                  item: {
                    "@id": url + "/games/" + data.category?.key,
                    name: data.category?.name,
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
              } Termurah ${month} ${date.getFullYear()} | ${appName}`,
              description: `Daftar harga voucher/top up ${
                data.category?.name
              } murah ${month} ${date.getFullYear()} di ${appName}. Transaksi cepat, aman, dan banyak pilihan metode pembayaran.`,
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
                lowPrice: product.min,
                highPrice: product.max,
                offerCount: data.products.length,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: rating.ratingValue,
                reviewCount: rating.reviewCount,
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
