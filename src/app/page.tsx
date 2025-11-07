import FlashSaleWrapper from "@/app/dashboard/flash-sale/flash-sale-wrapper";
import ListGame from "@/app/dashboard/list-game/list-game";
import CarouselWrapper from "./dashboard/carousel/carousel-wrapper";
import { Metadata } from "next";
import { headers } from "next/headers";
import Ldjson from "./ldjson";

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

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  var name = headers().get("x-name") ?? "";
  var meta_title =
    headers().get("x-meta-title") ??
    `${name} Top Up Game Termurah & 100% Aman!`;
  var url = headers().get("host") ?? "";
  var label = (searchParams.label as string) ?? "";
  var seo_title =
    headers().get("x-seo-title") ??
    `<h1>Beli Voucher & Top Up Game Murah di ${name}</h1>`;

  return (
    <>
      <Ldjson appName={name} url={url} />
      <div className="bg-background">
        <CarouselWrapper name={name} title={meta_title} />
        <div className="flex justify-center rounded-t-xl bg-[#F0F8F6]">
          <div className="w-full max-w-7xl px-2 pt-4">
            <div
              className="mb-4 article-content"
              dangerouslySetInnerHTML={{
                __html: seo_title,
              }}
            ></div>
          </div>
        </div>
        <FlashSaleWrapper />
        <ListGame name={name} label={label} />
      </div>
    </>
  );
}
