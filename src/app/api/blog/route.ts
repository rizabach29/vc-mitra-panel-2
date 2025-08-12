import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../api-utils";

export async function GET(req: NextRequest) {
  var re = await fetch(`${process.env.NEXT_API_URL}/v2/panel/blog/list`, {
    headers: GetAuthHeader(req),
    next: {
      revalidate: 120,
    },
  });

  var result = await re.json();

  return NextResponse.json(result.data, { status: 200 });
}
