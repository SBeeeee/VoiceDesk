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
   Step 1: Create tools in Vapi first
   Returns tool IDs to attach to assistant
───────────────────────────────────────── */

export const createVapiTools = async (shopId: string) => {
  const toolDefs = [
    {
      type: "function",
      function: {
        name: "checkInventory",
        description:
          "Check if a product is available in the shop inventory. Call this when customer asks about product availability or stock.",
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
    },
    {
      type: "function",
      function: {
        name: "getServices",
        description:
          "Get all services offered by the shop with prices and duration. Call this when customer asks about services, pricing, or timings.",
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
    },
    {
      type: "function",
      function: {
        name: "placeOrder",
        description:
          "Place an order for a customer. Always confirm items and quantity with the customer before calling this.",
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
    },
    {
      type: "function",
      function: {
        name: "captureLead",
        description:
          "Save customer contact details as a lead when they are enquiring but not ready to order. Ask for name and phone.",
        parameters: {
          type: "object",
          properties: {
            shopId: {
              type: "string",
              description: "The shop ID",
            },
            name: {
              type: "string",
              description: "Customer full name",
            },
            phone: {
              type: "string",
              description: "Customer phone number",
            },
            note: {
              type: "string",
              description: "What the customer is interested in",
            },
          },
          required: ["shopId", "name", "phone"],
        },
      },
      server: {
        url: `${process.env.BACKEND_URL}/api/vapi/tools`,
      },
    },
  ];

  // Create each tool in Vapi and collect their IDs
  const toolIds: string[] = [];

  for (const toolDef of toolDefs) {
    const response = await vapiClient.post("/tool", toolDef);
    console.log(`✅ Vapi tool created: ${toolDef.function.name} → ${response.data.id}`);
    toolIds.push(response.data.id);
  }

  return toolIds;
};

/* ─────────────────────────────────────────
   Create Vapi Assistant
───────────────────────────────────────── */

export const createVapiAssistant = async (
  name: string,
  voicePrompt: string,
  shopId: string
) => {
  // First create tools
  const toolIds = await createVapiTools(shopId);

  // Then create assistant with tool IDs attached
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
      toolIds, 
    },
    
    server: {
    url: `${process.env.BACKEND_URL}/api/webhook/vapi`,
  },
  
  serverMessages: ["end-of-call-report"],
    
  });

  return { ...response.data, toolIds };
};

/* ─────────────────────────────────────────
   Update Vapi Assistant
───────────────────────────────────────── */

export const updateVapiAssistant = async (
  assistantId: string,
  voicePrompt: string,
  shopId: string
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