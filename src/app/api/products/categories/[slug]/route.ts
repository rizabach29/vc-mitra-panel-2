import { GetAuthHeader } from "@/app/api/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  var re = await fetch(`${process.env.API}/category/${slug}`, {
    next: {
      revalidate: 30,
    },
    headers: GetAuthHeader(req),
  });
  var result = await re.json();

  return NextResponse.json(result, { status: re.status });
}
