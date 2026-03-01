"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/src/utils/api";
import { IShop } from "@/src/types/shop.types";
import { useVapi } from "@/src/hooks/useVapi";
import { ShopHero } from "@/src/components/shop/ShopHero";
import { ShopServices } from "@/src/components/shop/ShopServices";
import { ShopInfo } from "@/src/components/shop/ShopInfo";
import { Loader2 } from "lucide-react";

import { ShopNavbar } from "@/src/components/shop/ShopNavbar";
import { ShopExamples } from "@/src/components/shop/ShopExamples";
import shopService from "@/src/services/shop.service";

export default function ShopPublicPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [shop, setShop] = useState<IShop | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchShop = async () => {
            try {
                const data = await shopService.getShopBySlug(slug);
                setShop(data);
            } catch (err) {
                console.error("Error fetching shop:", err);
                setError("Shop not found");
            } finally {
                setLoading(false);
            }
        };

        fetchShop();
    }, [slug]);

    const vapi = useVapi(shop?.vapiAssistantId);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-6">
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Loading Experience</p>
            </div>
        </div>
    );

    if (error || !shop) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-gray-900">Oops!</h1>
                <p className="text-gray-500 font-medium">We couldn't find the shop you're looking for.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-gray-950 text-white px-8 py-3 rounded-xl font-bold"
                >
                    Try Again
                </button>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-white selection:bg-pink-100 selection:text-pink-600">
            <ShopNavbar shop={shop} />
            <ShopHero
                shop={shop}
                vapi={vapi}
            />

            <ShopServices services={shop.services} />

            <ShopInfo shop={shop} />

            <footer className="py-12 border-t border-gray-50 text-center">
                <p className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} {shop.name}. All rights reserved.
                </p>
            </footer>
        </main>
    );
}