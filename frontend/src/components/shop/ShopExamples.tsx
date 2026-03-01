"use client";
import { Sparkles, MessageSquare, ArrowRight } from "lucide-react";

interface ShopExamplesProps {
    shopName: string;
}

export const ShopExamples = ({ shopName }: ShopExamplesProps) => {
    const examples = [
        "What services do you offer?",
        `Tell me more about ${shopName}`,
        "How do I book an appointment?",
        "What are your opening hours?",
        "Do you have any ongoing offers?",
        "How can I reach your support team?"
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-pink-100/20 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-100/20 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white border border-gray-100 rounded-[4rem] p-10 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] relative overflow-hidden">
                    {/* Inner Gradient Decoration */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-pink-50/50 via-transparent to-transparent -z-10" />

                    <div className="relative flex flex-col lg:flex-row gap-20 items-center">
                        {/* Heading Area */}
                        <div className="lg:w-[35%] space-y-8 text-left">
                            <div className="inline-flex items-center gap-2 p-2 px-4 bg-pink-50 border border-pink-100 rounded-2xl shadow-sm">
                                <Sparkles size={16} className="text-pink-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-600">Voice Assistant Guide</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.9] tracking-tighter">
                                Speak <br /> <span className="text-pink-500 italic">Naturally.</span>
                            </h2>
                            <p className="text-xl text-gray-500 font-medium leading-relaxed">
                                Our AI is designed to understand you perfectly. <br />
                                <span className="text-gray-900 font-black">Try starting with these examples:</span>
                            </p>
                        </div>

                        {/* Examples Grid */}
                        <div className="lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {examples.map((example, i) => (
                                <div
                                    key={i}
                                    className="group flex items-center justify-between p-8 bg-gray-50/50 border border-gray-100 rounded-[2.5rem] hover:bg-white hover:border-pink-200 hover:shadow-[0_32px_64px_-16px_rgba(236,72,153,0.15)] transition-all duration-700 cursor-pointer animate-in fade-in slide-in-from-bottom-4"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-pink-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-pink-200 transition-all duration-500 group-hover:rotate-12">
                                            <MessageSquare size={20} />
                                        </div>
                                        <span className="text-base font-bold text-gray-700 group-hover:text-gray-950 transition-colors">
                                            {example}
                                        </span>
                                    </div>
                                    <ArrowRight size={18} className="text-gray-300 group-hover:text-pink-500 transition-all group-hover:translate-x-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
