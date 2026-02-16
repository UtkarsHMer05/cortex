"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Clock, Users } from "lucide-react";
import Image from "next/image";

const trustItems = [
    { icon: Shield, label: "Enterprise-grade Security" },
    { icon: Clock, label: "99.9% Uptime" },
    { icon: Users, label: "Trusted by Teams Worldwide" },
];

export default function Hero() {
    return (
        <section className="relative pt-28 pb-8 lg:pt-36 lg:pb-12 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-400/8 rounded-full blur-3xl" />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-sm font-medium mb-6"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    AI-Powered Customer Support
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
                >
                    <span className="text-gray-900">One AI Solution </span>
                    <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                        for All Your
                    </span>
                    <br />
                    <span className="text-gray-900">Customer Support</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-8 max-w-2xl mx-auto"
                >
                    Manage conversations, build knowledge bases, and deliver
                    exceptional customer experiences — all from one powerful platform.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                >
                    <a
                        href="https://cortex-utk.vercel.app/conversations"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
                    >
                        Start free trial
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                    <a
                        href="#demo"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-base hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                    >
                        Book a Demo
                    </a>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-6 mb-14"
                >
                    {trustItems.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center gap-2 text-sm text-gray-400"
                        >
                            <item.icon className="w-4 h-4 text-gray-400" />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Wide dashboard screenshot — full bleed */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/15 border border-gray-200/80 bg-white">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200/80">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                            <div className="w-3 h-3 rounded-full bg-green-400/80" />
                        </div>
                        <div className="flex-1 mx-8">
                            <div className="bg-white rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-400 max-w-sm mx-auto text-center">
                                cortex-utk.vercel.app/conversations
                            </div>
                        </div>
                    </div>
                    <Image
                        src="/images/conversation-detail.png"
                        alt="Cortex dashboard — conversation management with AI-powered responses"
                        width={1400}
                        height={900}
                        className="w-full h-auto"
                        priority
                    />
                </div>

                {/* Gradient fade at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </motion.div>
        </section>
    );
}
