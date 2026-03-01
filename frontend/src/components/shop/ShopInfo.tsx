"use client";
import { IShop } from "@/src/types/shop.types";
import { MapPin, Phone, Clock, Calendar } from "lucide-react";

interface ShopInfoProps {
    shop: IShop;
}

export const ShopInfo = ({ shop }: ShopInfoProps) => {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                    {/* About Section - More Prominent */}
                    <div className="lg:w-1/2 space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
                                About The <span className="text-pink-500">Shop</span>
                            </h2>
                            <div className="w-16 h-1.5 bg-pink-500 rounded-full" />
                        </div>

                        <p className="text-gray-500 leading-relaxed text-xl font-medium">
                            {shop.description || `Welcome to ${shop.name}! We're dedicated to providing exceptional services and a seamless experience for all our customers. Feel free to talk to our AI assistant to learn more about our offerings.`}
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            {shop.phone && (
                                <a
                                    href={`tel:${shop.phone}`}
                                    className="group flex items-center gap-4 bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-xl hover:shadow-pink-100/50 p-2 pr-6 rounded-2xl transition-all duration-500 hover:border-pink-200"
                                >
                                    <div className="p-4 bg-white shadow-sm border border-gray-100 rounded-xl text-pink-500 group-hover:scale-110 transition-transform">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Call Us</span>
                                        <span className="font-bold text-gray-900">{shop.phone}</span>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Details Card - Refined Grid */}
                    <div className="lg:w-1/2 w-full animate-in fade-in slide-in-from-right-8 duration-1000">
                        <div className="bg-gray-50 border border-gray-200 rounded-[3.5rem] p-10 lg:p-14 relative overflow-hidden group">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/20 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-pink-200/30 transition-colors duration-1000" />

                            <div className="relative space-y-12">
                                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-pink-500 rounded-full" />
                                    Visit Info
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                    {/* Location focus */}
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center text-rose-500">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Our Address</h4>
                                            <p className="text-gray-900 font-bold leading-snug">{shop.address || "Contact for location"}</p>
                                        </div>
                                    </div>

                                    {/* Hours focus */}
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center text-amber-500">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Opening Hours</h4>
                                            <p className="text-gray-900 font-bold leading-snug">
                                                {shop.businessHours?.open && shop.businessHours?.close
                                                    ? `${shop.businessHours.open} — ${shop.businessHours.close}`
                                                    : "Call for schedule"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Day selector refined */}
                                {shop.businessHours?.days && (
                                    <div className="pt-8 border-t border-gray-200">
                                        <div className="flex flex-wrap gap-2">
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                                                const dayInitial = day[0];
                                                const isActive = shop.businessHours?.days?.includes(dayInitial) ||
                                                    (i < 5 && shop.businessHours?.days?.includes('Weekday'));
                                                return (
                                                    <div key={day} className="flex flex-col items-center gap-2">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-500 border ${isActive
                                                            ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-200'
                                                            : 'bg-white text-gray-300 border-gray-100'
                                                            }`}>
                                                            {dayInitial}
                                                        </div>
                                                        <span className={`text-[9px] font-black uppercase tracking-tighter ${isActive ? 'text-gray-900' : 'text-gray-300'}`}>
                                                            {day}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-10 flex items-center gap-4 group/brand">
                                    <div className="h-[1px] flex-grow bg-gray-200" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 group-hover/brand:text-pink-400 transition-colors duration-500">
                                        VoiceDesk Certified
                                    </p>
                                    <div className="h-[1px] flex-grow bg-gray-200" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
