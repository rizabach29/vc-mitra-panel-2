import { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  var host = headers().get("host") ?? "";
  var url = host + "/auth/login";
  var logo_url = headers().get("x-logo") ?? "";
  var keywords = headers().get("x-keywords") ?? "";
  var name = headers().get("x-name") ?? "";

  var title = `Masuk/Login | ${name}`;
  var description = `Masuk/login dan temukan semua voucher/top up game dan produk digital lainnya yang kamu butuhkan hanya di ${name}.`;

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
  var name = headers().get("x-name") ?? "";

  return (
    <>
      <h1 className="hidden">Login {name}</h1>
      {children}
    </>
  );
}
