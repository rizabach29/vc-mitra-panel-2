import { GetCredHeader } from "@/app/api/api-utils";
import { IProductCategory, TProductItemWithTags } from "@/Type";

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

export async function getCategory(
  id: string
): Promise<IProductCategory | null> {
  var res = await fetch(`${process.env.NEXT_API_URL}/v2/panel/category/${id}`, {
    next: {
      revalidate: 30,
    },
    headers: getHeader(),
  });

  if (!res.ok) {
    return null;
  }

  const result = await res.json();
  return result.data;
}

export async function getProducts(
  id: string,
  searchParams?: string
): Promise<TProductItemWithTags | undefined> {
  const strUrl = `${process.env.NEXT_API_URL}/v2/panel/product-with-tags/${id}?${searchParams}`;

  var res = await fetch(strUrl, {
    next: {
      revalidate: 30,
    },
    headers: getHeader(),
  });

  if (!res.ok) {
    return undefined;
  }

  const result = await res.json();
  return result.data;
}
