import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    phone: { type: String },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true },
);

export const User = models?.User || mongoose.model("User", userSchema);
