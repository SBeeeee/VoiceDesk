import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const VAPI_BASE_URL = "https://api.vapi.ai";

if (!process.env.VAPI_API_KEY) {
  throw new Error("VAPI_API_KEY not configured");
}

if (!process.env.BACKEND_URL) {
  throw new Error("BACKEND_URL not configured in .env");
}

export const vapiClient = axios.create({
  baseURL: VAPI_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

/* ─────────────────────────────────────────
   Tool definitions — Vapi will call these
   during live conversations
───────────────────────────────────────── */

const buildVapiTools = (shopId: string) => [
  {
    type: "function",
    function: {
      name: "checkInventory",
      description:
        "Check if a product/item is available in the shop's inventory. Use this when a customer asks about product availability or stock.",
      parameters: {
        type: "object",
        properties: {
          shopId: {
            type: "string",
            description: "The shop ID",
          },
          itemName: {
            type: "string",
            description: "The name of the item to check",
          },
        },
        required: ["shopId"],
      },
    },
    server: {
      url: `${process.env.BACKEND_URL}/api/vapi/tools`,
    },
    // Pre-fill shopId so Vapi always sends it
    async: false,
  },
  {
    type: "function",
    function: {
      name: "getServices",
      description:
        "Get all services offered by the shop including prices and duration. Use this when a customer asks about services, pricing, or timings.",
      parameters: {
        type: "object",
        properties: {
          shopId: {
            type: "string",
            description: "The shop ID",
          },
        },
        required: ["shopId"],
      },
    },
    server: {
      url: `${process.env.BACKEND_URL}/api/vapi/tools`,
    },
    async: false,
  },
  {
    type: "function",
    function: {
      name: "placeOrder",
      description:
        "Place an order for a customer who wants to buy products. Always confirm the order details with the customer before placing.",
      parameters: {
        type: "object",
        properties: {
          shopId: {
            type: "string",
            description: "The shop ID",
          },
          customerName: {
            type: "string",
            description: "Full name of the customer",
          },
          customerPhone: {
            type: "string",
            description: "Phone number of the customer",
          },
          items: {
            type: "array",
            description: "List of items to order",
            items: {
              type: "object",
              properties: {
                itemName: { type: "string" },
                quantity: { type: "number" },
              },
              required: ["itemName", "quantity"],
            },
          },
        },
        required: ["shopId", "customerName", "customerPhone", "items"],
      },
    },
    server: {
      url: `${process.env.BACKEND_URL}/api/vapi/tools`,
    },
    async: false,
  },
  {
    type: "function",
    function: {
      name: "captureLead",
      description:
        "Save a customer's contact details as a lead when they are enquiring but not ready to order. Always ask for name and phone number.",
      parameters: {
        type: "object",
        properties: {
          shopId: {
            type: "string",
            description: "The shop ID",
          },
          name: {
            type: "string",
            description: "Customer's full name",
          },
          phone: {
            type: "string",
            description: "Customer's phone number",
          },
          note: {
            type: "string",
            description: "Any additional notes about what the customer is interested in",
          },
        },
        required: ["shopId", "name", "phone"],
      },
    },
    server: {
      url: `${process.env.BACKEND_URL}/api/vapi/tools`,
    },
    async: false,
  },
];

/* ─────────────────────────────────────────
   Create Vapi Assistant
───────────────────────────────────────── */

export const createVapiAssistant = async (
  name: string,
  voicePrompt: string,
  shopId: string  // ← add shopId param
) => {
  const response = await vapiClient.post("/assistant", {
    name,
    model: {
      provider: "openai",
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            voicePrompt +
            `\n\nIMPORTANT: Your shopId is "${shopId}". Always pass this shopId when calling any tool.`,
        },
      ],
      tools: buildVapiTools(shopId),
    },
    voice: {
      provider: "playht",
      voiceId: "jennifer", // you can change this
    },
    serverUrl: `${process.env.BACKEND_URL}/api/webhook/vapi`,
  });

  return response.data;
};

/* ─────────────────────────────────────────
   Update Vapi Assistant
───────────────────────────────────────── */

export const updateVapiAssistant = async (
  assistantId: string,
  voicePrompt: string,
  shopId: string  // ← add shopId param
) => {
  const response = await vapiClient.patch(`/assistant/${assistantId}`, {
    model: {
      provider: "openai",
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            voicePrompt +
            `\n\nIMPORTANT: Your shopId is "${shopId}". Always pass this shopId when calling any tool.`,
        },
      ],
      tools: buildVapiTools(shopId),
    },
  });

  return response.data;
};

/* ─────────────────────────────────────────
   Delete Vapi Assistant
───────────────────────────────────────── */

export const deleteVapiAssistant = async (assistantId: string) => {
  await vapiClient.delete(`/assistant/${assistantId}`);
};