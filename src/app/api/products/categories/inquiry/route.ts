import { GetAuthHeader } from "@/app/api/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  var re = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/transaction/inquiry`,
    {
      method: "POST",
      headers: GetAuthHeader(req),
      body: JSON.stringify(await req.json()),
    }
  );
  var result = await re.json();

  return NextResponse.json(result, { status: re.status });
}
