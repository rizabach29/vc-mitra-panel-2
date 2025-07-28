import NotFound from "@/app/not-found";
import DetailCategory from "./DetailCategory";
import BackHeader from "@/components/header/back-header";
import Ldjson from "./ldjson";
import { getCategory, getProducts } from "./data";

async function Content({
  id,
  appName,
  url,
}: {
  id: string;
  appName: string;
  url: string;
}) {
  const category = await getCategory(id);
  console.log("Category data:", category);
  if (!category) return <NotFound />;

  const products = await getProducts(id);

  return (
    <>
      <Ldjson appName={appName} url={url} />
      <BackHeader title="Pembelian" />
      <div className="flex justify-center w-full">
        <div className="max-w-7xl w-full mb-0 px-2">
          <DetailCategory
            data={{ category, products }}
            appName={appName}
            products={products}
            loading={false}
          />
        </div>
      </div>
    </>
  );
}

export default Content;
