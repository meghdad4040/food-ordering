import { User } from "@/app/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";
import { connectToDb } from "@/libs/connect";

export const authOptions = {
 secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
 adapter: MongoDBAdapter(clientPromise),
 providers: [
  GithubProvider({
   clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
   clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
  }),
  GoogleProvider({
   clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
   clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
   authorization: {
    params: {
     prompt: "consent",
     access_type: "offline",
     response_type: "code",
    },
   },
  }),
  CredentialsProvider({
   name: "Credentials",
   id: "Credentials",
   credentials: {
    email: { label: "Email", type: "email", placeholder: "test@example.com" },
    password: { label: "Password", type: "password" },
   },
   async authorize(credentials) {
    try {
     const email = credentials?.email;
     const password = credentials?.password;
     connectToDb()
     const user = await User.findOne({ email });
     const passwordOk = user && bcrypt.compareSync(password, user.password);
     if (passwordOk) {
      return user;
     } else {
      return console.log("password is incorrect")
     }
    } catch (error) {
     return null;
    }
   },
  }),
 ],
 session: {
  strategy: "jwt",
 },
 callbacks: {
  async signIn({ user, account }) {
   if (account.provider === "google") {
    try {
     const { name, email } = user
     await connectToDb()
     const ifUserExists = await User.findOne({ email })
     if (ifUserExists) {
      return user
     }
     const newUser = new User({
      name: name,
      email: email
     })
     const res = await newUser.save()
     if (res.status === 200 || res.status === 201) {
      return user
     }
    } catch (error) {
     console.log(error)
    }
   }
   return user
  },
  async jwt({ token, user }) {
   if (user?._id) token._id = user._id;
   if (user?.isAdmin) token.isAdmin = user.isAdmin;
   return token;
  },
  async session({ session, token }) {
   if (token?._id) session.user._id = token._id;
   if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
   return session;
  },
 },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
