import mongoose, { Schema, Document, Types } from "mongoose";

/* -----------------------------
   Inventory Interface
------------------------------ */

export interface IInventoryItem extends Document {
  shop: Types.ObjectId;
  name: string;
  sku?: string;
  price: number;
  quantity: number;
  lowStockThreshold: number;
  isActive: boolean;
}

/* -----------------------------
   Inventory Schema
------------------------------ */

const inventoryItemSchema = new Schema<IInventoryItem>(
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

    sku: String,

    price: {
      type: Number,
      required: true
    },

    quantity: {
      type: Number,
      default: 0
    },

    lowStockThreshold: {
      type: Number,
      default: 5
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.InventoryItem ||
  mongoose.model<IInventoryItem>("InventoryItem", inventoryItemSchema);