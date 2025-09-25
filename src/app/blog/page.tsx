import BackHeader from "@/components/header/back-header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Head from "next/head";
import { headers } from "next/headers";
import React from "react";
import { GetCredHeader } from "../api/api-utils";
import Link from "next/link";
import Image from "next/image";

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
                    "@id": url + "/blog",
                    name: "Blog",
                  },
                },
              ],
            }),
          }}
        />
      </Head>
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
            <h1 className="text-2xl font-semibold mb-4">Blog Posts</h1>
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
