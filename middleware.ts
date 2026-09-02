import { NextRequest, NextResponse } from "next/server";

const COUNTRY_LOCALES: Record<string, string> = {
  CN: "zh",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es", EC: "es", GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es", SV: "es", NI: "es", CR: "es", PA: "es", UY: "es",
  BR: "pt", PT: "pt",
  JP: "ja",
};

export function middleware(request: NextRequest) {
  const manual = request.cookies.get("pictogo_lang_source")?.value === "manual";
  const saved = request.cookies.get("pictogo_lang")?.value;
  const country = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry") || "";
  const language = manual && saved && ["zh", "en", "es", "pt", "ja"].includes(saved) ? saved : COUNTRY_LOCALES[country.toUpperCase()] || "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pictogo-locale", language);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  // A manual choice is the only preference that survives future geo checks.
  // Vercel supplies x-vercel-ip-country; local development usually has no country header.
  if (manual) return response;
  const cookie = { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" as const };
  response.cookies.set("pictogo_lang", language, cookie);
  response.cookies.set("pictogo_lang_source", "geo", cookie);
  return response;
}

export const config = { matcher: ["/((?!_next|favicon.ico).*)"] };
