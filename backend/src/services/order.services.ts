import Order from "../models/Order.models.js";

/* ─────────────────────────────────────────
   Get All Orders for Shop
───────────────────────────────────────── */
export const getOrdersService = async (
  shopId: string,
  status?: string
) => {
  const filter: any = { shop: shopId };
  if (status) filter.status = status;

  const orders = await Order.find(filter)
    .populate("items.item", "name sku price")
    .sort({ createdAt: -1 });

  return orders;
};

/* ─────────────────────────────────────────
   Get Single Order
───────────────────────────────────────── */
export const getOrderByIdService = async (
  shopId: string,
  orderId: string
) => {
  const order = await Order.findOne({ _id: orderId, shop: shopId }).populate(
    "items.item",
    "name sku price"
  );

  if (!order) throw new Error("Order not found");
  return order;
};

/* ─────────────────────────────────────────
   Update Order Status
───────────────────────────────────────── */
export const updateOrderStatusService = async (
  shopId: string,
  orderId: string,
  status: "PLACED" | "CONFIRMED" | "COMPLETED"
) => {
  const order = await Order.findOneAndUpdate(
    { _id: orderId, shop: shopId },
    { status },
    { new: true }
  );

  if (!order) throw new Error("Order not found");
  return order;
};