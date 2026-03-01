"use client";
import { IShop } from "@/src/types/shop.types";
import { VoiceOrb } from "@/src/components/landing/Voiceorb";
import { Mic, PhoneOff, MicOff, Play } from "lucide-react";

interface ShopHeroProps {
    shop: IShop;
    vapi: {
        status: "idle" | "connecting" | "active" | "ended";
        volumeLevel: number;
        transcript: { role: string; text: string }[];
        isMuted: boolean;
        isConnecting: boolean;
        isActive: boolean;
        isEnded: boolean;
        startCall: () => void;
        endCall: () => void;
        toggleMute: () => void;
    };
}

export const ShopHero = ({
    shop,
    vapi
}: ShopHeroProps) => {
    const { status, volumeLevel, transcript, isMuted, isConnecting, isActive, isEnded, startCall, endCall, toggleMute } = vapi;
    const isIdle = status === "idle";

    return (
        <section className="relative pt-32 pb-24 overflow-hidden bg-white border-b border-gray-100">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-50/30 to-transparent -z-10" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-100/20 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Content & CTA */}
                    <div className="text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div className="space-y-4">
                            {shop.category && (
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 border border-pink-100 rounded-lg shadow-sm">
                                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-600">
                                        {shop.category}
                                    </span>
                                </div>
                            )}
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter">
                                {shop.name.split(' ').map((word, i) => (
                                    <span key={i} className={i === 0 ? "block" : "block text-pink-500"}>
                                        {word}
                                    </span>
                                ))}
                            </h1>
                            <div className="space-y-4 max-w-lg">
                                <p className="text-xl text-gray-900 font-black leading-tight">
                                    Welcome to {shop.name}. <br />
                                    <span className="text-gray-400">Get to know us through our AI assistant.</span>
                                </p>
                                <p className="text-lg text-gray-500 font-medium leading-relaxed">
                                    Whether you want to order, book, or just browse our services, our AI receptionist is here to help you instantly.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                            {isIdle && (
                                <button
                                    onClick={startCall}
                                    className="group relative flex items-center gap-4 bg-gray-950 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] active:scale-95 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                    <Play className="w-6 h-6 fill-current" />
                                    <span>Start Conversation</span>
                                </button>
                            )}

                            {(isActive || isConnecting) && (
                                <div className="flex items-center gap-4 p-2 bg-gray-50 border border-gray-100 rounded-2xl animate-in zoom-in duration-500">
                                    <button
                                        onClick={toggleMute}
                                        className={`p-4 rounded-xl transition-all ${isMuted ? 'bg-gray-200 text-gray-500' : 'bg-white text-gray-900 shadow-sm border border-gray-100'}`}
                                    >
                                        {isMuted ? <MicOff size={20} /> : <Mic size={20} className="text-pink-500" />}
                                    </button>
                                    <button
                                        onClick={endCall}
                                        className="bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-xl shadow-lg shadow-rose-200 transition-all"
                                    >
                                        <PhoneOff size={20} />
                                    </button>
                                </div>
                            )}

                            {isEnded && (
                                <button
                                    onClick={startCall}
                                    className="flex items-center gap-2 text-pink-600 font-black tracking-tight hover:underline underline-offset-4 transition-all"
                                >
                                    <Play size={18} fill="currentColor" />
                                    Re-connect Agent
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right: Interactive Orb */}
                    <div className="relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                        <div className="relative p-12 bg-gray-50/50 border border-gray-100 rounded-[4rem] backdrop-blur-sm group">
                            {/* Inner ambient glow */}
                            <div
                                className="absolute inset-0 bg-pink-100/10 rounded-[4rem] transition-opacity duration-1000 group-hover:opacity-20"
                                style={{ opacity: 0.05 + volumeLevel * 0.4 }}
                            />
                            <div className="relative transform hover:scale-105 transition-transform duration-700 animate-float">
                                <VoiceOrb volume={volumeLevel} isConnecting={isConnecting} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Interaction Console (Transcript) */}
                {(isActive || (isEnded && transcript.length > 0)) && (
                    <div className="mt-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        <div className="group relative">
                            {/* Outer Glow */}
                            <div className="absolute -inset-4 bg-pink-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="bg-gray-950 text-white rounded-[4rem] p-10 md:p-16 shadow-2xl overflow-hidden relative border border-white/5">
                                {/* Decorative Grid Pattern */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                    style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
                                />

                                <div className="relative flex flex-col lg:flex-row gap-16 items-start">
                                    {/* Console Info */}
                                    <div className="lg:w-1/3 space-y-8 shrink-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Secure Live Stream</span>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-black leading-tight tracking-tighter">
                                                Voice <br /> <span className="text-pink-500 italic decoration-pink-500/30 underline underline-offset-8 decoration-4">Intelligence</span>
                                            </h3>
                                            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-[240px]">
                                                Real-time neural processing active. Every word is understood and acted upon instantly.
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 pt-4">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-950 bg-gray-800 flex items-center justify-center text-[10px] font-black text-gray-400">
                                                        {i}
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Multi-Channel Logic</span>
                                        </div>
                                    </div>

                                    {/* Transcript Content */}
                                    <div className="flex-grow w-full max-h-[300px] overflow-y-auto pr-6 space-y-8 scrollbar-thin scrollbar-thumb-pink-500/20 scrollbar-track-transparent">
                                        {transcript.length === 0 && isActive && (
                                            <div className="flex items-center gap-3 py-10 opacity-50">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                                                <span className="text-xs font-bold tracking-widest uppercase">Agent Initializing...</span>
                                            </div>
                                        )}
                                        {transcript.map((t, i) => (
                                            <div key={i} className={`flex flex-col ${t.role === 'assistant' ? 'items-start' : 'items-end'}`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest ${t.role === 'assistant' ? 'text-pink-500' : 'text-gray-500'}`}>
                                                        {t.role === 'assistant' ? 'AI Receptionist' : 'User Member'}
                                                    </span>
                                                </div>
                                                <p className={`text-lg font-bold leading-tight max-w-lg ${t.role === 'assistant' ? 'text-white' : 'text-gray-400'}`}>
                                                    {t.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
