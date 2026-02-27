import mongoose, { Schema, Document, Types } from "mongoose";

/* -----------------------------
   Lead Interface
------------------------------ */

export interface ILead extends Document {
  shop: Types.ObjectId;
  name: string;
  phone: string;
  note?: string;
  source: "VOICE_AGENT" | "LANDING_PAGE";
  status: "NEW" | "CONTACTED" | "CONVERTED";
}

/* -----------------------------
   Lead Schema
------------------------------ */

const leadSchema = new Schema<ILead>(
  {
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    note: String,

    source: {
      type: String,
      enum: ["VOICE_AGENT", "LANDING_PAGE"],
      default: "VOICE_AGENT"
    },

    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "CONVERTED"],
      default: "NEW"
    }
  },
  { timestamps: true }
);

export default mongoose.models.Lead ||
  mongoose.model<ILead>("Lead", leadSchema);