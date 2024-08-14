import CardProduct from "../../flash-sale/flash-sale-card";
import { IFlashSaleInfo } from "@/types/flash-sale";
import Link from "next/link";
import CountdownCard from "../countdown-card";
import { parseISO } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function FlashSale({ data }: { data: IFlashSaleInfo }) {
  if (data)
    return (
      <div className="relative flex justify-center md:p-4 my-4 md:my-0">
        <div className="max-w-6xl p-0 w-full bg-primary md:rounded-xl overflow-clip">
          <div className="bg-gradient-to-br from-white/90 to-white/30 backdrop-blur pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center py-1 pr-1 rounded-tl-lg rounded-br-lg mt-2">
                <p className="px-2 ml-2 italic font-semibold flex">
                  <span className="mr-3">
                    <Image
                      src={"/assets/illustration/lightning.gif"}
                      alt="flash"
                      width={20}
                      height={20}
                    />
                  </span>
                  {data.name}
                </p>{" "}
                <div className="flex gap-1 ml-2 items-center">
                  <p className="text-xs font-medium text-muted-foreground">
                    Berakhir dalam
                  </p>
                  <CountdownCard date={parseISO(data.expired_at)} />
                </div>
              </div>
            </div>
            <div className="flex items-center relative py-1">
              <Carousel className="py-1 w-full">
                <CarouselContent className="mx-0.5">
                  {data?.products?.slice(0, 8).map((item, idx) => (
                    <CarouselItem
                      className="h-full w-full min-w-[9.5rem] max-w-[11.5rem]"
                      key={`${idx}`}
                    >
                      <CardProduct data={item} />
                    </CarouselItem>
                  ))}
                  {data.products.length > 8 && (
                    <Link href="/flash-sale" className="cursor-pointer">
                      <CarouselItem className="h-full w-full min-w-[9.5rem] max-w-[11.5rem]">
                        <div
                          className={`min-h-[6rem] bg-cover h-full hover:bg-zinc-50 rounded-lg border-0 flex`}
                          style={{
                            backgroundImage: 'url("/assets/thunder.svg")',
                          }}
                        >
                          <div className="bg-white/10 flex items-center justify-center rounded-lg w-full">
                            <p className="text-sm text-white font-medium">
                              See More
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    </Link>
                  )}
                </CarouselContent>
                <CarouselPrevious className="ml-14 bg-background" />
                <CarouselNext className="mr-14 bg-background" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FlashSale;