import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "shopkeeper";
  store?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true,unique:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true ,select:false},
    role: { type: String, enum: ["user", "shopkeeper"], default: "user" },
    store: { type: Schema.Types.ObjectId, ref: "Store" },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);

  