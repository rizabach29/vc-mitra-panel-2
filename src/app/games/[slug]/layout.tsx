import { IProductCategory } from "@/Type";
import { Metadata } from "next";
import { GetCredHeader } from "@/app/api/api-utils";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  var credentialHeader = GetCredHeader();
  var header = {
    "Content-Type": "application/json",
    "X-Sign": credentialHeader.sign,
    "X-User-Id": credentialHeader.mitraid,
    "X-Timestamp": credentialHeader.timestamp.toString(),
  };

  var url = headers().get("x-url") ?? "";
  var logo_url = headers().get("x-logo") ?? "";
  var keywords = headers().get("x-keywords") ?? "";
  var name = headers().get("x-name") ?? "";

  var games: IProductCategory | undefined = undefined;
  var url = headers().get("x-url") ?? "";
  var split = url.split("/");
  var slug = split[split.length - 1];
  var re = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/category/${slug}`,
    {
      next: {
        revalidate: 30,
      },
      headers: header,
    }
  );
  if (re.ok) {
    var result = await re.json();
    games = result.data;
  }

  const date = new Date();
  const description = `Daftar harga voucher/top up ${
    games?.name
  } murah ${date.getMonth()} ${date.getFullYear()} di ${name}. Transaksi cepat, aman, dan banyak pilihan metode pembayaran.`;
  const title = `Beli/Top Up ${
    games?.name
  } Termurah ${date.getMonth()} ${date.getFullYear()} | ${name}`;

  return {
    manifest: "/api/manifest.json",
    title,
    description,
    keywords: keywords,
    openGraph: {
      images: [games?.image_url || logo_url],
      title,
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}