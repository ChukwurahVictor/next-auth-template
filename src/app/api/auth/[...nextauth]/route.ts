import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Account, User as AuthUser } from "next-auth";
import axios from "axios";
import urls from "@/services/urls";
import { JWT } from "next-auth/jwt";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials) return null;
        try {
          const response = await axios.post(urls.loginUrl, {
            email: credentials.email,
            password: credentials.password,
          });

          const { user } = response.data.data;
          console.log("response", response);
          console.log("user", user);

          if (user) {
            return {
              ...user,
              accessToken: response.data?.data?.token,
              message: response.data?.message,
            };
          } else {
            return null;
          }
        } catch (err: any) {
          console.log(err);
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.accessToken = token.accessToken;

      const expiresIn = 1 * 24 * 60 * 60;
      session.expires = new Date(Date.now() + expiresIn * 1000).toISOString();

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
