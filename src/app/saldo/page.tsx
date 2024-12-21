import React from "react";
import SaldoPointHistory from "./saldopoint-history";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { thousandMask } from "@/Helpers";
import InfoTooltip from "@/components/info-tooltip";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Head from "next/head";
import { headers } from "next/headers";

async function Page() {
  const session = await getServerSession(options);
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
                    "@id": url + "/saldo",
                    name: "Saldo",
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <div className="flex justify-center w-full px-2">
        <div className="max-w-7xl w-full md:mt-4 mb-4 flex flex-col justify-center items-center">
          <Breadcrumb className="mb-4 hidden md:inline-flex justify-start w-full">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Riwayat Saldo</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="max-w-4xl w-full space-y-4">
            <div className="bg-background rounded-xl p-4 md:p-0">
              <div className="bg-zinc-50 md:bg-transparent rounded-xl p-4 w-full flex md:flex-col items-center md:items-start justify-between sticky top-12">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold primary p-0">Saldo Point</h3>
                  <InfoTooltip>
                    <p className="text-xs">Ini Merupakan Saldo Refund</p>
                  </InfoTooltip>
                </div>
                <h6 className="text-primary font-medium md:mt-2">
                  {thousandMask(session?.profile.saldo ?? 0)}
                </h6>
              </div>
            </div>
            <SaldoPointHistory />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
