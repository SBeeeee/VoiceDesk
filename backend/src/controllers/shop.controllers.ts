import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middlewares.js";
import { createShopService, getMyShopService, getShopBySlugService, updateShopService, deleteShopService } from "../services/shop.services.js";

export const createShop = async (req: AuthRequest, res: Response) => {
  try {
    const ownerId = req.userId;
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const shop = await createShopService(ownerId, req.body);
    res.status(201).json({ success: true, data: shop });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getMyShop = async (req: AuthRequest, res: Response) => {
  try {
    const ownerId = req.userId;
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const shop = await getMyShopService(ownerId);
    res.json({ success: true, data: shop });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const getShopBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const shop = await getShopBySlugService(slug as string);
    res.json({ success: true, data: shop });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateShop = async (req: AuthRequest, res: Response) => {
  try {
    const ownerId = req.userId;
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const shop = await updateShopService(ownerId, req.body);
    res.json({ success: true, data: shop });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteShop = async (req: AuthRequest, res: Response) => {
  try {
    const ownerId = req.userId;
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await deleteShopService(ownerId);
    res.json({ success: true, message: "Shop deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
