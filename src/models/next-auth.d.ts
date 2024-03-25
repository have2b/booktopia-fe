import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      roles: string[];
      accessToken: string;
    };
  }
}
