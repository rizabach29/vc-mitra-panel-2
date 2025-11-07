import { GetAuthHeader } from "@/app/api/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const url = new URL(req.url as string);
  let qParams = url.searchParams;

  var re = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/review-list/${params.slug}?` +
      qParams,
    {
      next: {
        revalidate: 30,
      },
      headers: GetAuthHeader(req),
    }
  );
  var result = await re.json();

  return NextResponse.json(result, { status: re.status });
}
