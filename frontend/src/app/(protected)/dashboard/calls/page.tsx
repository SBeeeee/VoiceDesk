"use client";
import { useState, useEffect } from "react";
import api from "@/src/utils/api";

interface CallLog {
  _id: string;
  callId?: string;
  duration?: number;
  transcript?: string;
  summary?: string;
  leadCaptured: boolean;
  orderPlaced: boolean;
  createdAt: string;
}

export default function CallsPage() {
  const [logs, setLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    api.get("/calls")
      .then((res) => setLogs(res.data.logs))
      .finally(() => setLoading(false));
  }, []);

  const fmt = (secs?: number) => {
    if (!secs) return "—";
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Call Logs</h1>
        <p className="text-gray-500 text-sm mt-1">Every call handled by your AI receptionist.</p>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="flex justify-center py-16">
            <svg className="w-5 h-5 text-pink-300 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : logs.length === 0 ? (
          <div className="bg-white border border-pink-100 rounded-2xl py-16 text-center text-gray-400 text-sm">
            No calls yet. Share your shop link to start receiving calls.
          </div>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="bg-white border border-pink-100 rounded-2xl p-5">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpanded(expanded === log._id ? null : log._id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center text-pink-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">Duration: {fmt(log.duration)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {log.leadCaptured && (
                    <span className="text-xs bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100 px-2 py-0.5 rounded-full font-medium">
                      Lead
                    </span>
                  )}
                  {log.orderPlaced && (
                    <span className="text-xs bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded-full font-medium">
                      Order
                    </span>
                  )}
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${expanded === log._id ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>

              {expanded === log._id && (
                <div className="mt-4 space-y-3">
                  {log.summary && (
                    <div className="bg-pink-50/60 rounded-xl px-4 py-3">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Summary</p>
                      <p className="text-sm text-gray-700">{log.summary}</p>
                    </div>
                  )}
                  {log.transcript && (
                    <div className="bg-gray-50 rounded-xl px-4 py-3 max-h-48 overflow-y-auto">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Transcript</p>
                      <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">{log.transcript}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}