import { headers } from "next/headers";
import { GetCredHeader } from "./api/api-utils";
import { IProductCategory } from "@/Type";

export const revalidate = 43200;

export default async function sitemap() {
  var url = headers().get("host") ?? "";
  url = "https://" + url;

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

  var detailProducts: any[] = [];

  if (re.ok) {
    var result = await re.json();
    games = result.data;

    detailProducts = games.map((i) => ({
      url: url + "/games/" + i.key,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    }));
  }

  var base = [
    {
      url: url + "/games",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: url + "/auth/login",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: url + "/auth/register",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: url + "/flash-sale",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url + "/kebijakan",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: url + "/syarat-ketentuan",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  base.concat(detailProducts);

  return base;
}
