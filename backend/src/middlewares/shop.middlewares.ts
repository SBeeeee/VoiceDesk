import { Response, NextFunction } from "express";
import Shop from "../models/shop.models.js";
import { AuthRequest } from "./auth.middlewares.js";

/* -----------------------------
   Verify Shop Owner Middleware
------------------------------ */
export const verifyShopOwner = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const ownerId = req.userId;
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const shop = await Shop.findOne({ owner: ownerId });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Attach shop to request for use in controllers
    req.shop = shop;
    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/* -----------------------------
   Service-level helper (for internal use)
------------------------------ */
export const verifyShopOwnerService = async (ownerId: string) => {
  const shop = await Shop.findOne({ owner: ownerId });
  if (!shop) throw new Error("Shop not found");
  return shop;
};
