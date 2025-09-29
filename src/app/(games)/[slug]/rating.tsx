"use client";

import { Card } from "@/components/ui/card";
import { IReviewTransaction } from "@/Type";
import { StarFilledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const LIMIT = 5;

function Rating({ id }: { id: string }) {
  const [displayReview, setDisplayReview] = useState<IReviewTransaction[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  React.useEffect(() => {
    getData(page, LIMIT).then((res) => {
      if (res) setDisplayReview((prev) => [...prev, ...res]);
    });
  }, [page, id]);

  async function getData(page: number, limit: number) {
    var res = await fetch(
      `/api/products/categories/${id}/review?page=${page ?? 1}&limit=${
        limit ?? LIMIT
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      var result = await res.json();
      let totalData = result.manifest.total;
      let totalPages = Math.ceil(totalData / LIMIT);
      setTotalPages(totalPages);
      return result.data;
    }
  }

  return (
    <div className="text-xs space-y-2 max-h-72 overflow-y-auto py-2">
      {displayReview.map((item, index) => (
        <Card
          key={index}
          className="border-b last:border-0 border-b-muted/50 py-2 px-3.5"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">{item.member_name}</div>
            <div className="ml-2 text-xs text-muted-foreground">
              {" "}
              {new Date(item.created_at).toLocaleDateString()}
            </div>
          </div>
          <div className="items-center gap-1 mb-2 flex">
            <StarFilledIcon
              style={{ width: 10, height: 10 }}
              className="text-yellow-500"
            />
            <p className="text-xs text-muted-foreground">{item?.rating ?? 5}</p>
          </div>
          <div className="text-xs text-muted-foreground">
            {item.review_text}
          </div>
        </Card>
      ))}
      {totalPages > page && (
        <div className="flex justify-center">
          <button
            className="text-sm text-primary hover:underline"
            onClick={() => setPage(page + 1)}
          >
            Lihat lebih banyak
          </button>
        </div>
      )}
    </div>
  );
}

export default Rating;
