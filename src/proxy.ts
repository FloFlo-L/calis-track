// proxy.ts
import { getSessionCookie } from "better-auth/cookies";
import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
});

// Define protected routes that require authentication
const protectedRoutes = ["/dashboard"];

export function proxy(req: NextRequest) {
  // Apply i18n middleware first
  const i18nRes = I18nMiddleware(req); // returns NextResponse or undefined
  const res = i18nRes ?? NextResponse.next();

  const sessionCookie = getSessionCookie(req);
  const isLoggedIn = Boolean(sessionCookie);

  // Extract the locale if it is prefixed in the pathname (/en/... or /fr/...)
  const localeMatch = req.nextUrl.pathname.match(/^\/(en|fr)(?=\/|$)/);
  const locale = localeMatch ? localeMatch[1] : undefined;

  // Remove the locale prefix to compare with protected/auth routes
  const pathnameWithoutLocale =
    req.nextUrl.pathname.replace(/^\/(en|fr)(?=\/|$)/, "") || "/";

  const isOnProtectedRoute = protectedRoutes.some((p) =>
    pathnameWithoutLocale.startsWith(p)
  );
  const isOnAuthPage = pathnameWithoutLocale.startsWith("/auth");

  if (isOnProtectedRoute && !isLoggedIn) {
    const target = locale ? `/${locale}/auth/login` : "/auth/login";
    return NextResponse.redirect(new URL(target, req.url));
  }

  if (isOnAuthPage && isLoggedIn) {
    const target = locale ? `/${locale}/dashboard` : "/dashboard";
    return NextResponse.redirect(new URL(target, req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
