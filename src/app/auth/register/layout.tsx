import { headers } from "next/headers";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  var url = headers().get("x-url") ?? "";
  var logo_url = headers().get("x-logo") ?? "";
  var keywords = headers().get("x-keywords") ?? "";
  var name = headers().get("x-name") ?? "";

  var url = headers().get("x-url") ?? "";
  var title = `Daftar/Register | ${name}`;
  var description = `Daftar/Register dan temukan semua voucher/top up game dan produk digital lainnya yang kamu butuhkan hanya di ${name}.`;

  return {
    manifest: "/api/manifest.json",
    title,
    description,
    keywords: keywords,
    openGraph: {
      images: [logo_url],
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
