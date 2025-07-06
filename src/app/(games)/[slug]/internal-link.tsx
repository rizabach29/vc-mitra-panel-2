import { GetCredHeader } from "@/app/api/api-utils";
import { Badge } from "@/components/ui/badge";
import { IProductCategory } from "@/Type";
import Link from "next/link";
import React from "react";

function getHeader() {
  var credentialHeader = GetCredHeader();
  var header = {
    "Content-Type": "application/json",
    "X-Sign": credentialHeader.sign,
    "X-User-Id": credentialHeader.mitraid,
    "X-Timestamp": credentialHeader.timestamp.toString(),
  };
  return header;
}

const getData: () => Promise<IProductCategory[]> = async () => {
  const listChar = ["a", "i", "u", "e", "o"];
  var num = Math.floor(Math.random() * (listChar.length - 1 + 1) + 0);
  let searchParams = new URLSearchParams({
    page: `${1}`,
    limit: "10",
    search: `${listChar[num]}`,
  });

  var res = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/category?` + searchParams,
    {
      next: {
        revalidate: 30,
      },
      headers: getHeader(),
    }
  );
  if (res.ok) {
    var result = await res.json();
    return result.data;
  }

  return [];
};

async function InternalLink() {
  const data = await getData();

  return (
    <div>
      <h2 className="font-medium text-lg ml-2 text-muted-foreground">
        Produk Lainnya
      </h2>
      <div className="flex-wrap flex gap-2">
        {data.map((item, i) => (
          <Link key={i} href={`/${item.key}`}>
            <Badge variant="ghost" className="mr-1">
              {item.name}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default InternalLink;
