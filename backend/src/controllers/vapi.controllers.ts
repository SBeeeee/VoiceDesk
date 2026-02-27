import { Request, Response } from "express";
import {
  handleVapiWebhookService,
  checkInventoryService,
  getServicesService,
  placeOrderService,
  captureLeadService,
} from "../services/vapi.services.js";

/* ─────────────────────────────────────────
   POST /api/webhook/vapi
   Vapi calls this after every call ends
───────────────────────────────────────── */

export const handleVapiWebhook = async (req: Request, res: Response) => {
  try {
    // Always respond 200 fast — Vapi expects quick acknowledgement
    res.status(200).json({ received: true });

    // Process in background
    await handleVapiWebhookService(req.body);
  } catch (error: any) {
    console.error("❌ Webhook error:", error.message);
  }
};

/* ─────────────────────────────────────────
   POST /api/vapi/tools
   Single unified endpoint for ALL Vapi tool calls
   Vapi sends: { toolName, parameters: { shopId, ... } }
───────────────────────────────────────── */

export const handleVapiTool = async (req: Request, res: Response) => {
  try {
    const { toolCallList } = req.body;

    if (!toolCallList || toolCallList.length === 0) {
      return res.status(400).json({ error: "No tool calls provided" });
    }

    const results = [];

    for (const toolCall of toolCallList) {
      const { name, parameters } = toolCall;
      const { shopId } = parameters;

      if (!shopId) {
        results.push({
          toolCallId: toolCall.id,
          result: "Missing shopId parameter.",
        });
        continue;
      }

      let result;

      switch (name) {
        case "checkInventory": {
          const data = await checkInventoryService(shopId, parameters.itemName);
          result = JSON.stringify(data);
          break;
        }

        case "getServices": {
          const data = await getServicesService(shopId);
          result = JSON.stringify(data);
          break;
        }

        case "placeOrder": {
          const { customerName, customerPhone, items } = parameters;
          if (!customerName || !customerPhone || !items) {
            result = "Missing required fields: customerName, customerPhone, or items.";
          } else {
            const data = await placeOrderService(shopId, customerName, customerPhone, items);
            result = JSON.stringify(data);
          }
          break;
        }

        case "captureLead": {
          const { name, phone, note } = parameters;
          if (!name || !phone) {
            result = "Missing required fields: name or phone.";
          } else {
            const data = await captureLeadService(shopId, name, phone, note);
            result = JSON.stringify(data);
          }
          break;
        }

        default:
          result = `Unknown tool: ${name}`;
      }

      results.push({
        toolCallId: toolCall.id,
        result,
      });
    }

    return res.status(200).json({ results });
  } catch (error: any) {
    console.error("❌ Vapi tool error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};