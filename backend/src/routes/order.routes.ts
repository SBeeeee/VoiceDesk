import express from "express";
import { verifyUser } from "../middlewares/auth.middlewares.js";
import { verifyShopOwner } from "../middlewares/shop.middlewares.js";
import { getOrders, getOrderById, updateOrderStatus } from "../controllers/order.controllers.js";

const router = express.Router();

// All order routes require both authentication and shop ownership verification
router.get("/", verifyUser, verifyShopOwner, getOrders);
router.get("/:orderId", verifyUser, verifyShopOwner, getOrderById);
router.patch("/:orderId/status", verifyUser, verifyShopOwner, updateOrderStatus);

export default router;
