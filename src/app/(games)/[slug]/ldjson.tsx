import { IProductCategory, TProductItemWithTags } from "@/Type";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Script from "next/script";
import React from "react";

async function Ldjson({
  appName,
  url,
  category,
  products,
}: {
  appName: string;
  url: string;
  category: IProductCategory;
  products?: TProductItemWithTags;
}) {
  const getMetaProducts = () => {
    const productsMap = products?.products?.map((val) => val.products).flat();

    if (productsMap && productsMap.length > 0) {
      const min = Math.min(...productsMap.map((i) => i.price));
      const max = Math.max(...productsMap.map((i) => i.price));
      return {
        min,
        max,
        total: productsMap.length,
      };
    }

    return {
      min: 0,
      max: 0,
      total: 0,
    };
  };

  const product = getMetaProducts();
  const month = format(new Date(), "MMMM", {
    locale: id,
  });

  return (
    <>
      <Script
        id="breadcrumb-ld-json"
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
                  "@id": url + "/" + category?.key,
                  name: category?.name,
                },
              },
            ],
          }),
        }}
      />
      <Script
        id="product-ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "Product",
            name: `Beli/Top Up ${
              category?.name
            } Termurah ${month} ${new Date().getFullYear()} | ${appName}`,
            description: `Daftar harga voucher/top up ${
              category?.name
            } murah ${month} ${new Date().getFullYear()} di ${appName}. Transaksi cepat, aman, dan banyak pilihan metode pembayaran.`,
            image: category?.image_url,
            url: url + "/" + category?.key,
            brand: {
              "@type": "Brand",
              name: category?.name,
            },
            offers: {
              "@type": "AggregateOffer",
              availability: "https://schema.org/InStock",
              priceCurrency: "IDR",
              lowPrice: product.min || 1000,
              highPrice: product.max || 100000,
              offerCount: product.total || 1,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: category?.rating ?? 5,
              reviewCount: 6,
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
