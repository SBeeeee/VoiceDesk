import express from "express";
import { verifyUser } from "../middlewares/auth.middlewares.js";
import { getShopStats } from "../controllers/analytics.controllers.js";

const router = express.Router();

router.get("/", verifyUser, getShopStats);

export default router;
