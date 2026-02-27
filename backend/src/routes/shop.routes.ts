import express from "express";
import { verifyUser } from "../middlewares/auth.middlewares.js";
import { createShop, getMyShop, getShopBySlug, updateShop, deleteShop } from "../controllers/shop.controllers.js";

const router = express.Router();

// Public routes
router.get("/slug/:slug", getShopBySlug);

// Protected routes (require authentication)
router.post("/", verifyUser, createShop);
router.get("/my", verifyUser, getMyShop);
router.put("/", verifyUser, updateShop);
router.delete("/", verifyUser, deleteShop);

export default router;
