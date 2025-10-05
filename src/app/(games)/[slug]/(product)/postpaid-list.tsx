import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProductItem, TProductItemWithTags } from "@/Type";
import PostpaidSelectWrapper from "./postpaid-select-wrapper";

interface IProductList {
  products?: TProductItemWithTags;
  nextRef: string;
  selected?: string | string[] | undefined;
}

export default function PostpaidList(prop: IProductList) {
  let formedProducts: TProductItem[] = [];
  if (prop.products) {
    formedProducts = prop.products.products.flatMap((detail) =>
      detail.products.map((item) => item)
    );
  }
  // Default selected product
  const selectedKey =
    (prop.selected && typeof prop.selected === "string"
      ? prop.selected
      : formedProducts[0]?.key) || "";

  return (
    <div className="relative -mx-2 px-2">
      <div className="w-full ">
        <PostpaidSelectWrapper
          nextRef={prop.nextRef}
          selected={selectedKey}
          products={formedProducts}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih produk" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Produk</SelectLabel>
              {formedProducts.map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  <h3 className="text-sm p-0 m-0">{item.name}</h3>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </PostpaidSelectWrapper>
      </div>
    </div>
  );
}

// ...existing code...
