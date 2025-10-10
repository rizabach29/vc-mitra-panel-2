import BackHeader from "@/components/header/back-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { headers } from "next/headers";
import React from "react";
import { GetCredHeader } from "../api/api-utils";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Metadata } from "next";

async function fetchBlogPosts(
  pageNumber = 1,
  searchQuery: string | string[] = ""
) {
  const credentialHeader = GetCredHeader();

  // Handle searchQuery as string or string[]
  let searchParam = "";
  if (Array.isArray(searchQuery)) {
    searchParam = searchQuery.join(" ");
  } else {
    searchParam = searchQuery;
  }

  const response = await fetch(
    `${
      process.env.NEXT_API_URL
    }/v2/panel/blog/list?page=${pageNumber}&search=${encodeURIComponent(
      searchParam
    )}&limit=10`,
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
  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  var logo_url = headers().get("x-logo") ?? "";
  var keywords = headers().get("x-keywords") ?? "";
  var name = headers().get("x-name") ?? "";

  var url = headers().get("x-url") ?? "";
  var split = url.split("/");
  var slug = split[split.length - 1];

  var host = headers().get("host") ?? "";
  url = "https://" + host + "/blog/" + slug;

  const description = `Berita Game Terbaru Hari Ini - ${name}.`;
  const title = `Update berita game terbaru  dan terlengkap di Blog ${name}. Temukan artikel informasi, event, tips & trik seputar game ML, FF, PUBG, Roblox dan masih banyak lagi.`;

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

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  var url = headers().get("host") ?? "";
  const pageNumber = searchParams.page
    ? parseInt(searchParams.page as string)
    : 1;
  const searchQuery = searchParams.search || "";

  const blogPosts = await fetchBlogPosts(pageNumber, searchQuery);

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
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
                  "@id": url + "/blog",
                  name: "Blog",
                },
              },
            ],
          }),
        }}
      />
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
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="max-w-5xl w-full space-y-4">
            <h1 className="text-2xl font-semibold mb-4">Artikel Terkini</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {blogPosts.data.map((post: any) => (
                <div
                  key={post.id}
                  className="mb-6 relative p-4 bg-white rounded-lg shadow"
                >
                  <Image
                    src={post.banner_url}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-gray-600">
                      {new Date(post.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-500 hover:underline text-xs text-right w-full"
                  >
                    Read more
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              {/* Pagination controls can be added here */}
              {pageNumber > 1 && (
                <Link
                  href={`/blog?page=${
                    pageNumber - 1
                  }&search=${encodeURIComponent(searchQuery as string)}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                >
                  Previous
                </Link>
              )}
              {pageNumber < Math.ceil(blogPosts.total / blogPosts.limit) && (
                <Link
                  href={`/blog?page=${
                    pageNumber + 1
                  }&search=${encodeURIComponent(searchQuery as string)}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
