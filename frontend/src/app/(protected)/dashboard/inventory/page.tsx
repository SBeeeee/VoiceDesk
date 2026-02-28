"use client";
import { useState, useEffect } from "react";
import api from "@/src/utils/api";

interface InventoryItem {
  _id: string;
  name: string;
  sku?: string;
  price: number;
  quantity: number;
  lowStockThreshold: number;
  isActive: boolean;
}

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

  const isLow = (item: InventoryItem) => item.quantity <= item.lowStockThreshold;

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

      {/* Table */}
      <div className="bg-white border border-pink-100 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="w-5 h-5 text-pink-300 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">No inventory items yet.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-pink-50">
                {["Item", "SKU", "Price", "Stock", "Status", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-pink-50/30 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-800">{item.name}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-400">{item.sku ?? "—"}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-800">₹{item.price}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-800">{item.quantity}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                      isLow(item)
                        ? "bg-red-50 text-red-500 border border-red-100"
                        : "bg-green-50 text-green-600 border border-green-100"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isLow(item) ? "bg-red-400" : "bg-green-500"}`} />
                      {isLow(item) ? "Low stock" : "In stock"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => handleRestock(item._id, 10)}
                        className="text-xs text-pink-500 hover:text-pink-700 font-medium transition-colors"
                      >
                        +10
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}