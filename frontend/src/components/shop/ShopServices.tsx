"use client";
import { IService } from "@/src/types/shop.types";
import { Clock, Tag } from "lucide-react";

interface ShopServicesProps {
    services: IService[];
}

export const ShopServices = ({ services }: ShopServicesProps) => {
    if (!services || services.length === 0) return null;

    return (
        <section className="py-24 bg-gray-50/50 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Our Services</h2>
                    <div className="w-12 h-1.5 bg-pink-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col bg-white border border-gray-200 p-8 rounded-[2.5rem] shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(236,72,153,0.12)] transition-all duration-700 hover:-translate-y-3 hover:border-pink-200"
                        >
                            {/* Subtle inner glow on hover */}
                            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-pink-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-t-[2.5rem]" />

                            <div className="relative mb-8">
                                <div className="inline-flex p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 group-hover:bg-pink-500 group-hover:text-white group-hover:border-pink-500 group-hover:shadow-lg group-hover:shadow-pink-200 transition-all duration-500">
                                    <Tag className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="relative flex-grow">
                                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight group-hover:text-pink-600 transition-colors duration-300">
                                    {service.name}
                                </h3>

                                {service.shortDescription && (
                                    <p className="text-gray-500 text-[15px] leading-relaxed mb-8 font-medium">
                                        {service.shortDescription}
                                    </p>
                                )}
                            </div>

                            {/* Information Bar */}
                            <div className="relative flex items-center justify-between pt-6 mt-auto border-t border-gray-100 group-hover:border-pink-100 transition-colors">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Duration</span>
                                    <div className="flex items-center gap-1.5 text-gray-900 font-bold text-sm">
                                        <Clock className="w-3.5 h-3.5 text-pink-500" />
                                        <span>{service.duration || "Contact us"}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Price</span>
                                    <span className="text-2xl font-black text-gray-900 group-hover:text-pink-600 transition-colors">
                                        ${service.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
