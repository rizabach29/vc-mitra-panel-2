import { GetAuthHeader } from "@/app/api/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
  { params }: { params: { slug: string } }
) {
    const { slug } = params;
    const url = new URL(req.url as string);

    const strUrl = `${process.env.API}/product/${slug}?${url.searchParams}`;

    var re = await fetch(strUrl,{
        next: {
          revalidate: 30,
        },
        headers: GetAuthHeader(req),
      });
    var result = await re.json();
    console.log("RES API: ", result)
    return NextResponse.json(result, { status: 200 });

}
