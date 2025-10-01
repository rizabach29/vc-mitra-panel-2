import DetailCategory from "./DetailCategory";
import BackHeader from "@/components/header/back-header";
import Ldjson from "./ldjson";
import { getCategory, getProducts } from "./data";
import { notFound } from "next/navigation";

async function Content({
  id,
  appName,
  url,
  selected,
}: {
  id: string;
  appName: string;
  url: string;
  selected: string | string[] | undefined;
}) {
  const category = await getCategory(id);
  if (!category) return notFound();

  const products = await getProducts(id);

  return (
    <>
      <Ldjson
        appName={appName}
        url={url}
        category={category}
        products={products}
      />
      <BackHeader title="Pembelian" />
      <div className="flex justify-center w-full">
        <div className="max-w-7xl w-full mb-0 px-2">
          <DetailCategory
            data={{ category, products }}
            appName={appName}
            products={products}
            loading={false}
            selected={selected}
          />
        </div>
      </div>
    </>
  );
}

export default Content;
