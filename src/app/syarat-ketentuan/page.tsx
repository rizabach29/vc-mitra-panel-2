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
import { headers } from "next/headers";
import Head from "next/head";

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

async function Page() {
  var data: ISiteProfile | undefined = await getData();
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
                    "@id": url + "/syarat-ketentuan",
                    name: "Syarat Ketentuan",
                  },
                },
              ],
            }),
          }}
        />
      </Head>
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
                <BreadcrumbPage>Syarat dan Ketentuan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="max-w-5xl w-full space-y-4">
            <div className="bg-background rounded-lg p-4 w-full">
              <div className="w-full space-y-4">
                <div className="bg-background rounded-lg w-full hidden md:block">
                  <h3 className="font-semibold text-primary">
                    Syarat dan Ketentuan
                  </h3>
                </div>
                {data ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.terms_condition,
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
