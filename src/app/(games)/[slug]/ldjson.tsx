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
    if (data.products?.products) {
      const productsMap = data.products?.products
        ?.map((val) => val.products)
        .flat();

      if (productsMap.length > 0) {
        const min = Math.min(...productsMap.map((i) => i.price));
        const max = Math.max(...productsMap.map((i) => i.price));
        return {
          min,
          max,
          total: productsMap.length,
        };
      }
    }
    return {
      min: 0,
      max: 0,
      total: 0,
    };
  }, [data.products]);

  const rating = useMemo(() => {
    // random number between 4.5 to 5 based on current date month
    const base = 4.5;
    if (date.getMonth() < 3) {
      return {
        ratingValue: base + 0.5,
        reviewCount: format(date, "yyMMdd"),
      };
    } else if (date.getMonth() < 6) {
      return {
        ratingValue: base + 0.3,
        reviewCount: format(date, "yyMMdd"),
      };
    } else if (date.getMonth() < 9) {
      return {
        ratingValue: base + 0.1,
        reviewCount: format(date, "yyMMdd"),
      };
    }

    return {
      ratingValue: base + (date.getMonth() % 3) * 0.1,
      reviewCount: format(date, "yyMMdd"),
    };
  }, [date]);

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
                // {
                //   "@type": "ListItem",
                //   position: 2,
                //   item: {
                //     "@id": url + "/games",
                //     name: "Daftar Produk",
                //   },
                // },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@id": url + "/" + data.category?.key,
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
              url: url + "/" + data.category?.key,
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
                offerCount: product.total,
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
