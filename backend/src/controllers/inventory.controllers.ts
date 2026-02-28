import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middlewares.js";
import { addInventoryItemService, getInventoryService, getLowStockService, updateInventoryItemService, deleteInventoryItemService, restockInventoryItemService } from "../services/inventory.services.js";

export const addInventoryItem = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const item = await addInventoryItemService(shop._id.toString(), req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getInventory = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const items = await getInventoryService(shop._id.toString());
    res.json({ success: true, items: items });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getLowStock = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const items = await getLowStockService(shop._id.toString());
    res.json({ success: true, items: items });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateInventoryItem = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const { itemId } = req.params;
    const item = await updateInventoryItemService(shop._id.toString(), itemId as string, req.body);
    res.json({ success: true, data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteInventoryItem = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const { itemId } = req.params;
    await deleteInventoryItemService(shop._id.toString(), itemId as string);
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const restockInventoryItem = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const { itemId } = req.params;
    const { amount } = req.body;
    const item = await restockInventoryItemService(shop._id.toString(), itemId as string, Number(amount));
    res.json({ success: true, data: item });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

