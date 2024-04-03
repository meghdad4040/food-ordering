import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";

export const middleware = (req) => {

 const session = useSession();
 const { status } = session;



 if (status === "unauthenticated") {
  console.log(status)
  return NextResponse.redirect(new URL("/login", req.url))
 }
}

export const config = {
 matcher: ["/profile", "/users", "/menu-items/:path*", "/categories"]
}


