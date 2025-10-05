import Link from "next/link";
import { IProductCategory, TProductGroup } from "@/Type";
import { CubeIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { GetCredHeader } from "@/app/api/api-utils";

async function getGroups(): Promise<TProductGroup[]> {
  var credentialHeader = GetCredHeader();
  var header = {
    "Content-Type": "application/json",
    "X-Sign": credentialHeader.sign,
    "X-User-Id": credentialHeader.mitraid,
    "X-Timestamp": credentialHeader.timestamp.toString(),
  };
  const res = await fetch(`${process.env.NEXT_API_URL}/v2/panel/label`, {
    cache: "no-store",
    headers: header,
  });
  let data: TProductGroup[] = [
    {
      id: "",
      name: "All",
    },
  ];
  if (res.ok) {
    const result = await res.json();
    data = data.concat(result.data);
  }
  return data;
}

async function getCategories(labelId?: string): Promise<IProductCategory[]> {
  var credentialHeader = GetCredHeader();
  var header = {
    "Content-Type": "application/json",
    "X-Sign": credentialHeader.sign,
    "X-User-Id": credentialHeader.mitraid,
    "X-Timestamp": credentialHeader.timestamp.toString(),
  };
  const res = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/category?label_id=${labelId}`,
    {
      cache: "no-store",
      headers: header,
      next: {
        revalidate: 30,
      },
    }
  );
  if (res.ok) {
    const result = await res.json();
    return result.data;
  }
  return [];
}

export default async function ListGame({
  name,
  label,
}: {
  name: string;
  label?: string;
}) {
  // Default to "All" group
  const groups = await getGroups();
  const data = await getCategories(label);

  return (
    <div className="bg-[#F0F8F6] pb-4 flex justify-center rounded-t-xl">
      <div className="w-full max-w-7xl px-2">
        <div className="md:flex md:items-end md:justify-between sticky z-10 top-12 py-2 rounded-t-lg bg-[#F0F8F6] backdrop-blur-md">
          <div className="block md:flex items-center justify-between mt-4 gap-12 w-full">
            <div
              className="no-scrollbar z-10 my-0.5 w-full"
              style={{
                display: "flex",
                flexDirection: "row",
                overflowX: "auto",
                scrollbarWidth: "none",
              }}
            >
              {groups.map((val, idx) => (
                <Link href={`/?label=${val.id}`} key={idx} scroll={false}>
                  <Badge
                    className={`mx-1 inline-block whitespace-nowrap cursor-pointer`}
                    variant={val.id == label ? "default" : "outline"}
                    key={`${idx}`}
                  >
                    {val.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 md:gap-4 gap-2 mt-2 place-items-center justify-center px-2">
          {data && data.length > 0 ? (
            data.map((val: IProductCategory, idx) =>
              val.name ? (
                <Link href={`/${val.key}`} key={idx} className="w-full h-full">
                  <Card className="w-full h-full min-w-fit rounded-xl hover:shadow-md hover:text-primary transition duration-300">
                    <div className="p-4 md:p-5 flex flex-col items-center">
                      <div className="overflow-clip h-20 md:h-28 w-auto rounded-xl bg-background aspect-square flex justify-center items-center">
                        {val.image_url !== "" ? (
                          <Image
                            height={500}
                            width={500}
                            alt={`${val.name} ${name}`}
                            title={`${val.name} ${name}`}
                            className="rounded-xl w-full hover:scale-125 transition duration-300"
                            src={val.image_url}
                          />
                        ) : (
                          <div className="w-full aspect-square hover:scale-125 flex justify-center items-center transition z-0 duration-300 hover:rotate-12">
                            <CubeIcon className="text-white m-auto h-20 w-20" />
                          </div>
                        )}
                      </div>
                      <h2 className="text-xs text-[70%] text-center mt-2 p-0">
                        {val.name}
                      </h2>
                    </div>
                  </Card>
                </Link>
              ) : null
            )
          ) : (
            <div className="col-span-full h-60 flex items-center justify-center">
              <h4 className="text-slate-300 font-semibold">
                Data Tidak Ditemukan
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
