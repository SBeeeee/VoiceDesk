import mongoose, { Schema, Document, Types } from "mongoose";

/* -----------------------------
   Call Log Interface
------------------------------ */

export interface ICallLog extends Document {
  shop: Types.ObjectId;
  assistantId?: string;
  callId?: string;
  duration?: number;
  transcript?: string;
  summary?: string;
  leadCaptured: boolean;
  orderPlaced: boolean;
}

/* -----------------------------
   Call Log Schema
------------------------------ */

const callLogSchema = new Schema<ICallLog>(
  {
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },

    assistantId: String,
    callId: String,

    duration: Number,

    transcript: String,
    summary: String,

    leadCaptured: {
      type: Boolean,
      default: false
    },

    orderPlaced: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.models.CallLog ||
  mongoose.model<ICallLog>("CallLog", callLogSchema);