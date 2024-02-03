import { User } from "../../models/user";
import { connectToDb } from "@/libs/connect";
const bcrypt = require('bcryptjs');


export const POST = async req => {
  const body = await req.json();
  connectToDb()
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
};
