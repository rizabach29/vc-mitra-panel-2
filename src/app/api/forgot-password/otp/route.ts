import { GetAuthHeader } from "@/app/api/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  var response = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/member/verify-otp`,
    {
      method: "POST",
      headers: GetAuthHeader(req),
      body: JSON.stringify(await req.json()),
    }
  );

  var result = await response.json();
  return NextResponse.json(result, { status: response.status });
}
