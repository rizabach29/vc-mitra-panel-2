import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  var url = headers().get("x-url") ?? "/";
  url = "https://" + url;

  return {
    rules: {
      userAgent: "*",
      disallow: ["/transaksi/", "/profile/", "/saldo/"],
    },
    sitemap: [
      url + "/sitemaps/sitemap-produk/sitemap.xml",
      url + "/sitemaps/sitemap-general/sitemap.xml",
    ],
  };
}
