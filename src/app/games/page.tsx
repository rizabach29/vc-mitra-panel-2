import { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import ListCategory from "./list";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  var host = headers().get("host") ?? "";
  var url = "https://" + host + "/games";
  var logo_url = headers().get("x-logo") ?? "";
  var keywords = headers().get("x-keywords") ?? "";
  var name = headers().get("x-name") ?? "";

  return {
    manifest: "/api/manifest.json",
    title: `Beli Voucher & Top Up Game Murah di ${name}`,
    description: `Temukan semua kebutuhan digital kamu di ${name}, mulai dari beli voucher/top up game, pulsa, platform streaming, dan lainnya!`,
    keywords: keywords,
    openGraph: {
      images: [logo_url],
      title: `Beli Voucher & Top Up Game Murah di ${name}`,
      url,
      type: "website",
    },
    icons: {
      icon: logo_url,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Page() {
  var name = headers().get("x-name") ?? "";
  var url = headers().get("host") ?? "";

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
            ],
          }),
        }}
      />
      <h1 className="hidden">Produk {name}</h1>
      <ListCategory />
    </>
  );
}
