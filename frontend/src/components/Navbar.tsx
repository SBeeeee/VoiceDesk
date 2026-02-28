"use client";

import Link from "next/link";
import { MicIcon } from "./icons";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-[#E8E3DE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e8837a] to-[#c9554c] flex items-center justify-center text-white">
            <MicIcon size={14} />
          </div>
          <span className="font-[var(--font-display)] text-lg font-medium">
            ShopVoice
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#6B6560]">
          <a href="#features" className="hover:text-black transition">
            Features
          </a>
          <a href="#how" className="hover:text-black transition">
            How it works
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-sm text-[#6B6560] hover:text-black transition"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="text-sm px-4 py-2 rounded-lg text-white bg-gradient-to-br from-[#e8837a] to-[#c9554c] shadow-md"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};