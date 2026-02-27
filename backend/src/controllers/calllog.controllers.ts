import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middlewares.js";
import { getCallLogsService, getCallLogByIdService } from "../services/calllog.services.js";

export const getCallLogs = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const logs = await getCallLogsService(shop._id.toString());
    res.json({ success: true, data: logs });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCallLogById = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop;
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const { logId } = req.params;
    const log = await getCallLogByIdService(shop._id.toString(), logId as string);
    res.json({ success: true, data: log });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};
