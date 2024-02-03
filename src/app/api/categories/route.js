import { Category } from "@/app/models/category"
import { connectToDb } from "@/libs/connect"


connectToDb()

export const POST = async (req) => {
 const { name } = await req.json()
 const categoryDoc = await Category.create({ name })
 return Response.json(categoryDoc)
}

export const GET = async () => {
 return Response.json(
  await Category.find()
 )
}

export const PUT = async (req) => {
 const { _id, name } = await req.json()
 await Category.updateOne({ _id }, { name })
 return Response.json(true)
}

export const DELETE = async (req) => {
 const url = new URL(req.url)
 const _id = url.searchParams.get("_id")
 await Category.deleteOne({ _id })
 return Response.json(true)
}


