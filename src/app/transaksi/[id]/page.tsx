import React from "react";
import TransactionHistoryDetail from "./transaction-detail";
import { GetCredHeader } from "@/app/api/api-utils";
import { ISiteProfile } from "@/types/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BackHeader from "@/components/header/back-header";
import { Metadata } from "next";
import { headers } from "next/headers";
import Head from "next/head";

export async function generateMetadata(): Promise<Metadata> {
  var logo_url = headers().get("x-logo") ?? "";
  var keywords = headers().get("x-keywords") ?? "";
  var name = headers().get("x-name") ?? "";

  var url = headers().get("x-url") ?? "";
  var split = url.split("/");
  var slug = split[split.length - 1];

  var host = headers().get("host") ?? "";
  url = "https://" + host + "/transaksi/" + slug;
  var title = `Detail Pesanan | ${name}`;
  var description = `Lihat detail pesanan kamu di ${name}.`;

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

const getData = async () => {
  const credentialHeader = GetCredHeader();

  const res = await fetch(`${process.env.NEXT_API_URL}/v2/panel/site-profile`, {
    headers: {
      "Content-Type": "application/json",
      "X-Sign": credentialHeader.sign,
      "X-User-Id": credentialHeader.mitraid,
      "X-Timestamp": credentialHeader.timestamp.toString(),
    },
    next: {
      revalidate: 30,
    },
  });

  if (res.ok) {
    var data = await res.json();
    return data.data;
  }

  return undefined;
};

async function DetailPage({ params }: { params: { id: string } }) {
  var profile: ISiteProfile | undefined = await getData();
  var url = headers().get("host") ?? "";

  return (
    <>
      <Head>
        <script
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
                    "@id": url + "/transaksi",
                    name: "List Transaksi",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@id": url + "/transaksi/",
                    name: "Detail Transaksi",
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <BackHeader title="Detail Transaksi" />
      <div className="pt-4 px-2 flex w-full justify-center">
        <div className="max-w-7xl w-full flex flex-col justify-center items-center">
          <Breadcrumb className="mb-4 hidden md:inline-flex justify-start w-full">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/transaksi">Transaksi</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Detail</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="max-w-5xl w-full">
            <TransactionHistoryDetail id={params.id} profile={profile} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
