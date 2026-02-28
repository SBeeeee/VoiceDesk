import InventoryItem from "../models/Inventory.models.js";

/* ─────────────────────────────────────────
   Add Inventory Item
───────────────────────────────────────── */
export const addInventoryItemService = async (
  shopId: string,
  data: {
    name: string;
    sku?: string;
    price: number;
    quantity: number;
    lowStockThreshold?: number;
  }
) => {
  const item = await InventoryItem.create({
    ...data,
    shop: shopId
  });

  if (!item) throw new Error("Item not found");
  return item;
};

/* ─────────────────────────────────────────
   Get All Inventory for a Shop
───────────────────────────────────────── */
export const getInventoryService = async (shopId: string) => {
  const items = await InventoryItem.find({ shop: shopId }).sort({
    createdAt: -1
  });

  return items;
};

/* ─────────────────────────────────────────
   Get Low Stock Items
───────────────────────────────────────── */
export const getLowStockService = async (shopId: string) => {
  const items = await InventoryItem.find({
    shop: shopId,
    isActive: true,
    $expr: { $lte: ["$quantity", "$lowStockThreshold"] }
  });

  return items;
};

/* ─────────────────────────────────────────
   Update Inventory Item
───────────────────────────────────────── */
export const updateInventoryItemService = async (
  shopId: string,
  itemId: string,
  updates: Partial<{
    name: string;
    price: number;
    quantity: number;
    lowStockThreshold: number;
    isActive: boolean;
  }>
) => {
  const item = await InventoryItem.findOneAndUpdate(
    { _id: itemId, shop: shopId },
    updates,
    { new: true }
  );

  if (!item) throw new Error("Item not found");
  return item;
};

/* ─────────────────────────────────────────
   Delete Inventory Item
───────────────────────────────────────── */
export const deleteInventoryItemService = async (
  shopId: string,
  itemId: string
) => {
  const item = await InventoryItem.findOneAndDelete({
    _id: itemId,
    shop: shopId
  });

  if (!item) throw new Error("Item not found");
};

/* ─────────────────────────────────────────
   Restock Inventory Item
   ───────────────────────────────────────── */
export const restockInventoryItemService = async (
  shopId: string,
  itemId: string,
  amount: number
) => {
  const item = await InventoryItem.findOneAndUpdate(
    { _id: itemId, shop: shopId },
    { $inc: { quantity: amount } },
    { new: true }
  );

  if (!item) throw new Error("Item not found");
  return item;
};
