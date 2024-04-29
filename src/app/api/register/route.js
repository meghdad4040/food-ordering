import { NextResponse } from "next/server";
import { User } from "../../models/user";
import { connectToDb } from "@/libs/connect";
const bcrypt = require('bcryptjs');


export const POST = async req => {

 connectToDb()
 try {
  const body = await req.json();
  const email = body.email;
  const ifUserExists = await User.findOne({ email })
  if (ifUserExists) {
   console.log("user already exists")
   return NextResponse.json(
    { error: "user already exists" },
    { status: 400 }
   )
  }


  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
   new Error("password must be at least 5 characters");
   return false;
  }
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);
  return Response.json(createdUser);
 }
 catch (error) {
  console.log(error)
 }
}
