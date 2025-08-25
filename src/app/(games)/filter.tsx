import { debounce } from "@/Helpers";
import { IProductCategory } from "@/Type";
import { Combobox, TValue } from "@/components/ui/combobox";
import React, { useEffect, useState } from "react";

function Filter({ onChange }: { onChange: (val: TValue | undefined) => void }) {
  const [data, setData] = useState<TValue[]>([]);
  const [value, setValue] = useState<TValue | undefined>();
  const [search, setSearch] = useState<string>("");

  const getList = async (isSearch = false) => {
    let searchParams = new URLSearchParams({
      page: `1`,
      limit: "10",
      search,
    });

    var res = await fetch(`/api/products/categories?` + searchParams);

    if (res.ok) {
      const dataJson = await res.json();
      if (dataJson.data) {
        var resData: TValue[] = dataJson.data.map((i: IProductCategory) => {
          return {
            value: i.key,
            label: i.name,
          };
        });
        setData(resData);
        if (resData.length > 0 && !isSearch) {
          setValue(resData[0]);
          onChange(resData[0]);
        }
        return;
      }
      setData([]);
    }
  };

  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await getList(true);
    })();
  }, [search]);

  const doSearch = debounce((e: string) => {
    setSearch(e);
  }, 500);

  return (
    <div className="md:flex md:space-x-1 space-y-1 md:space-y-0 w-full">
      <div className="w-full">
        <Combobox
          onSearch={doSearch}
          onChange={(val) => {
            setValue(val);
            onChange(val);
          }}
          className="bg-background"
          data={data}
          placeholder="Pilih Kategori"
          defaultValue={value}
        />
      </div>
    </div>
  );
}

export default Filter;
