import { MenuItem } from "@/app/models/menuItems"
import { connectToDb } from "@/libs/connect"


connectToDb()

export const POST = async (req) => {
 const data = await req.json()
 const menuItemDoc = await MenuItem.create(data)
 return Response.json(menuItemDoc)
}

export const PUT = async (req) => {
 const { _id, ...data } = await req.json()
 await MenuItem.findByIdAndUpdate(_id, data)
 return Response.json(true)
}

export const GET = async () => {
 return Response.json(
  await MenuItem.find()
 )
}

export const DELETE = async (req) => {
 const { _id } = await req.json()
 await MenuItem.findByIdAndDelete(_id)
 return Response.json(true)
}