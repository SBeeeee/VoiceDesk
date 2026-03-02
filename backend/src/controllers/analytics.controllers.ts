import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middlewares.js";
import { getShopStatsService } from "../services/analytics.services.js";

export const getShopStats = async (req: AuthRequest, res: Response) => {
    try {
        const ownerId = req.userId;
        if (!ownerId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const stats = await getShopStatsService(ownerId);
        res.json({ success: true, stats });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};
