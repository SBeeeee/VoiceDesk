import Shop from "../models/shop.models.js";
import Order from "../models/Order.models.js";
import InventoryItem from "../models/Inventory.models.js";
import Lead from "../models/leads.models.js";
import CallLog from "../models/CallLog.models.js";

export const getShopStatsService = async (ownerId: string) => {
    const shop = await Shop.findOne({ owner: ownerId });
    if (!shop) throw new Error("Shop not found");

    const [totalOrders, totalInventory, totalLeads, totalCalls, lowStockCount] = await Promise.all([
        Order.countDocuments({ shop: shop._id }),
        InventoryItem.countDocuments({ shop: shop._id }),
        Lead.countDocuments({ shop: shop._id }),
        CallLog.countDocuments({ shop: shop._id }),
        InventoryItem.countDocuments({
            shop: shop._id,
            $expr: { $lte: ["$quantity", "$lowStockThreshold"] }
        }),
    ]);

    return {
        totalOrders,
        totalInventory,
        totalLeads,
        totalCalls,
        lowStockCount,
    };
};
