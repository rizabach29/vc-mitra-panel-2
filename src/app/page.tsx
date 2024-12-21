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

  return {
    manifest: "/api/manifest.json",
    title: `Beli Voucher & Top Up Game Murah di ${name}`,
    description: `${name} tempat top up game termurah & beli voucher game terlengkap. Cuma di ${name} top up ML, HoK, FF, PUBG & lainnya jadi makin mudah dan cepat`,
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

  return (
    <>
      <div className="bg-background">
        <h1 className="hidden">Beli Voucher & Top Up Game Murah</h1>
        <CarouselWrapper name={name} />
        <FlashSaleWrapper />
        <ListGame name={name} />
      </div>
    </>
  );
}
