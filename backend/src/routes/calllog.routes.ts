import express from "express";
import { verifyUser } from "../middlewares/auth.middlewares.js";
import { verifyShopOwner } from "../middlewares/shop.middlewares.js";
import { getCallLogs, getCallLogById } from "../controllers/calllog.controllers.js";

const router = express.Router();

// All call log routes require both authentication and shop ownership verification
router.get("/", verifyUser, verifyShopOwner, getCallLogs);
router.get("/:logId", verifyUser, verifyShopOwner, getCallLogById);

export default router;
