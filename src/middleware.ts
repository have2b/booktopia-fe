// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "./lib/utils";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const roles : Array<string>| undefined | null = req.nextauth.token?.roles as Array<string>;
    if (req.nextUrl.pathname.startsWith("/admin") && !isAdmin(roles))
      return NextResponse.rewrite(
        new URL("/auth/login?message=You Are Not Authorized!", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [ "/admin/:path*"],
};