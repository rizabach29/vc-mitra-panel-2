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
import { IBlogDetail } from "@/types/utils";
import BackHeader from "@/components/header/back-header";
import { headers } from "next/headers";
import Image from "next/image";
import { Metadata } from "next";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { notFound } from "next/navigation";
import Head from "next/head";

const getData = async (id: string) => {
  const credentialHeader = GetCredHeader();

  const res = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/blog/detail/${id}`,
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

  var blog: IBlogDetail | undefined = undefined;
  var url = headers().get("x-url") ?? "";
  var split = url.split("/");
  var slug = split[split.length - 1];

  var host = headers().get("host") ?? "";
  url = "https://" + host + "/blog/" + slug;

  blog = await getData(slug);

  const date = new Date();
  const month = format(new Date(date), "MMMM", {
    locale: id,
  });

  const title = blog?.meta_title ?? `Terbaru Hari Ini - ${name}.`;
  const description =
    blog?.meta_description ??
    `Update berita game terbaru  dan terlengkap di Blog ${name}. Temukan artikel informasi, event, tips & trik seputar game ML, FF, PUBG, Roblox dan masih banyak lagi.`;

  return {
    manifest: "/api/manifest.json",
    title,
    description,
    keywords: keywords,
    openGraph: {
      images: [blog?.banner_url || logo_url],
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
  var name = headers().get("x-name") ?? "";
  var host = headers().get("host") ?? "";
  var logo = headers().get("x-logo") ?? "";

  // fetch data
  var res = await getData(params.id);
  var data: IBlogDetail | undefined = res;
  if (!data) return notFound();

  return (
    <>
      <head>
        <script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: { "@id": `https://${host}`, name: "Home" },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@id": `https://${host}/blog`,
                    name: "Blog",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@id": `https://${host}/blog/${data.slug}`,
                    name: data.title,
                  },
                },
              ],
            }),
          }}
        />
        <script
          id="blog-posts-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "diisi dengan url artikel terkait",
              },
              headline: data.title,
              description: data.meta_description,
              image: data.banner_url,
              author: {
                "@type": "Person",
                name,
                url: `https://${host}`,
              },
              publisher: {
                "@type": "Organization",
                name,
                logo: {
                  "@type": "ImageObject",
                  url: logo,
                },
              },
              datePublished: new Date(data.created_at).toISOString(),
              articleSection: "Berita Game",
              url: `https://${host}/blog/${data.slug}`,
            }),
          }}
        />
      </head>
      <BackHeader title="Blog" />
      <div className="flex justify-center w-full px-2">
        <div className="max-w-7xl w-full md:mt-4 mb-4 flex flex-col justify-center items-center">
          <Breadcrumb className="mb-4 hidden md:inline-flex justify-start w-full">
            <BreadcrumbList>
              <BreadcrumbItem position={1}>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem position={2}>
                <BreadcrumbLink href={`/blog`}>Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem position={3}>
                <BreadcrumbPage>{data.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="max-w-5xl w-full space-y-4">
            <div className="bg-background rounded-lg lg:p-8 p-4 w-full">
              <div className="w-full">
                <h1 className="text-3xl font-bold text-center p-0 m-0">
                  {data.title}
                </h1>
                <p className="text-center text-xs text-muted-foreground m-0 pt-4 pb-8">
                  {new Date(data.created_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="bg-background rounded-lg w-full justify-center items-center">
                  <Image
                    src={data.banner_url}
                    alt={`${data.title}`}
                    title={`${data.title}`}
                    height={1000}
                    width={3000}
                    style={{ aspectRatio: 3 / 1 }}
                    className={`object-cover h-auto w-full md:rounded-lg duration-500 bg-zinc-200`}
                  />
                </div>
                {data ? (
                  <div
                    className="mt-8 article-content"
                    dangerouslySetInnerHTML={{
                      __html: data?.content,
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
