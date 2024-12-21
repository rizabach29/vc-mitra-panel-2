"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ISosmed } from "@/types/utils";
import Socmed from "./socmed-icon";
import Link from "next/link";

function HelpButton() {
  const [data, setData] = useState<ISosmed[]>([]);

  useEffect(() => {
    (async () => {
      var res = await fetch("/api/social-media");
      if (res.ok) {
        var data = await res.json();

        var linkData = data.data.map((item: ISosmed) => {
          if (item.key === "email") item.value = "mailto:" + item.value;
          else if (item.key === "telegram")
            item.value = "https://telegram.me/" + item.value;
          else if (item.key === "whatsapp") {
            let val = item.value;
            if (item.value[0] == "0") val = "62" + item.value.substring(1);
            item.value = "https://wa.me/" + val;
          }

          return item;
        });

        setData(linkData);
        return;
      }

      setData([]);
    })();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <ChatBubbleIcon className="w-3.5 h-3" />
          <p className="text-xs ml-1">Bantuan</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium text-xs leading-none">Bantuan</h4>
          <p className="text-xs text-muted-foreground">
            Anda bisa meminta bantuan melalui link dibawah.
          </p>
          <div className="mt-2 space-y-1.5">
            {data.map((item) => (
              <Link
                href={`${item.value}`}
                className={`flex hover:bg-zinc-50 gap-4 px-2 cursor-pointer items-center`}
                key={item.key}
              >
                <div
                  className={`w-7  p-0.5 rounded-full flex items-center justify-center`}
                >
                  <Socmed type={item.key} />
                </div>
                <p className={`text-xs text-primary`}>{item.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default HelpButton;
