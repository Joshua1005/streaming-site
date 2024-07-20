import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";
import { AUTH_ROUTES } from "@/constants";

const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export default middleware((req) => {
  const {
    auth,
    headers,
    url,
    nextUrl: { pathname },
  } = req;

  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  /**
   * Why declare the function here? So we can create a closure around the request object.
   * @param to Where should the page redirected into, the function will handle the rest. Such as preventing the redirect if the current url and param is the same.
   */
  const redirect = (to: string) =>
    pathname !== to
      ? NextResponse.redirect(new URL(to, url))
      : NextResponse.next();

  /**
   * If not authenticated yet, redirect into signin page.
   * Don't prevent the user to go into AUTH_ROUTES.
   */
  if (!auth)
    return isAuthRoute ? NextResponse.next() : redirect(AUTH_ROUTES[0]);

  /**
   * If authenticated prevent the page to load into AUTH_ROUTES.
   * Redirect into previous page or home page.
   */
  if (isAuthRoute) {
    const referer = headers.get("referer") || "/";

    return redirect(referer);
  }

  return NextResponse.next();
});
