import Shop from "../models/shop.models.js";
import CallLog from "../models/CallLog.models.js";
import Lead from "../models/leads.models.js";
import Order from "../models/Order.models.js";
import InventoryItem from "../models/Inventory.models.js";

/* ─────────────────────────────────────────
   WEBHOOK — Called by Vapi after call ends
───────────────────────────────────────── */

export const handleVapiWebhookService = async (payload: any) => {
  const { message } = payload;

  // Vapi sends different event types
  if (!message || message.type !== "end-of-call-report") return;

  const {
    call,
    transcript,
    summary,
    assistantId,
  } = message;

  const callId = call?.id;
  const duration = call?.endedAt && call?.startedAt
    ? Math.round(
        (new Date(call.endedAt).getTime() - new Date(call.startedAt).getTime()) / 1000
      )
    : undefined;

  // Find which shop this assistant belongs to
  const shop = await Shop.findOne({ vapiAssistantId: assistantId });
  if (!shop) {
    console.warn("⚠️ Webhook received for unknown assistantId:", assistantId);
    return;
  }

  // Check if leads or orders were captured during the call
  const leadsCount = await Lead.countDocuments({
    shop: shop._id,
    createdAt: { $gte: new Date(call?.startedAt || Date.now() - 60000) },
  });

  const ordersCount = await Order.countDocuments({
    shop: shop._id,
    createdAt: { $gte: new Date(call?.startedAt || Date.now() - 60000) },
  });

  // Save call log
  const callLog = await CallLog.create({
    shop: shop._id,
    assistantId,
    callId,
    duration,
    transcript,
    summary,
    leadCaptured: leadsCount > 0,
    orderPlaced: ordersCount > 0,
  });

  console.log("✅ Call log saved:", callLog._id);
  return callLog;
};

/* ─────────────────────────────────────────
   TOOL — Check Inventory
   Called by Vapi during live call
───────────────────────────────────────── */

export const checkInventoryService = async (
  shopId: string,
  itemName?: string
) => {
  const shop = await Shop.findById(shopId);
  if (!shop) throw new Error("Shop not found");

  // If specific item requested
  if (itemName) {
    const items = await InventoryItem.find({
      shop: shopId,
      isActive: true,
      name: { $regex: itemName, $options: "i" },
    });

    if (items.length === 0) {
      return { available: false, message: `${itemName} is not available in stock.` };
    }

    return {
      available: true,
      items: items.map((i) => ({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        inStock: i.quantity > 0,
      })),
    };
  }

  // Return all active inventory
  const allItems = await InventoryItem.find({ shop: shopId, isActive: true });

  return {
    items: allItems.map((i) => ({
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      inStock: i.quantity > 0,
    })),
  };
};

/* ─────────────────────────────────────────
   TOOL — Get Services
   Called by Vapi during live call
───────────────────────────────────────── */

export const getServicesService = async (shopId: string) => {
  const shop = await Shop.findById(shopId).select("services name businessHours");
  if (!shop) throw new Error("Shop not found");

  const hours = shop.businessHours
    ? `${shop.businessHours.days?.join(", ")} from ${shop.businessHours.open} to ${shop.businessHours.close}`
    : "Not specified";

  return {
    shopName: shop.name,
    businessHours: hours,
    services: shop.services.map((s: any) => ({
      name: s.name,
      price: `₹${s.price}`,
      duration: s.duration || "N/A",
      description: s.shortDescription || "",
    })),
  };
};

/* ─────────────────────────────────────────
   TOOL — Place Order
   Called by Vapi during live call
───────────────────────────────────────── */

export const placeOrderService = async (
  shopId: string,
  customerName: string,
  customerPhone: string,
  items: { itemName: string; quantity: number }[]
) => {
  const shop = await Shop.findById(shopId);
  if (!shop) throw new Error("Shop not found");

  const orderItems = [];
  let totalAmount = 0;

  for (const requested of items) {
    const inventoryItem = await InventoryItem.findOne({
      shop: shopId,
      isActive: true,
      name: { $regex: requested.itemName, $options: "i" },
    });

    if (!inventoryItem) {
      return {
        success: false,
        message: `Sorry, ${requested.itemName} is not available.`,
      };
    }

    if (inventoryItem.quantity < requested.quantity) {
      return {
        success: false,
        message: `Only ${inventoryItem.quantity} units of ${inventoryItem.name} are available.`,
      };
    }

    orderItems.push({
      item: inventoryItem._id,
      quantity: requested.quantity,
      priceAtPurchase: inventoryItem.price,
    });

    totalAmount += inventoryItem.price * requested.quantity;

    // Deduct stock
    inventoryItem.quantity -= requested.quantity;
    await inventoryItem.save();
  }

  const order = await Order.create({
    shop: shopId,
    customerName,
    customerPhone,
    items: orderItems,
    totalAmount,
    status: "PLACED",
    source: "VOICE_AGENT",
  });

  console.log("✅ Order placed via voice agent:", order._id);

  return {
    success: true,
    message: `Order placed successfully! Total amount is ₹${totalAmount}. Order ID: ${order._id}`,
    orderId: order._id,
    totalAmount,
  };
};

/* ─────────────────────────────────────────
   TOOL — Capture Lead
   Called by Vapi during live call
───────────────────────────────────────── */

export const captureLeadService = async (
  shopId: string,
  name: string,
  phone: string,
  note?: string
) => {
  const shop = await Shop.findById(shopId);
  if (!shop) throw new Error("Shop not found");

  // Avoid duplicate leads
  const existing = await Lead.findOne({ shop: shopId, phone });
  if (existing) {
    return {
      success: true,
      message: `Got it! We already have ${name}'s details. We'll be in touch soon.`,
    };
  }

  const lead = await Lead.create({
    shop: shopId,
    name,
    phone,
    note,
    source: "VOICE_AGENT",
    status: "NEW",
  });

  console.log("✅ Lead captured via voice agent:", lead._id);

  return {
    success: true,
    message: `Thank you ${name}! We've noted your details and will contact you shortly.`,
    leadId: lead._id,
  };
};