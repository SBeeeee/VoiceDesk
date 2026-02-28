"use client";
import { useEffect } from "react";
import { useShop } from "@/src/hooks/useShop"
import Sidebar from "@/src/components/dashboard/Sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { getMyShop, hasShop } = useShop();

  useEffect(() => {
    if (!hasShop) getMyShop();
  }, []);

  return (
    <div className="flex min-h-screen bg-pink-50/30">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}