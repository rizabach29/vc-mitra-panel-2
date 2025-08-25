"use client";

import { debounce } from "@/Helpers";
import { IProductCategory } from "@/Type";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { CubeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Searchbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<IProductCategory[]>([]);
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const getList = async () => {
    let searchParams = new URLSearchParams({
      page: `1`,
      limit: "10",
      search,
    });

    var res = await fetch(`/api/products/categories?` + searchParams);

    if (res.ok) {
      const dataJson = await res.json();
      if (dataJson.data) {
        setData(dataJson.data);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setData([]);
    }
  };

  React.useEffect(() => {
    (async () => {
      if (isOpen) await getList();
    })();
  }, [search, isOpen]);

  const doSearch = debounce((e: string) => {
    setSearch(e);
  }, 500);

  React.useEffect(() => {
    setData([]);
  }, [isOpen]);

  return (
    <>
      <div className="mr-2 hidden md:block">
        <Button
          size="sm"
          onClick={() => setIsOpen(true)}
          className="flex space-x-1"
        >
          <MagnifyingGlassIcon />
          <div className="text-xs">Cari Game</div>
        </Button>
      </div>
      <div className="md:hidden text-primary">
        <Button
          size="sm"
          onClick={() => setIsOpen(true)}
          className="flex space-x-1"
        >
          <MagnifyingGlassIcon />
        </Button>
      </div>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <h5 className="w-full font-semibold text-center mt-4">Pencarian</h5>
        <CommandInput placeholder="Cari Produk" onValueChange={doSearch} />
        <CommandList className="min-h-[15rem]">
          {data.length > 0 ? (
            data.map((i, idx) => (
              <div
                key={idx}
                className="px-5 py-2 hover:bg-zinc-50 cursor-pointer flex items-center gap-4"
                onClick={() => {
                  router.push(`/${i.key}`);
                  setIsOpen(false);
                }}
              >
                {i.image_url !== "" ? (
                  <div className="rounded overflow-clip bg-white aspect-square flex justify-center items-center">
                    <Image
                      width={45}
                      height={45}
                      alt={i.name}
                      src={i.image_url}
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-square hover:scale-125 flex justify-center items-center transition z-0 duration-300 hover:rotate-12">
                    <CubeIcon className="text-white m-auto h-4 w-4" />
                  </div>
                )}
                <div className="">{i.name}</div>
              </div>
            ))
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default Searchbar;
