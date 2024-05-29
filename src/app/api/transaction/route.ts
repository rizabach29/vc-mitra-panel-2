import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../api-utils";

export async function GET(req: NextRequest) {
  const url = new URL(req.url as string);
  let qParams = url.searchParams;
  qParams.append("limit", "10");

  var re = await fetch(`${process.env.API}/transaction/list?` + qParams, {
    headers: GetAuthHeader(req),
    cache: "no-store",
    // next: {
    //   revalidate: 30,
    // },
  });
  var result = await re.json();
  return NextResponse.json(result, { status: re.status });
}