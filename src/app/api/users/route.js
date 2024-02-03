import { User } from "@/app/models/user"
import { connectToDb } from "@/libs/connect"

export const GET = async () => {
 connectToDb()
 const users = await User.find()
 return Response.json(users)
}