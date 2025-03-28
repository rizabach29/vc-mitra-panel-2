import type { NextAuthOptions, RequestInternal, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { GetCredHeader } from "../../api-utils";
import { signOut } from "next-auth/react";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"phone" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ) {
        var credentialHeader = GetCredHeader();

        const response = await fetch(
          `${process.env.NEXT_API_URL}/v2/panel/member/login`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "X-Sign": credentialHeader.sign,
              "X-User-Id": credentialHeader.mitraid,
              "X-Timestamp": credentialHeader.timestamp.toString(),
            },
            body: JSON.stringify({
              phone: credentials?.phone,
              password: credentials?.password,
            }),
          }
        );

        var res = await response.json();
        if (response.ok) return res.data;
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, session, trigger }) => {
      if (trigger === "update" && session) {
        // If so, the data passed to `update(data)` represents the session prop
        token = { ...user, ...(session as Session) };
      }

      if (user) {
        token.token = user.token;
        token.profile = user.profile;
      }
      return token;
    },
    session: async ({ session, token }) => {
      var credentialHeader = GetCredHeader();

      if (!process.env.NEXT_API_URL) {
        throw new Error("NEXT_API_URL is not set in environment variables");
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_API_URL}/v2/panel/member/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Sign": credentialHeader.sign,
              "X-User-Id": credentialHeader.mitraid,
              "X-Timestamp": String(credentialHeader.timestamp),
              Authorization: `Bearer ${token.token}`,
            },
          }
        );

        const res = await response.json();

        if (response.ok) {
          session.token = token.token;
          session.profile = res.data;
        } else {
          signOut();
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        signOut();
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
};
