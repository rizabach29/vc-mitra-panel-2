import { IProductCategory } from "@/Type";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Description from "./collapsible-description";
import Image from "next/image";

function Header({
  category,
  name,
}: {
  category: IProductCategory;
  name: string;
}) {
  return (
    <Card className="w-full mt-2 h-full min-w-fit mb-3 ">
      <CardContent className="p-0">
        {category.banner_url && (
          <div
            className="w-full md:px-4 md:pt-4 overflow-clip md:overflow-visible rounded-t-xl"
            style={{ aspectRatio: 3 / 1 }}
          >
            <Image
              width={900}
              height={300}
              alt={`${category.name} ${name}`}
              title={`${category.name} ${name}`}
              src={category?.banner_url}
              style={{ aspectRatio: 3 / 1 }}
              className={`object-cover w-full md:rounded-xl rounded-t-xl border`}
            />
          </div>
        )}
        <div className="py-3 px-6">
          <div className="md:flex z-10 md:space-x-4">
            <div
              className={`rounded w-fit flex items-end md:items-start ${
                category.banner_url ? "-mt-6" : ""
              } md:mt-0 md:ml-0`}
            >
              <div className="relative w-12 md:w-16 aspect-square border rounded-lg overflow-clip flex justify-center items-center bg-white">
                <Image
                  width={300}
                  height={300}
                  alt={`${category.name} ${name}`}
                  title={`${category.name} ${name}`}
                  className="h-auto w-12 md:w-16 absolute"
                  src={
                    category.image_url ??
                    "https://s3-alpha-sig.figma.com/img/933a/09a5/c2747dd0ee221420e9c6686f29720965?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K3KMtkf5K~~yfNXa2ea9tssgpbLWFv1iMb8SsvtvV3ge91j3ZZW4AmC0xllLpF4amUV-ynFUhLL-V67bEY1ZVqHfVomDFdxW920v8ewfTclN1ZVIp1u2LgV1AmDbyh~SvyFud9HrNh1H5tP-9Rnm-RKir5IS8mJaSDzNi20CeDaossF7AONxvkwNQnZCunulKYElAo133CzmYW~VeNY4WiGIAdMo-pHrAPdXLKSJ9k56scwyeUVy6gVXPe6ePXg3UnqsojH6T43JeQL2qB0O-vU~Fgmbf60Ybt-lz-DzJe21vr2RXgC8Hmb0M8n53D5~gIndUD7CSa~Cjcakv5Cduw__"
                  }
                />
              </div>
              <p className="text-lg w-fit text-ellipsis font-bold ml-3 md:ml-0 text-primary p-0 md:hidden">
                {category.name}
              </p>
            </div>
            <div className="mt-4 md:mt-0 w-full pr-2">
              <Description description={category?.description} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Header;
