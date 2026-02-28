"use client";
import { useState, useEffect } from "react";
import api from "@/src/utils/api";

interface Lead {
  _id: string;
  name: string;
  phone: string;
  note?: string;
  status: "NEW" | "CONTACTED" | "CONVERTED";
  source: string;
  createdAt: string;
}

const statusStyles = {
  NEW:       "bg-pink-50 text-pink-600 border-pink-100",
  CONTACTED: "bg-blue-50 text-blue-600 border-blue-100",
  CONVERTED: "bg-green-50 text-green-600 border-green-100",
};

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

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="text-gray-500 text-sm mt-1">Customers your AI captured during calls.</p>
      </div>

      <div className="bg-white border border-pink-100 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <svg className="w-5 h-5 text-pink-300 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">No leads yet.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-pink-50">
                {["Name", "Phone", "Note", "Status", "Date", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {leads.map((lead) => (
                <tr key={lead._id} className="hover:bg-pink-50/30 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-800">{lead.name}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{lead.phone}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-400 max-w-xs truncate">{lead.note ?? "—"}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyles[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                      className="text-xs border border-pink-100 rounded-lg px-2 py-1 text-gray-600 outline-none focus:border-pink-300 bg-white"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="CONVERTED">CONVERTED</option>
                    </select>
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