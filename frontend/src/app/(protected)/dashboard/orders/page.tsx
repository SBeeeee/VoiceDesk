"use client";
import { useState, useEffect } from "react";
import api from "@/src/utils/api";
import DataTable, { Column, ActionButton } from "@/src/components/dashboard/DataTable";

interface Order {
  _id: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: "PLACED" | "CONFIRMED" | "COMPLETED";
  items: { item: { name: string; price: number }; quantity: number; priceAtPurchase: number }[];
  createdAt: string;
}

const statusStyles: Record<string, string> = {
  PLACED: "bg-yellow-50 text-yellow-600 border border-yellow-100",
  CONFIRMED: "bg-blue-50 text-blue-600 border border-blue-100",
  COMPLETED: "bg-green-50 text-green-600 border border-green-100",
};

/* ── icons ── */
const ConfirmIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const CompleteIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

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

  const columns: Column<Order>[] = [
    { key: "customerName", label: "Customer", className: "font-medium text-gray-800" },
    { key: "customerPhone", label: "Phone", className: "text-gray-600" },
    {
      key: "items",
      label: "Items",
      className: "text-gray-500",
      render: (r) => (
        <span className="text-xs">
          {r.items.map((i) => `${i.item?.name ?? "?"} ×${i.quantity}`).join(", ")}
        </span>
      ),
    },
    {
      key: "totalAmount",
      label: "Total",
      className: "font-semibold text-pink-600",
      render: (r) => `₹${r.totalAmount}`,
    },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[r.status]}`}>
          {r.status}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      className: "text-xs text-gray-400",
      render: (r) => new Date(r.createdAt).toLocaleDateString(),
    },
  ];

  const actions: ActionButton<Order>[] = [
    {
      icon: ConfirmIcon,
      tooltip: "Confirm Order",
      onClick: (r) => handleStatusUpdate(r._id, "CONFIRMED"),
      color: "text-gray-400 hover:text-blue-500",
    },
    {
      icon: CompleteIcon,
      tooltip: "Mark Completed",
      onClick: (r) => handleStatusUpdate(r._id, "COMPLETED"),
      color: "text-gray-400 hover:text-green-500",
    },
  ];

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
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${filter === f
              ? "bg-pink-500 text-white"
              : "bg-white border border-pink-100 text-gray-500 hover:border-pink-200"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={orders}
        loading={loading}
        emptyMessage="No orders yet."
        actions={actions}
        rowKey={(r) => r._id}
      />
    </div>
  );
}