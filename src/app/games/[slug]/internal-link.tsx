import { Badge } from "@/components/ui/badge";
import { IProductCategory } from "@/Type";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function InternalLink() {
  const [data, setData] = useState<IProductCategory[]>([]);

  const getData = async () => {
    const listChar = ["a", "i", "u", "e", "o"];
    var num = Math.floor(Math.random() * (listChar.length - 1 + 1) + 0);
    let searchParams = new URLSearchParams({
      page: `${1}`,
      limit: "10",
      search: `${listChar[num]}`,
    });

    var res = await fetch(`/api/products/categories?` + searchParams);

    if (res.ok) {
      var result = await res.json();
      setData(result.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2 className="font-medium text-lg ml-2 text-muted-foreground">
        Produk Lainnya
      </h2>
      <div className="flex-wrap flex gap-2">
        {data.map((item, i) => (
          <Link key={i} href={`/games/${item.key}`}>
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
