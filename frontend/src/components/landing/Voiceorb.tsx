"use client";
// src/components/landing/VoiceOrb.tsx
import { useState, useEffect } from "react";
import { MicIcon } from "@/src/components/landing/icons";

interface VoiceOrbProps {
  volume?: number; // 0-1
  isConnecting?: boolean;
}

export const VoiceOrb = ({ volume = 0, isConnecting = false }: VoiceOrbProps) => {
  const [bars, setBars] = useState<number[]>(
    Array(24).fill(0).map(() => 0.1 + Math.random() * 0.1)
  );

  useEffect(() => {
    if (isConnecting) {
      const interval = setInterval(() => {
        setBars(Array(24).fill(0).map(() => 0.4 + Math.random() * 0.4));
      }, 200);
      return () => clearInterval(interval);
    }

    if (volume > 0) {
      // Use volume to drive bars
      setBars(Array(24).fill(0).map((_, i) => {
        const base = volume * 0.8;
        const variation = Math.random() * 0.3;
        return Math.min(1, base + variation);
      }));
    } else {
      // Idle/Quiet state
      const interval = setInterval(() => {
        setBars(Array(24).fill(0).map(() => 0.05 + Math.random() * 0.1));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [volume, isConnecting]);

  return (
    <div className="relative flex items-center justify-center w-[300px] h-[300px]">
      {/* Background Glows */}
      <div
        className={`absolute rounded-full transition-all duration-1000 ${isConnecting ? 'scale-125 opacity-40' : 'scale-100 opacity-20'}`}
        style={{
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(242,196,192,0.4) 0%, transparent 70%)",
          animation: isConnecting ? "pulse 2s ease-in-out infinite" : "pulse-slow 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full opacity-10"
        style={{
          width: 350, height: 350,
          background: "radial-gradient(circle, rgba(232,131,122,0.3) 0%, transparent 80%)",
          animation: "pulse-slow 6s ease-in-out infinite alternate",
        }}
      />

      {/* Outer spinning ring - subtle */}
      <div
        className="absolute rounded-full border border-[rgba(232,131,122,0.08)] bg-white/[0.01] backdrop-blur-[1px]"
        style={{
          width: 270, height: 270,
          animation: "spin-slow 20s linear infinite",
        }}
      />

      {/* Inner dashed ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 220, height: 220,
          border: "1px dashed rgba(232,131,122,0.15)",
          animation: "spin-slow 12s linear infinite reverse",
        }}
      />

      {/* Main Orb */}
      <div
        className={`absolute rounded-full transition-all duration-500 ${volume > 0.1 ? 'scale-110' : 'scale-100'}`}
        style={{
          width: 154, height: 154,
          background: "radial-gradient(circle at 30% 30%, #fbd5d2 0%, #e8837a 45%, #b94238 100%)",
          boxShadow:
            volume > 0
              ? `0 0 ${40 + volume * 50}px rgba(232,131,122,0.6), 0 0 ${80 + volume * 70}px rgba(232,131,122,0.25), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.1)`
              : "0 12px 48px rgba(232,131,122,0.3), 0 0 24px rgba(232,131,122,0.15), inset 0 2px 4px rgba(255,255,255,0.3)",
        }}
      >
        {/* Shine effect */}
        <div className="absolute top-4 left-6 w-12 h-6 bg-white/20 rounded-[100%] rotate-[-25deg] blur-[2px]" />
      </div>

      {/* Waveform bars */}
      <div
        className="absolute flex items-center justify-center gap-1.5 w-[110px] h-[50px]"
      >
        {bars.map((h, i) => (
          <div
            key={i}
            className="rounded-full flex-1 shadow-sm"
            style={{
              height: `${Math.max(12, h * 100)}%`,
              background: "rgba(255,255,255,0.95)",
              transition: volume > 0 ? "height 0.08s ease-out" : "height 0.5s ease-in-out",
              minHeight: 5,
            }}
          />
        ))}
      </div>

      {/* Mic badge - Premium Position */}
      <div
        className={`absolute bottom-12 right-12 rounded-2xl flex items-center justify-center text-white transition-all duration-500 shadow-xl ${volume > 0 ? 'opacity-100 scale-110' : 'opacity-40 scale-100'
          }`}
        style={{
          width: 36, height: 36,
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.2)"
        }}
      >
        <MicIcon size={16} />
      </div>
    </div>
  );
};
