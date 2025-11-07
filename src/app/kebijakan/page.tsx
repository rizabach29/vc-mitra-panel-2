import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { GetCredHeader } from "../api/api-utils";
import { ISiteProfile } from "@/types/utils";
import BackHeader from "@/components/header/back-header";
import Head from "next/head";
import { headers } from "next/headers";
import { Metadata } from "next";

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
    title: `Kebijakan - ${name}`,
    description:
      meta_description ??
      `${name} tempat top up game termurah & beli voucher game terlengkap. Cuma di ${name} top up ML, HoK, FF, PUBG & lainnya jadi makin mudah dan cepat`,
    keywords: keywords,
    openGraph: {
      images: [logo_url],
      title: `Kebijakan - ${name}`,
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

async function Page() {
  var data: ISiteProfile | undefined = await getData();
  var url = headers().get("host") ?? "";

  return (
    <>
      <head>
        <script
          id="kebijakan-schema"
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
                    "@id": url + "/kebijakan",
                    name: "Kebijakan",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <BackHeader title="Kebijakan Privasi" />
      <div className="flex justify-center w-full px-2">
        <div className="max-w-7xl w-full md:mt-4 mb-4 flex flex-col justify-center items-center">
          <Breadcrumb className="mb-4 hidden md:inline-flex justify-start w-full">
            <BreadcrumbList>
              <BreadcrumbItem position={1}>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem position={2}>
                <BreadcrumbPage>Kebijakan dan Privasi</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="max-w-4xl w-full space-y-4">
            <div className="bg-background rounded-lg p-4 w-full">
              <div className="w-full space-y-4">
                <div className="bg-background rounded-lg w-full hidden md:block">
                  <h1 className="font-semibold text-primary">
                    Kebijakan Privasi
                  </h1>
                </div>
                {data ? (
                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{
                      __html: data?.privacy_policy,
                    }}
                  ></div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
