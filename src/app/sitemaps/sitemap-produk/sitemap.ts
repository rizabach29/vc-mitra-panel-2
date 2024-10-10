import { GetCredHeader } from "@/app/api/api-utils";
import { IProductCategory } from "@/Type";
import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Sitemap> {
  var url = headers().get("host") ?? "";

  var credentialHeader = GetCredHeader();
  var header = {
    "Content-Type": "application/json",
    "X-Sign": credentialHeader.sign,
    "X-User-Id": credentialHeader.mitraid,
    "X-Timestamp": credentialHeader.timestamp.toString(),
  };

  var games: IProductCategory[] = [];
  var re = await fetch(`${process.env.NEXT_API_URL}/v2/panel/category`, {
    next: {
      revalidate: 30,
    },
    headers: header,
  });
  if (re.ok) {
    var result = await re.json();
    games = result.data;

    return games.map((i) => ({
      url: url + "/games/" + i.key,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    }));
  }

  return [];
}
