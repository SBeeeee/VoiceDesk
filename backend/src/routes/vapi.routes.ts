import express from "express";
import { handleVapiWebhook, handleVapiTool } from "../controllers/vapi.controllers.js";

const router = express.Router();

// Vapi calls this after every call ends (no auth — Vapi server calls this)
router.post("/webhook/vapi", handleVapiWebhook);

// Vapi calls this during live calls for tool use (no auth — Vapi server calls this)
router.post("/vapi/tools", handleVapiTool);

export default router;