import { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  var url = headers().get("x-url") ?? "";
  var logo_url = headers().get("x-logo") ?? "";
  var keywords = headers().get("x-keywords") ?? "";
  var name = headers().get("x-name") ?? "";

  var title = `Reset Password/Atur Ulang Kata Sandi | ${name}`;
  var description = `Reset password/atur ulang kata sandi kamu di ${name} biar bisa langsung top up/beli voucher game/produk digital kesayangan kamu!`;

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
      <h1 className="hidden">Reset Password {name}</h1>
      {children}
    </>
  );
}
