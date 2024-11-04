// app/middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";

const locales = ["en", "ar"];

export const i18nMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
});

const createProtectedRoutes = () => {
  const routes = {};
  locales.forEach((locale) => {
    routes[`/${locale}/dashboard`] = ["admin", "user"];
    routes[`/${locale}/transaction`] = ["admin", "user"];
  });
  return routes;
};

export async function middleware(req) {
  const response = await i18nMiddleware(req);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedRoutes = createProtectedRoutes();

  const { pathname } = req.nextUrl;

  const matchedRoute = Object.keys(protectedRoutes).find((path) =>
    pathname.startsWith(path)
  );
  if (matchedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    const userRole = token?.userData?.role;
    console.log(
      "Middleware hit:",
      protectedRoutes,
      protectedRoutes[matchedRoute],
      userRole,
      req.url
    );
    if (!protectedRoutes[matchedRoute].includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorize", req.url));
    }
  }
  if (response) return response;
  console.log("Middleware hit:", req.url);
  return NextResponse.next();
}

export const config = {
  matcher: ["/(ar|en)/:path*", "/dashboard", "/((?!_next).*)"],
};
