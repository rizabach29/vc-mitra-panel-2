import { IBanner } from "@/types/utils";
import Carousel from "./carousel";
import { GetCredHeader } from "@/app/api/api-utils";

async function getData() {
  var credentialHeader = GetCredHeader();

  var re = await fetch(`${process.env.NEXT_API_URL}/v2/panel/banner/list`, {
    headers: {
      "Content-Type": "application/json",
      "X-Sign": credentialHeader.sign,
      "X-User-Id": credentialHeader.mitraid,
      "X-Timestamp": credentialHeader.timestamp.toString(),
    },
    next: {
      revalidate: 120,
    },
  });

  var result = await re.json();

  return result.data;
}

const CarouselWrapper = async ({ name }: { name: string }) => {
  var banners: IBanner[] = await getData();

  if (banners && banners.length > 0) {
    return <Carousel data={banners} name={name} />;
  }
};

export default CarouselWrapper;
