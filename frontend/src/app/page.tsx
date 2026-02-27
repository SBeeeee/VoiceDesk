"use client";
import { useState, useEffect, useRef } from "react";

// ── Icons (inline SVG to avoid dependencies) ──
const MicIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

const ShoppingBagIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const UsersIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const BarChartIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);

const PackageIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const PhoneIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const ArrowRightIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const HomeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const ZapIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const LogInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
    <polyline points="10 17 15 12 10 7"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
  </svg>
);

// ── Voice Orb Component ──
const VoiceOrb = () => {
  const [tick, setTick] = useState(0);
  const [bars, setBars] = useState<number[]>(Array(28).fill(0).map(() => Math.random()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
      setBars(Array(28).fill(0).map(() => 0.2 + Math.random() * 0.8));
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 340, height: 340 }}>
      {/* Outermost glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: 320, height: 320,
          background: "radial-gradient(circle, rgba(242,196,192,0.18) 0%, rgba(251,240,239,0.05) 70%, transparent 100%)",
          animation: "pulse-slow 3s ease-in-out infinite",
        }}
      />

      {/* Outer ring */}
      <div
        className="absolute rounded-full border"
        style={{
          width: 280, height: 280,
          borderColor: "rgba(232,131,122,0.15)",
          animation: "spin-slow 12s linear infinite",
        }}
      />

      {/* Mid ring with dots */}
      <div
        className="absolute rounded-full border"
        style={{
          width: 230, height: 230,
          borderColor: "rgba(232,131,122,0.25)",
          borderStyle: "dashed",
          animation: "spin-slow 8s linear infinite reverse",
        }}
      />

      {/* Orb base */}
      <div
        className="absolute rounded-full"
        style={{
          width: 160, height: 160,
          background: "radial-gradient(circle at 35% 35%, #f2c4c0 0%, #e8837a 40%, #c9554c 100%)",
          boxShadow: "0 0 40px rgba(232,131,122,0.5), 0 0 80px rgba(232,131,122,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
      />

      {/* Waveform bars inside orb */}
      <div className="absolute flex items-center gap-[2px]" style={{ width: 100, height: 50 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            className="rounded-full flex-1"
            style={{
              height: `${h * 100}%`,
              background: "rgba(255,255,255,0.85)",
              transition: "height 0.18s ease",
              minHeight: 3,
            }}
          />
        ))}
      </div>

      {/* Mic icon hint */}
      <div
        className="absolute bottom-[62px] right-[62px] rounded-full flex items-center justify-center"
        style={{
          width: 32, height: 32,
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(4px)",
        }}
      >
        <MicIcon size={14} />
      </div>
    </div>
  );
};

