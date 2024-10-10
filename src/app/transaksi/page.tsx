import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import AuthPage from "./(authenticated)/auth-page";
import PublicPage from "./(public)/public-page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import { GetCredHeader } from "../api/api-utils";
import { headers } from "next/headers";
import { ISiteProfile } from "@/types/utils";
import Head from "next/head";

export async function generateMetadata(): Promise<Metadata> {
  var credentialHeader = GetCredHeader();
  var header = {
    "Content-Type": "application/json",
    "X-Sign": credentialHeader.sign,
    "X-User-Id": credentialHeader.mitraid,
    "X-Timestamp": credentialHeader.timestamp.toString(),
  };

  // fetch data
  const res = await fetch(`${process.env.NEXT_API_URL}/v2/panel/site-profile`, {
    headers: header,
    next: {
      revalidate: 120,
    },
  });

  if (res.ok) {
    var data = await res.json();
    var setting: ISiteProfile = data.data;
    var description = setting.description;

    var host = headers().get("host") ?? "";
    var url = "http://" + host + "/transaksi";
    var title = `Daftar Pesanan | ${setting.name}`;
    description = `Temukan semua daftar pesanan kamu di ${setting.name}.`;

    return {
      manifest: "/api/manifest.json",
      title,
      description,
      keywords: setting.keywords,
      openGraph: {
        images: [setting.logo_url],
        title,
        url,
        type: "website",
      },
      icons: {
        icon: setting.logo_url,
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

  return {};
}

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
                    "@id": url + "/transaksi",
                    name: "List Transaksi",
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <div className="md:pt-4 px-2 flex w-full justify-center">
        <div className="max-w-7xl w-full flex flex-col justify-center items-center">
          <Breadcrumb className="mb-4 hidden md:inline-flex justify-start w-full">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Transaksi</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="hidden">Cek Pesananku</h1>
          <div className="max-w-5xl w-full">
            {session ? <AuthPage /> : <PublicPage />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
