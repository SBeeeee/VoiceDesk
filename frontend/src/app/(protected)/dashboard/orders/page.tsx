"use client";
import { useState, useEffect } from "react";
import api from "@/src/utils/api";

interface Order {
  _id: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: "PLACED" | "CONFIRMED" | "COMPLETED";
  items: { item: { name: string; price: number }; quantity: number; priceAtPurchase: number }[];
  createdAt: string;
}

const statusStyles = {
  PLACED:    "bg-yellow-50 text-yellow-600 border-yellow-100",
  CONFIRMED: "bg-blue-50 text-blue-600 border-blue-100",
  COMPLETED: "bg-green-50 text-green-600 border-green-100",
};

const nextStatus: Record<string, string> = {
  PLACED: "CONFIRMED",
  CONFIRMED: "COMPLETED",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const fetchOrders = async () => {
    try {
      const params = filter !== "ALL" ? `?status=${filter}` : "";
      const res = await api.get(`/orders${params}`);
      setOrders(res.data.orders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [filter]);

  const handleStatusUpdate = async (id: string, status: string) => {
    await api.patch(`/orders/${id}/status`, { status });
    fetchOrders();
  };

  const filters = ["ALL", "PLACED", "CONFIRMED", "COMPLETED"];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">Orders placed by your AI voice receptionist.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === f
                ? "bg-pink-500 text-white"
                : "bg-white border border-pink-100 text-gray-500 hover:border-pink-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center py-16">
            <svg className="w-5 h-5 text-pink-300 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-pink-100 rounded-2xl py-16 text-center text-gray-400 text-sm">
            No orders yet.
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white border border-pink-100 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-gray-800">{order.customerName}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{order.customerPhone} · {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <p className="text-base font-bold text-pink-600">₹{order.totalAmount}</p>
              </div>

              {/* Items */}
              <div className="bg-pink-50/50 rounded-xl px-4 py-3 mb-3 space-y-1">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs text-gray-600">
                    <span>{item.item?.name} × {item.quantity}</span>
                    <span>₹{item.priceAtPurchase * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              {nextStatus[order.status] && (
                <button
                  onClick={() => handleStatusUpdate(order._id, nextStatus[order.status])}
                  className="text-xs font-semibold text-pink-500 hover:text-pink-700 transition-colors"
                >
                  Mark as {nextStatus[order.status]} →
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}