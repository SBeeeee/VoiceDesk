import express from "express";
import { verifyUser } from "../middlewares/auth.middlewares.js";
import { verifyShopOwner } from "../middlewares/shop.middlewares.js";
import { addInventoryItem, getInventory, getLowStock, updateInventoryItem, deleteInventoryItem, restockInventoryItem } from "../controllers/inventory.controllers.js";

const router = express.Router();

// All inventory routes require both authentication and shop ownership verification
router.post("/", verifyUser, verifyShopOwner, addInventoryItem);
router.get("/", verifyUser, verifyShopOwner, getInventory);
router.get("/low-stock", verifyUser, verifyShopOwner, getLowStock);
router.patch("/:itemId/restock", verifyUser, verifyShopOwner, restockInventoryItem);
router.patch("/:itemId", verifyUser, verifyShopOwner, updateInventoryItem);
router.delete("/:itemId", verifyUser, verifyShopOwner, deleteInventoryItem);

export default router;

