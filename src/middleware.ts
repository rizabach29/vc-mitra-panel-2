import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { GetCredHeader } from "./app/api/api-utils";
import { ISiteProfile } from "./types/utils";

export const config = {
  matcher: ["/((?!_next/static|assets|_next/image|favicon.ico).*)"],
};

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });

  if (req.nextUrl.pathname.startsWith("/api")) {
    var credentials = GetCredHeader();

    var res = NextResponse.next();
    res.headers.set("X-Sign", credentials.sign);
    res.headers.set("X-User-Id", credentials.mitraid);
    res.headers.set("X-Timestamp", credentials.timestamp.toString());
    res.headers.set("Authorization", `Bearer ${token?.token}`);

    return res;
  }

  if (req.nextUrl.pathname.includes("/auth") && token)
    return NextResponse.redirect(new URL("/", req.url));

  var res = NextResponse.next();
  var url = new URL(req.url);
  url.hostname = req.headers.get("host") ?? "";
  res.headers.set("x-url", url.href);

  var credentialHeader = GetCredHeader();
  var header = {
    "Content-Type": "application/json",
    "X-Sign": credentialHeader.sign,
    "X-User-Id": credentialHeader.mitraid,
    "X-Timestamp": credentialHeader.timestamp.toString(),
  };

  // fetch data
  const resProfile = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/site-profile`,
    {
      headers: header,
      next: {
        revalidate: 120,
      },
    }
  );

  if (resProfile.ok) {
    var data = await resProfile.json();
    var setting: ISiteProfile = data.data;
    res.headers.set("x-name", setting.name);
    res.headers.set("x-keywords", setting.keywords);
    res.headers.set("x-logo", setting.logo_url);
  }

  if (
    req.nextUrl.pathname.includes("/profile") ||
    req.nextUrl.pathname.includes("/saldo")
  ) {
    const authMiddleware = withAuth({
      pages: {
        signIn: `/auth/login`,
        newUser: "/auth/register",
      },
    });

    // @ts-expect-error
    return authMiddleware(req, event);
  }

  return res;
}
