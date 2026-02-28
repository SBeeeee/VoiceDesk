"use client";
import { useEffect } from "react";
import { useAuth } from "@/src/hooks/useAuth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { restoreSession, initialized } = useAuth();

  useEffect(() => {
    restoreSession(); // hydrate Redux with user data from cookie
  }, []);

  // show spinner until getMe resolves (~200ms)
  if (!initialized) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <svg
          className="w-6 h-6 text-white/20 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    );
  }

  return <>{children}</>;
}