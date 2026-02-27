import mongoose, { Schema, Document, Types } from "mongoose";

/* -----------------------------
   Order Item Interface
------------------------------ */

export interface IOrderItem {
  item: Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
}

/* -----------------------------
   Order Interface
------------------------------ */

export interface IOrder extends Document {
  shop: Types.ObjectId;
  customerName: string;
  customerPhone: string;
  items: IOrderItem[];
  totalAmount?: number;
  status: "PLACED" | "CONFIRMED" | "COMPLETED";
  source: "VOICE_AGENT";
}

/* -----------------------------
   Order Item Schema
------------------------------ */

const orderItemSchema = new Schema<IOrderItem>(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "InventoryItem"
    },
    quantity: { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true }
  },
  { _id: false }
);

/* -----------------------------
   Order Schema
------------------------------ */

const orderSchema = new Schema<IOrder>(
  {
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },

    customerName: {
      type: String,
      required: true
    },

    customerPhone: {
      type: String,
      required: true
    },

    items: [orderItemSchema],

    totalAmount: Number,

    status: {
      type: String,
      enum: ["PLACED", "CONFIRMED", "COMPLETED"],
      default: "PLACED"
    },

    source: {
      type: String,
      enum: ["VOICE_AGENT"],
      default: "VOICE_AGENT"
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", orderSchema);