import type { NextAuthConfig } from "next-auth";

// Lightweight config for Edge middleware — no Prisma, no DB calls.
// Full config (with PrismaAdapter + providers) lives in lib/auth.ts.
export const authConfig = {
  pages: { signIn: "/auth/login", error: "/auth/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = (auth?.user as { role?: string } | undefined)?.role === "ADMIN";
      const { pathname } = nextUrl;

      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return Response.redirect(new URL(`/auth/login?callbackUrl=/admin`, nextUrl));
        if (!isAdmin) return Response.redirect(new URL("/dashboard", nextUrl));
        return true;
      }

      if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) return Response.redirect(new URL(`/auth/login?callbackUrl=${pathname}`, nextUrl));
        return true;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
