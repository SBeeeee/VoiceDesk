import mongoose, { Schema, Document, Types } from "mongoose";

/* -----------------------------
   Service Subdocument Interface
------------------------------ */

export interface IService {
  name: string;
  price: number;
  duration?: string;
  shortDescription?: string;
}

/* -----------------------------
   Business Hours Interface
------------------------------ */

export interface IBusinessHours {
  open?: string;
  close?: string;
  days?: string[];
}

/* -----------------------------
   Main Shop Interface
------------------------------ */

export interface IShop extends Document {
  owner: Types.ObjectId;
  name: string;
  slug: string;
  category?: string;
  subtitle?: string;
  description?: string;
  phone?: string;
  address?: string;
  services: IService[];
  businessHours?: IBusinessHours;
  vapiAssistantId?: string;
  voicePrompt?: string;
  isActive: boolean;
  subscriptionPlan: "FREE" | "PRO";
}

/* -----------------------------
   Service Schema
------------------------------ */

const serviceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String },
    shortDescription: { type: String }
  },
  { _id: false }
);

/* -----------------------------
   Shop Schema
------------------------------ */

const shopSchema = new Schema<IShop>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      unique: true
    },

    category: String,
    subtitle: String,
    description: String,

    phone: String,
    address: String,

    services: [serviceSchema],

    businessHours: {
      open: String,
      close: String,
      days: [String]
    },

    // 🔥 Vapi Integration
    vapiAssistantId: String,
    voicePrompt: String,

    isActive: {
      type: Boolean,
      default: true
    },

    subscriptionPlan: {
      type: String,
      enum: ["FREE", "PRO"],
      default: "FREE"
    }
  },
  { timestamps: true }
);

/* -----------------------------
   Export Model
------------------------------ */

export default mongoose.models.Shop ||
  mongoose.model<IShop>("Shop", shopSchema);