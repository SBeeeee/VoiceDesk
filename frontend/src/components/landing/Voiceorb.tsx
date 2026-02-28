"use client";
// src/components/landing/VoiceOrb.tsx
import { useState, useEffect } from "react";
import { MicIcon } from "@/src/components/landing/icons";

export const VoiceOrb = () => {
  const [bars, setBars] = useState<number[]>(
    Array(24).fill(0).map(() => 0.2 + Math.random() * 0.8)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(Array(24).fill(0).map(() => 0.15 + Math.random() * 0.85));
    }, 160);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>
      {/* Glow bg */}
      <div
        className="absolute rounded-full"
        style={{
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(242,196,192,0.22) 0%, transparent 70%)",
          animation: "pulse-slow 3s ease-in-out infinite",
        }}
      />

      {/* Outer spinning ring */}
      <div
        className="absolute rounded-full border border-[rgba(232,131,122,0.12)]"
        style={{
          width: 260, height: 260,
          animation: "spin-slow 14s linear infinite",
        }}
      />

      {/* Inner dashed ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 210, height: 210,
          border: "1px dashed rgba(232,131,122,0.22)",
          animation: "spin-slow 9s linear infinite reverse",
        }}
      />

      {/* Orb */}
      <div
        className="absolute rounded-full"
        style={{
          width: 148, height: 148,
          background: "radial-gradient(circle at 35% 35%, #f2c4c0 0%, #e8837a 38%, #c9554c 100%)",
          boxShadow:
            "0 0 36px rgba(232,131,122,0.48), 0 0 72px rgba(232,131,122,0.18), inset 0 1px 0 rgba(255,255,255,0.28)",
        }}
      />

      {/* Waveform bars */}
      <div
        className="absolute flex items-center gap-0.5"
        style={{ width: 90, height: 44 }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            className="rounded-full flex-1"
            style={{
              height: `${h * 100}%`,
              background: "rgba(255,255,255,0.82)",
              transition: "height 0.16s ease",
              minHeight: 3,
            }}
          />
        ))}
      </div>

      {/* Mic badge */}
      <div
        className="absolute bottom-14.5 right-14.5 rounded-full flex items-center justify-center text-white"
        style={{
          width: 30, height: 30,
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(4px)",
        }}
      >
        <MicIcon size={13} />
      </div>
    </div>
  );
};