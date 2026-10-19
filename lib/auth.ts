import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signinSchema } from "./validations";
import { verifyRecaptcha } from "./recaptcha";
import { ensureSeed, findUser, verifyPassword } from "./users";

/**
 * next-auth v5 (Auth.js). Google OAuth per STEP 7 plus a credentials provider so
 * the member area works before Google credentials exist.
 */

const googleConfigured = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET || "nazareth-hub-local-dev-secret-change-me",
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  providers: [
    ...(googleConfigured
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
        ]
      : []),
    Credentials({
      name: "Nazareth Hub account",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        recaptchaToken: { label: "reCAPTCHA token", type: "text" },
      },
      async authorize(credentials) {
        const parsed = signinSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
          recaptchaToken: credentials?.recaptchaToken,
        });
        if (!parsed.success) return null;

        // reCAPTCHA v3 on sign in, mirroring every other form (STEP 12).
        const captcha = await verifyRecaptcha(parsed.data.recaptchaToken, "v3");
        if (!captcha.ok) return null;

        await ensureSeed();
        const user = await findUser(parsed.data.email);
        if (!user || !verifyPassword(user, parsed.data.password)) return null;
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? token.sub;
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? token.sub ?? "";
        session.user.name = token.name ?? session.user.name;
        session.user.email = token.email ?? session.user.email;
      }
      return session;
    },
  },
});

export const googleEnabled = googleConfigured;
