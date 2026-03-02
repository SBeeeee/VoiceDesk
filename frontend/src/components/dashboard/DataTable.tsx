"use client";
import { useState } from "react";

/* ─────────────────────────────────
   Types
───────────────────────────────── */
export interface Column<T> {
    key: string;
    label: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
}

export interface ActionButton<T> {
    icon: React.ReactNode;
    tooltip: string;
    onClick: (row: T) => void;
    show?: (row: T) => boolean;
    color?: string;          // default: text-gray-400 hover:text-pink-500
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    emptyMessage?: string;
    actions?: ActionButton<T>[];
    rowKey: (row: T) => string;
}

/* ─────────────────────────────────
   Spinner
───────────────────────────────── */
const Spinner = () => (
    <div className="flex items-center justify-center py-16">
        <svg className="w-5 h-5 text-pink-300 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
    </div>
);

/* ─────────────────────────────────
   Tooltip wrapper
───────────────────────────────── */
function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
    const [show, setShow] = useState(false);
    return (
        <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            {show && (
                <span className="absolute -top-8 right-0 bg-gray-800 text-white text-[10px] font-medium px-2 py-1 rounded-md whitespace-nowrap z-50 pointer-events-none">
                    {text}
                    <span className="absolute top-full right-2 border-4 border-transparent border-t-gray-800" />
                </span>
            )}
        </span>
    );
}

/* ─────────────────────────────────
   DataTable Component
───────────────────────────────── */
export default function DataTable<T>({ columns, data, loading, emptyMessage, actions, rowKey }: DataTableProps<T>) {
    const hasActions = actions && actions.length > 0;

    return (
        <div className="bg-white border border-pink-100 rounded-2xl overflow-x-auto">
            {loading ? (
                <Spinner />
            ) : data.length === 0 ? (
                <div className="text-center py-16 text-gray-400 text-sm">{emptyMessage ?? "No data yet."}</div>
            ) : (
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-pink-50">
                            {columns.map((col) => (
                                <th key={col.key} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-3.5">
                                    {col.label}
                                </th>
                            ))}
                            {hasActions && (
                                <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-3.5">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-50">
                        {data.map((row) => (
                            <tr key={rowKey(row)} className="hover:bg-pink-50/30 transition-colors">
                                {columns.map((col) => (
                                    <td key={col.key} className={`px-5 py-3.5 text-sm ${col.className ?? "text-gray-800"}`}>
                                        {col.render ? col.render(row) : String((row as any)[col.key] ?? "—")}
                                    </td>
                                ))}
                                {hasActions && (
                                    <td className="px-5 py-3.5 pr-6">
                                        <div className="flex items-center gap-1.5 justify-end">
                                            {actions!.map((action, i) => {
                                                if (action.show && !action.show(row)) return null;
                                                return (
                                                    <Tooltip key={i} text={action.tooltip}>
                                                        <button
                                                            onClick={() => action.onClick(row)}
                                                            className={`p-1.5 rounded-lg transition-all hover:bg-pink-50 ${action.color ?? "text-gray-400 hover:text-pink-500"}`}
                                                        >
                                                            {action.icon}
                                                        </button>
                                                    </Tooltip>
                                                );
                                            })}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
