"use client";
import { useState, useEffect } from "react";
import api from "@/src/utils/api";
import DataTable, { Column, ActionButton } from "@/src/components/dashboard/DataTable";

interface InventoryItem {
  _id: string;
  name: string;
  sku?: string;
  price: number;
  quantity: number;
  lowStockThreshold: number;
  isActive: boolean;
}

const isLow = (item: InventoryItem) => item.quantity <= item.lowStockThreshold;

/* ── icons ── */
const RestockIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const DeleteIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", sku: "", price: "", quantity: "", lowStockThreshold: "5" });
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await api.get("/inventory");
      setItems(res.data.items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/inventory", {
        name: form.name,
        sku: form.sku || undefined,
        price: Number(form.price),
        quantity: Number(form.quantity),
        lowStockThreshold: Number(form.lowStockThreshold),
      });
      setForm({ name: "", sku: "", price: "", quantity: "", lowStockThreshold: "5" });
      setShowForm(false);
      fetchItems();
    } finally {
      setSaving(false);
    }
  };

  const handleRestock = async (id: string, amount: number) => {
    await api.patch(`/inventory/${id}/restock`, { amount });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/inventory/${id}`);
    fetchItems();
  };

  const columns: Column<InventoryItem>[] = [
    { key: "name", label: "Item", className: "font-medium text-gray-800" },
    { key: "sku", label: "SKU", className: "text-gray-400", render: (r) => r.sku ?? "—" },
    { key: "price", label: "Price", render: (r) => <span>₹{r.price}</span> },
    { key: "quantity", label: "Stock" },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${isLow(r)
            ? "bg-red-50 text-red-500 border border-red-100"
            : "bg-green-50 text-green-600 border border-green-100"
          }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isLow(r) ? "bg-red-400" : "bg-green-500"}`} />
          {isLow(r) ? "Low stock" : "In stock"}
        </span>
      ),
    },
  ];

  const actions: ActionButton<InventoryItem>[] = [
    {
      icon: RestockIcon,
      tooltip: "Restock +10",
      onClick: (r) => handleRestock(r._id, 10),
      color: "text-gray-400 hover:text-pink-500",
    },
    {
      icon: DeleteIcon,
      tooltip: "Remove item",
      onClick: (r) => handleDelete(r._id),
      color: "text-gray-400 hover:text-red-500",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your stock. AI checks this in real time.</p>
        </div>
        <button
          onClick={() => setShowForm((p) => !p)}
          className="bg-pink-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-pink-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Item
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white border border-pink-100 rounded-2xl p-5 mb-6 grid grid-cols-2 gap-4">
          <h3 className="col-span-2 text-sm font-semibold text-gray-700">New Item</h3>
          {[
            { name: "name", placeholder: "Item name *", required: true },
            { name: "sku", placeholder: "SKU (optional)" },
            { name: "price", placeholder: "Price (₹) *", required: true, type: "number" },
            { name: "quantity", placeholder: "Quantity *", required: true, type: "number" },
            { name: "lowStockThreshold", placeholder: "Low stock alert at", type: "number" },
          ].map((f) => (
            <input
              key={f.name}
              name={f.name}
              type={f.type ?? "text"}
              required={f.required}
              placeholder={f.placeholder}
              value={(form as any)[f.name]}
              onChange={(e) => setForm((p) => ({ ...p, [f.name]: e.target.value }))}
              className="border border-pink-100 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all"
            />
          ))}
          <div className="col-span-2 flex gap-3 justify-end">
            <button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-500 px-4 py-2 rounded-xl hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="bg-pink-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-pink-600 disabled:opacity-50 transition-colors">
              {saving ? "Adding..." : "Add Item"}
            </button>
          </div>
        </form>
      )}

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        emptyMessage="No inventory items yet."
        actions={actions}
        rowKey={(r) => r._id}
      />
    </div>
  );
}