import FlashSaleWrapper from "@/app/dashboard/flash-sale/flash-sale-wrapper";
import ListGame from "@/app/dashboard/list-game/list-game";
import CarouselWrapper from "./dashboard/carousel/carousel-wrapper";
import { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  var url = headers().get("host") ?? "";
  url = "https://" + url;
  var logo_url = headers().get("x-logo") ?? "";
  var keywords = headers().get("x-keywords") ?? "";
  var name = headers().get("x-name") ?? "";
  var meta_title = headers().get("x-meta-title") ?? "";
  var meta_description = headers().get("x-meta-description") ?? "";

  return {
    manifest: "/api/manifest.json",
    title: meta_title ?? `Beli Voucher & Top Up Game Murah di ${name}`,
    description:
      meta_description ??
      `${name} tempat top up game termurah & beli voucher game terlengkap. Cuma di ${name} top up ML, HoK, FF, PUBG & lainnya jadi makin mudah dan cepat`,
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

export default function Home() {
  var name = headers().get("x-name") ?? "";
  var meta_title = headers().get("x-meta-title") ?? "";
  var meta_description = headers().get("x-meta-description") ?? "";

  return (
    <>
      <div className="bg-background">
        {meta_title ? <h1 className="pt-4 px-4">{meta_title}</h1> : null}
        <CarouselWrapper name={name} />
        <FlashSaleWrapper />
        <ListGame name={name} />
        {meta_description ? (
          <div className="container -mb-12">
            <p className="pt-4 px-4 md:px-6">{meta_description}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
