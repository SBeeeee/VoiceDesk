import express from "express";
import { verifyUser } from "../middlewares/auth.middlewares.js";
import { verifyShopOwner } from "../middlewares/shop.middlewares.js";
import { addInventoryItem, getInventory, getLowStock, updateInventoryItem, deleteInventoryItem } from "../controllers/inventory.controllers.js";

const router = express.Router();

// All inventory routes require both authentication and shop ownership verification
router.post("/", verifyUser, verifyShopOwner, addInventoryItem);
router.get("/", verifyUser, verifyShopOwner, getInventory);
router.get("/low-stock", verifyUser, verifyShopOwner, getLowStock);
router.put("/:itemId", verifyUser, verifyShopOwner, updateInventoryItem);
router.delete("/:itemId", verifyUser, verifyShopOwner, deleteInventoryItem);

export default router;
