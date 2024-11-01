// app/middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";

const locales = ["en", "ar"];

// Create the next-intl middleware
export const i18nMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
});

// Function to generate protected routes
const createProtectedRoutes = () => {
  const routes = {};
  locales.forEach((locale) => {
    routes[`/${locale}/dashboard`] = ["admin", "user"];
    routes[`/${locale}/transaction`] = ["admin", "user"];
  });
  return routes;
};

export async function middleware(req) {
  // Handle locale with next-intl middleware first
  const response = await i18nMiddleware(req);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Generate the protected routes
  const protectedRoutes = createProtectedRoutes();

  const { pathname } = req.nextUrl;

  // Check if the requested path is protected
  const matchedRoute = Object.keys(protectedRoutes).find((path) =>
    pathname.startsWith(path)
  );
  // Authentication and authorization checks
  if (matchedRoute) {
    // If the user is not authenticated, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // Check if the user's role is allowed
    const userRole = token?.userData?.role; // Adjust based on how you store user roles in the token
    console.log(
      "Middleware hit:",
      protectedRoutes,
      protectedRoutes[matchedRoute],
      userRole,
      req.url
    );
    if (!protectedRoutes[matchedRoute].includes(userRole)) {
      // Redirect to 403 if access is denied
      return NextResponse.redirect(new URL("/unauthorize", req.url));
    }
  }
  if (response) return response;
  console.log("Middleware hit:", req.url);
  return NextResponse.next();
}

// Specify the paths that the middleware applies to
export const config = {
  matcher: [
    "/(ar|en)/:path*", // Matches all routes under /ar and /en
    "/dashboard",
    // Apply locale handling to all other routes
    "/((?!_next).*)",
  ],
};
