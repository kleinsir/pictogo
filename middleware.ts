import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (!request.cookies.has("pictogo_lang")) {
    // Vercel supplies x-vercel-ip-country; Cloudflare supplies cf-ipcountry.
    // CN defaults to Chinese, every other country defaults to English.
    const country = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry");
    const language = country === "CN" ? "zh" : "en";
    response.cookies.set("pictogo_lang", language, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  }
  return response;
}

export const config = { matcher: ["/((?!_next|favicon.ico).*)"] };
