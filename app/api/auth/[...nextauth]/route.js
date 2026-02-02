import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { scryptSync, timingSafeEqual } from "crypto";
import { connectDB } from "@/services/connection";
import { User } from "@/services/models/users";

const verifyPassword = (password, storedValue) => {
  const [salt, storedHash] = String(storedValue || "").split(":");
  if (!salt || !storedHash) return false;
  const computedHash = scryptSync(password, salt, 64);
  const storedBuffer = Buffer.from(storedHash, "hex");
  return (
    storedBuffer.length === computedHash.length &&
    timingSafeEqual(storedBuffer, computedHash)
  );
};

const handler = NextAuth({
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "").toLowerCase().trim();
        const password = String(credentials?.password || "");
        if (!email || !password) return null;

        await connectDB();
        const user = await User.findOne({ email }).lean();
        if (!user) return null;

        const isValid = verifyPassword(password, user.password);
        if (!isValid) return null;

        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
          userType: user.userType,
          shopName: user.shopName || ""
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType;
        token.shopName = user.shopName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.userType = token.userType;
        session.user.shopName = token.shopName;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
