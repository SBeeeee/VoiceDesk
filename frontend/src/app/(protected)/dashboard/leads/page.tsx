"use client";
import { useState, useEffect } from "react";
import api from "@/src/utils/api";
import DataTable, { Column, ActionButton } from "@/src/components/dashboard/DataTable";

interface Lead {
  _id: string;
  name: string;
  phone: string;
  note?: string;
  status: "NEW" | "CONTACTED" | "CONVERTED";
  source: string;
  createdAt: string;
}

const statusStyles: Record<string, string> = {
  NEW: "bg-pink-50 text-pink-600 border border-pink-100",
  CONTACTED: "bg-blue-50 text-blue-600 border border-blue-100",
  CONVERTED: "bg-green-50 text-green-600 border border-green-100",
};

/* ── icons ── */
const PhoneIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>
);

const CheckIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await api.get("/leads");
      setLeads(res.data.leads);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await api.patch(`/leads/${id}/status`, { status });
    fetchLeads();
  };

  const columns: Column<Lead>[] = [
    { key: "name", label: "Name", className: "font-medium text-gray-800" },
    { key: "phone", label: "Phone", className: "text-gray-600" },
    { key: "note", label: "Note", className: "text-gray-400 max-w-xs truncate", render: (r) => r.note ?? "—" },
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

  const actions: ActionButton<Lead>[] = [
    {
      icon: PhoneIcon,
      tooltip: "Mark Contacted",
      onClick: (r) => updateStatus(r._id, "CONTACTED"),
      color: "text-gray-400 hover:text-blue-500",
    },
    {
      icon: CheckIcon,
      tooltip: "Mark Converted",
      onClick: (r) => updateStatus(r._id, "CONVERTED"),
      color: "text-gray-400 hover:text-green-500",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="text-gray-500 text-sm mt-1">Customers your AI captured during calls.</p>
      </div>

      <DataTable
        columns={columns}
        data={leads}
        loading={loading}
        emptyMessage="No leads yet."
        actions={actions}
        rowKey={(r) => r._id}
      />
    </div>
  );
}