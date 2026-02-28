"use client";
import { useAuth } from "@/src/hooks/useAuth"
import { useShop } from "@/src/hooks/useShop"
import Link from "next/link";

const statCards = [
  {
    label: "Total Orders",
    value: "—",
    sub: "From voice calls",
    href: "/dashboard/orders",
    color: "bg-pink-500",
    lightColor: "bg-pink-50",
    textColor: "text-pink-600",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
      </svg>
    ),
  },
  {
    label: "Inventory Items",
    value: "—",
    sub: "Active products",
    href: "/dashboard/inventory",
    color: "bg-rose-500",
    lightColor: "bg-rose-50",
    textColor: "text-rose-600",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    label: "Leads",
    value: "—",
    sub: "Captured by AI",
    href: "/dashboard/leads",
    color: "bg-fuchsia-500",
    lightColor: "bg-fuchsia-50",
    textColor: "text-fuchsia-600",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    label: "Total Calls",
    value: "—",
    sub: "Handled by AI",
    href: "/dashboard/calls",
    color: "bg-pink-400",
    lightColor: "bg-pink-50",
    textColor: "text-pink-500",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: "Manage Shop", href: "/dashboard/shop", desc: "Edit details, services, hours" },
  { label: "View Inventory", href: "/dashboard/inventory", desc: "Add or update stock" },
  { label: "Recent Orders", href: "/dashboard/orders", desc: "Confirm or complete orders" },
  { label: "Call Logs", href: "/dashboard/calls", desc: "Review AI conversations" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { shop } = useShop();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Good morning, {user?.username} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's what's happening with your shop today.
        </p>
      </div>

      {/* Shop status banner */}
      {!shop ? (
        <div className="mb-8 bg-pink-50 border border-pink-200 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-pink-700">No shop set up yet</p>
            <p className="text-xs text-pink-400 mt-0.5">Create your shop to activate your AI voice receptionist</p>
          </div>
          <Link
            href="/dashboard/shop"
            className="bg-pink-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-pink-600 transition-colors"
          >
            Create Shop
          </Link>
        </div>
      ) : (
        <div className="mb-8 bg-white border border-pink-100 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 font-bold text-lg uppercase">
              {shop.name[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{shop.name}</p>
              <p className="text-xs text-gray-400">{shop.category ?? "General"} · {shop.subscriptionPlan} plan</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              AI Active
            </span>
            <Link
              href="/dashboard/shop"
              className="text-xs text-pink-500 hover:text-pink-700 font-medium transition-colors"
            >
              Edit →
            </Link>
          </div>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white border border-pink-100 rounded-2xl p-5 hover:shadow-md hover:shadow-pink-100 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 rounded-xl ${card.lightColor} flex items-center justify-center ${card.textColor}`}>
                {card.icon}
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-pink-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-0.5">{card.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white border border-pink-100 rounded-xl px-4 py-3.5 hover:border-pink-300 hover:bg-pink-50/40 transition-all duration-150 group"
            >
              <p className="text-sm font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                {link.label}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}