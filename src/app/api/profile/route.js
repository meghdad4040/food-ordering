import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/user";
import { connectToDb } from "@/libs/connect";


connectToDb()

export const PUT = async req => {
  const data = await req.json();
  const { _id } = data
  if (_id) {
    await User.updateOne({ _id }, data);
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    await User.updateOne({ email }, data);
  }
  return Response.json(data);
};

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  return Response.json(
    await User.findOne({ email })
  )
}