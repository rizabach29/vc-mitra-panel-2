import { headers } from "next/headers";

const generateSitemapLink = (url: string) =>
  `<sitemap><loc>${url}</loc></sitemap>`;

export async function GET() {
  var url = headers().get("host") ?? "";
  url = "https://" + url;

  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${generateSitemapLink(`${url}/sitemaps/sitemap-general/sitemap.xml`)}
        ${generateSitemapLink(`${url}/sitemaps/sitemap-produk/sitemap.xml`)}
    </sitemapindex>`;

  return new Response(sitemapIndexXML, {
    headers: { "Content-Type": "text/xml" },
  });
}
