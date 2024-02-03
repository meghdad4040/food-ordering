import mongoose from "mongoose";

export const connectToDb = async () => {
 try {
  await mongoose.connect(process.env.MONGO_DB);
  console.log("connect to mongo db");
 } catch (err) {
  throw new Error(err.message);
 }
};

mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));
