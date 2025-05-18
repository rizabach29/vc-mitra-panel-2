import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { GetCredHeader } from "../../api/api-utils";
import { IBannerDetail } from "@/types/utils";
import BackHeader from "@/components/header/back-header";
import { headers } from "next/headers";
import Image from "next/image";
import { Metadata } from "next";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const getData = async (id: string) => {
  const credentialHeader = GetCredHeader();

  const res = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/banner/detail/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Sign": credentialHeader.sign,
        "X-User-Id": credentialHeader.mitraid,
        "X-Timestamp": credentialHeader.timestamp.toString(),
      },
      next: {
        revalidate: 30,
      },
    }
  );

  if (res.ok) {
    var data = await res.json();
    return data.data;
  }

  return undefined;
};

export async function generateMetadata(): Promise<Metadata> {
  var credentialHeader = GetCredHeader();
  var header = {
    "Content-Type": "application/json",
    "X-Sign": credentialHeader.sign,
    "X-User-Id": credentialHeader.mitraid,
    "X-Timestamp": credentialHeader.timestamp.toString(),
  };

  var logo_url = headers().get("x-logo") ?? "";
  var keywords = headers().get("x-keywords") ?? "";
  var name = headers().get("x-name") ?? "";

  var banner: IBannerDetail | undefined = undefined;
  var url = headers().get("x-url") ?? "";
  var split = url.split("/");
  var slug = split[split.length - 1];

  var host = headers().get("host") ?? "";
  url = "https://" + host + "/banner/" + slug;

  banner = await getData(slug);

  const date = new Date();
  const month = format(new Date(date), "MMMM", {
    locale: id,
  });

  const description = `Daftar harga voucher/top up termurah ${month} ${date.getFullYear()} di ${name}. Transaksi cepat, aman, dan banyak pilihan metode pembayaran.`;
  const title = `Beli/Top Up Termurah ${month} ${date.getFullYear()} | ${name}`;

  return {
    manifest: "/api/manifest.json",
    title,
    description,
    keywords: keywords,
    openGraph: {
      images: [banner?.image_url || logo_url],
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

async function Page({ params }: { params: { id: string } }) {
  var data: IBannerDetail = await getData(params.id);
  var url = headers().get("host") ?? "";

  return (
    <>
      <BackHeader title="Syarat Ketentuan" />
      <div className="flex justify-center w-full px-2">
        <div className="max-w-7xl w-full md:mt-4 mb-4 flex flex-col justify-center items-center">
          <Breadcrumb className="mb-4 hidden md:inline-flex justify-start w-full">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Banner</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="max-w-5xl w-full space-y-4">
            <div className="bg-background rounded-lg p-8 w-full">
              <div className="w-full space-y-4">
                <div className="bg-background rounded-lg w-full hidden md:flex justify-center items-center">
                  <Image
                    src={data.image_url}
                    alt={`promo diskon/cashback ${data.name}`}
                    title={`promo diskon/cashback ${data.name}`}
                    height={1000}
                    width={3000}
                    style={{ aspectRatio: 3 / 1 }}
                    className={`object-cover h-auto w-full md:rounded-lg duration-500 bg-zinc-200`}
                  />
                </div>
                {data ? (
                  <div
                    className="pt-6"
                    dangerouslySetInnerHTML={{
                      __html: data?.description,
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
