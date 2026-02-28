// types/shop.types.ts
export interface IService {
  name: string;
  price: number;
  duration?: string;
  shortDescription?: string;
}

export interface IBusinessHours {
  open?: string;
  close?: string;
  days?: string[];
}

export interface IShop {
  _id: string;
  owner: string;
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
  createdAt: string;
}