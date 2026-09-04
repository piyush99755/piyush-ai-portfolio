import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  if (host.toLowerCase().startsWith("www.piyushtadvi.co.uk")) {
    const url = request.nextUrl.clone();
    url.hostname = "piyushtadvi.co.uk";
    url.port = "";
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
