import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middlewares.js";
import { getOrdersService, getOrderByIdService, updateOrderStatusService } from "../services/order.services.js";

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const { status } = req.query;
    const orders = await getOrdersService(shop._id.toString(), status as string);
    res.json({ success: true, orders: orders });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const { orderId } = req.params;
    const order = await getOrderByIdService(shop._id.toString(), orderId as string);
    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const { orderId } = req.params;
    const { status } = req.body;

    const order = await updateOrderStatusService(shop._id.toString(), orderId as string, status);
    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