// ── Floating Pill Navbar ──
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setVisible(y < lastY || y < 40);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{
        paddingTop: scrolled ? "12px" : "20px",
        transition: "padding 0.4s ease",
      }}
    >
      <nav
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(232,227,222,0.8)",
          borderRadius: scrolled ? "9999px" : "16px",
          boxShadow: scrolled
            ? "0 4px 24px rgba(26,26,26,0.10)"
            : "0 2px 12px rgba(26,26,26,0.06)",
          padding: scrolled ? "8px 16px" : "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: scrolled ? "8px" : "32px",
          transform: visible ? "translateY(0)" : "translateY(-120%)",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          width: scrolled ? "auto" : "min(680px, 90vw)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: scrolled ? 28 : 32,
              height: scrolled ? 28 : 32,
              background: "linear-gradient(135deg, #e8837a, #c9554c)",
              boxShadow: "0 2px 8px rgba(232,131,122,0.4)",
              transition: "all 0.4s ease",
            }}
          >
            <MicIcon size={scrolled ? 13 : 15} />
          </div>
          {!scrolled && (
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "#1A1A1A",
                letterSpacing: "-0.01em",
              }}
            >
              ShopVoice
            </span>
          )}
        </div>

        {/* Nav links — expanded */}
        {!scrolled && (
          <div className="flex items-center gap-1 flex-1 justify-center">
            {["Features", "How it Works", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  color: "#6B6560",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  transition: "all 0.15s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#1A1A1A";
                  (e.target as HTMLElement).style.background = "#FBF0EF";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#6B6560";
                  (e.target as HTMLElement).style.background = "transparent";
                }}
              >
                {item}
              </a>
            ))}
          </div>
        )}

        {/* Nav icons — collapsed */}
        {scrolled && (
          <div className="flex items-center gap-1">
            {[
              { icon: <HomeIcon />, href: "#" },
              { icon: <ZapIcon />, href: "#features" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                style={{
                  width: 34, height: 34,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "50%",
                  color: "#6B6560",
                  transition: "all 0.15s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = "#FBF0EF";
                  (e.target as HTMLElement).style.color = "#E8837A";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = "transparent";
                  (e.target as HTMLElement).style.color = "#6B6560";
                }}
              >
                {item.icon}
              </a>
            ))}
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {scrolled ? (
            <a
              href="/auth/login"
              style={{
                width: 34, height: 34,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e8837a, #c9554c)",
                color: "white",
                boxShadow: "0 2px 8px rgba(232,131,122,0.4)",
                textDecoration: "none",
              }}
            >
              <LogInIcon size={15} />
            </a>
          ) : (
            <>
              <a
                href="/auth/login"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#6B6560",
                  padding: "7px 14px",
                  borderRadius: "8px",
                  border: "1px solid #E8E3DE",
                  transition: "all 0.15s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#e8837a";
                  el.style.color = "#e8837a";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#E8E3DE";
                  el.style.color = "#6B6560";
                }}
              >
                Log in
              </a>
              <a
                href="/auth/register"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "white",
                  padding: "7px 16px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #e8837a, #c9554c)",
                  boxShadow: "0 2px 10px rgba(232,131,122,0.35)",
                  transition: "all 0.15s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(232,131,122,0.5)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(232,131,122,0.35)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Get started
              </a>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

// ── Features data ──
const features = [
  {
    icon: <MicIcon size={22} />,
    title: "AI Voice Receptionist",
    desc: "A 24/7 voice agent that greets customers, answers questions, and handles requests — just like a real receptionist.",
  },
  {
    icon: <ShoppingBagIcon size={22} />,
    title: "Voice Orders",
    desc: "Customers can place product orders directly through the voice call. Orders land in your dashboard instantly.",
  },
  {
    icon: <UsersIcon size={22} />,
    title: "Lead Capture",
    desc: "When a customer is just enquiring, the AI collects their name and phone number as a lead for follow-up.",
  },
  {
    icon: <PackageIcon size={22} />,
    title: "Inventory Aware",
    desc: "The agent checks your live inventory in real-time and tells customers exactly what's available and at what price.",
  },
  {
    icon: <PhoneIcon size={22} />,
    title: "Call Transcripts",
    desc: "Every call is logged with a full transcript and AI-generated summary so you never miss what was discussed.",
  },
  {
    icon: <BarChartIcon size={22} />,
    title: "Shop Dashboard",
    desc: "Manage services, inventory, orders, and leads all from one clean dashboard built for shopkeepers.",
  },
];

// ── Steps ──
const steps = [
  {
    num: "01",
    title: "Create your shop",
    desc: "Sign up, fill in your shop details, services, and inventory. Takes less than 5 minutes.",
  },
  {
    num: "02",
    title: "AI agent is deployed",
    desc: "Your personal voice receptionist is instantly configured and ready to take calls.",
  },
  {
    num: "03",
    title: "Customers call your shop",
    desc: "Share your shop link. Customers visit and talk to your AI — orders, leads, and queries handled automatically.",
  },
];

// ── Main Page ──
export default function LandingPage() {
  return (
    <main
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        background: "#FAFAF8",
        color: "#1A1A1A",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-up { animation: fade-up 0.7s ease forwards; }
        .fade-up-2 { animation: fade-up 0.7s 0.15s ease both; }
        .fade-up-3 { animation: fade-up 0.7s 0.3s ease both; }
        .fade-up-4 { animation: fade-up 0.7s 0.45s ease both; }
        .fade-in { animation: fade-in 1s 0.2s ease both; }
      `}</style>

      <Navbar />

      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: 100,
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <div
              className="fade-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#FBF0EF",
                border: "1px solid #F2C4C0",
                borderRadius: 9999,
                padding: "6px 14px",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 6, height: 6,
                  borderRadius: "50%",
                  background: "#E8837A",
                  animation: "pulse-slow 2s ease infinite",
                }}
              />
              <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#C9554C" }}>
                AI Voice Receptionist for Local Shops
              </span>
            </div>

            <h1
              className="fade-up-2"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.8rem, 5vw, 4rem)",
                fontWeight: 500,
                lineHeight: 1.1,
                color: "#1A1A1A",
                marginBottom: 20,
                letterSpacing: "-0.02em",
              }}
            >
              Give your shop
              <br />
              <span style={{ color: "#E8837A", fontStyle: "italic" }}>a voice.</span>
            </h1>

            <p
              className="fade-up-3"
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.7,
                color: "#6B6560",
                marginBottom: 36,
                maxWidth: 420,
              }}
            >
              ShopVoice deploys an AI receptionist for your shop in minutes.
              It answers calls, checks inventory, takes orders, and captures leads —
              so you never miss a customer.
            </p>

            <div className="fade-up-4" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <a
                href="/auth/register"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #e8837a, #c9554c)",
                  color: "white",
                  borderRadius: 10,
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  boxShadow: "0 4px 20px rgba(232,131,122,0.35)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 8px 28px rgba(232,131,122,0.45)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 4px 20px rgba(232,131,122,0.35)";
                }}
              >
                Create your shop free
                <ArrowRightIcon size={15} />
              </a>

              <a
                href="#how-it-works"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "12px 20px",
                  color: "#6B6560",
                  fontSize: "0.9rem",
                  fontWeight: 400,
                  textDecoration: "none",
                  borderRadius: 10,
                  border: "1px solid #E8E3DE",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "#1A1A1A";
                  el.style.borderColor = "#c9c4bf";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "#6B6560";
                  el.style.borderColor = "#E8E3DE";
                }}
              >
                See how it works
              </a>
            </div>

            {/* Social proof */}
            <div
              className="fade-up-4"
              style={{
                marginTop: 40,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ display: "flex" }}>
                {["S", "R", "P", "A"].map((letter, i) => (
                  <div
                    key={i}
                    style={{
                      width: 30, height: 30,
                      borderRadius: "50%",
                      background: `hsl(${355 + i * 15}, 60%, ${75 - i * 5}%)`,
                      border: "2px solid white",
                      marginLeft: i === 0 ? 0 : -8,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.82rem", color: "#A89F99" }}>
                Join <strong style={{ color: "#6B6560" }}>200+</strong> shops already using ShopVoice
              </p>
            </div>
          </div>

          {/* Right — Orb */}
          <div
            className="fade-in"
            style={{ display: "flex", justifyContent: "center", position: "relative" }}
          >
            {/* BG blob */}
            <div
              style={{
                position: "absolute",
                width: 400, height: 400,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(242,196,192,0.25) 0%, transparent 70%)",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
            <VoiceOrb />

            {/* Floating cards */}
            <div
              style={{
                position: "absolute",
                top: 30, right: -10,
                background: "white",
                border: "1px solid #E8E3DE",
                borderRadius: 12,
                padding: "10px 14px",
                boxShadow: "0 4px 16px rgba(26,26,26,0.08)",
                animation: "fade-up 0.8s 0.6s ease both",
              }}
            >
              <p style={{ fontSize: "0.7rem", color: "#A89F99", marginBottom: 2 }}>New order</p>
              <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "#1A1A1A" }}>2× Shampoo placed</p>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: 40, left: -10,
                background: "white",
                border: "1px solid #E8E3DE",
                borderRadius: 12,
                padding: "10px 14px",
                boxShadow: "0 4px 16px rgba(26,26,26,0.08)",
                animation: "fade-up 0.8s 0.8s ease both",
              }}
            >
              <p style={{ fontSize: "0.7rem", color: "#A89F99", marginBottom: 2 }}>Lead captured</p>
              <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "#1A1A1A" }}>Priya — Facial enquiry</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section
        id="how-it-works"
        style={{
          padding: "100px 24px",
          background: "#F5F3F0",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 500, color: "#E8837A", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              Simple setup
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 500,
                color: "#1A1A1A",
                letterSpacing: "-0.02em",
              }}
            >
              Up and running in minutes
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ position: "relative" }}>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 28, right: -16,
                      width: 32, height: 1,
                      background: "linear-gradient(to right, #E8E3DE, transparent)",
                    }}
                  />
                )}
                <div
                  style={{
                    background: "white",
                    border: "1px solid #E8E3DE",
                    borderRadius: 16,
                    padding: 28,
                    height: "100%",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#F2C4C0";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(232,131,122,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#E8E3DE";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "2.5rem",
                      fontWeight: 300,
                      color: "#F2C4C0",
                      lineHeight: 1,
                      marginBottom: 16,
                    }}
                  >
                    {step.num}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.2rem",
                      fontWeight: 500,
                      color: "#1A1A1A",
                      marginBottom: 10,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#6B6560", lineHeight: 1.65 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        style={{ padding: "100px 24px" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 500, color: "#E8837A", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              Everything included
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 500,
                color: "#1A1A1A",
                letterSpacing: "-0.02em",
              }}
            >
              Your shop's smartest employee
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {features.map((f, i) => (
              <div
                key={i}
                style={{
                  background: i === 0 ? "linear-gradient(135deg, #FBF0EF, #fdf6f5)" : "white",
                  border: `1px solid ${i === 0 ? "#F2C4C0" : "#E8E3DE"}`,
                  borderRadius: 16,
                  padding: 28,
                  transition: "all 0.2s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = "0 8px 28px rgba(26,26,26,0.08)";
                  el.style.borderColor = "#F2C4C0";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                  el.style.borderColor = i === 0 ? "#F2C4C0" : "#E8E3DE";
                }}
              >
                <div
                  style={{
                    width: 42, height: 42,
                    borderRadius: 10,
                    background: "#FBF0EF",
                    border: "1px solid #F2C4C0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#E8837A",
                    marginBottom: 18,
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 500,
                    color: "#1A1A1A",
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#6B6560", lineHeight: 1.65 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: "80px 24px" }}>
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            background: "linear-gradient(135deg, #1A1A1A 0%, #2d2522 100%)",
            borderRadius: 24,
            padding: "64px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* decorative */}
          <div
            style={{
              position: "absolute",
              top: -60, right: -60,
              width: 240, height: 240,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(232,131,122,0.2) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40, left: -40,
              width: 180, height: 180,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(232,131,122,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "#E8837A",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Get started today
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 500,
              color: "white",
              letterSpacing: "-0.02em",
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Every shop deserves
            <br />
            <span style={{ color: "#F2C4C0", fontStyle: "italic" }}>a voice.</span>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.55)",
              marginBottom: 36,
              lineHeight: 1.65,
            }}
          >
            Set up your AI receptionist in under 5 minutes.
            <br />
            No technical knowledge required.
          </p>
          <a
            href="/auth/register"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              background: "linear-gradient(135deg, #e8837a, #c9554c)",
              color: "white",
              borderRadius: 10,
              fontWeight: 500,
              fontSize: "0.9rem",
              boxShadow: "0 4px 20px rgba(232,131,122,0.4)",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 28px rgba(232,131,122,0.5)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 4px 20px rgba(232,131,122,0.4)";
            }}
          >
            Create your shop free
            <ArrowRightIcon size={15} />
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid #E8E3DE",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 26, height: 26,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e8837a, #c9554c)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <MicIcon size={12} />
            </div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: "#1A1A1A",
              }}
            >
              ShopVoice
            </span>
          </div>

          <p style={{ fontSize: "0.8rem", color: "#A89F99" }}>
            © 2026 ShopVoice. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: "0.8rem",
                  color: "#A89F99",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#E8837A"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#A89F99"; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}