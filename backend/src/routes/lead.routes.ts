import express from "express";
import { verifyUser } from "../middlewares/auth.middlewares.js";
import { verifyShopOwner } from "../middlewares/shop.middlewares.js";
import { getLeads, updateLeadStatus, deleteLead } from "../controllers/lead.controllers.js";

const router = express.Router();

// All lead routes require both authentication and shop ownership verification
router.get("/", verifyUser, verifyShopOwner, getLeads);
router.put("/:leadId/status", verifyUser, verifyShopOwner, updateLeadStatus);
router.delete("/:leadId", verifyUser, verifyShopOwner, deleteLead);

export default router;
