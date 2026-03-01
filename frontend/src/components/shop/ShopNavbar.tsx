"use client";
import { IShop } from "@/src/types/shop.types";
import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ShopNavbarProps {
    shop: IShop;
}

export const ShopNavbar = ({ shop }: ShopNavbarProps) => {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
            <div className="bg-white/70 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[2rem] px-6 py-3 flex items-center justify-between">
                {/* Logo / Name */}
                <Link href={`/shop/${shop.slug}`} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gray-950 rounded-2xl flex items-center justify-center text-white group-hover:bg-pink-500 transition-colors duration-500 shadow-lg">
                        <span className="font-black text-xl">{shop.name[0]}</span>
                    </div>
                    <span className="font-black text-lg tracking-tighter text-gray-900 group-hover:text-pink-600 transition-colors">
                        {shop.name}
                    </span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#services" className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-pink-500 transition-colors">Services</a>
                    <a href="#about" className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-pink-500 transition-colors">About</a>
                </div>

                {/* Call Action */}
                <div className="flex items-center gap-4">
                    {shop.phone && (
                        <a
                            href={`tel:${shop.phone}`}
                            className="hidden sm:flex items-center gap-2 p-2 px-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-pink-200 transition-all group"
                        >
                            <Phone size={14} className="text-gray-400 group-hover:text-pink-500 transition-colors" />
                            <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900">{shop.phone}</span>
                        </a>
                    )}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-pink-500 text-white p-3 px-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-200 transition-all flex items-center gap-2"
                    >
                        Talk to AI
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </nav>
    );
};
