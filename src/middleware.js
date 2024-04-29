import { getToken } from 'next-auth/jwt';
import { NextResponse } from "next/server";



export const middleware = async (req) => {

 const path = req.nextUrl.pathname
 const token = await getToken({
  req: req,
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET
 })

 const publicPaths = path === "/" || path === "/login"

 if (!publicPaths && !token) {
  return NextResponse.redirect(new URL("/login", req.nextUrl))
 }
}

export const config = {
 matcher: ["/profile", "/users", "/menu-items/:path*", "/categories"]
}

