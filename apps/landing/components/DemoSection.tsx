"use client";

import { motion } from "framer-motion";
import {
    MessageCircle,
    Zap,
    Globe,
    Paintbrush,
} from "lucide-react";

const benefits = [
    { icon: Zap, label: "Instant AI responses" },
    { icon: MessageCircle, label: "Natural conversations" },
    { icon: Globe, label: "Seamless integration" },
    { icon: Paintbrush, label: "Fully customizable" },
];

export default function DemoSection() {
    return (
        <section id="demo" className="py-20 lg:py-28 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                        Live Demo
                    </span>
                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                        See Cortex{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                            in Action
                        </span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Try our live widget below — ask a question and experience AI-powered
                        support firsthand.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Widget iframe */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="rounded-2xl overflow-hidden border-2 border-blue-100 shadow-2xl shadow-blue-500/10 bg-white">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-white/30" />
                                    <div className="w-3 h-3 rounded-full bg-white/30" />
                                    <div className="w-3 h-3 rounded-full bg-white/30" />
                                </div>
                                <span className="text-sm text-white/90 font-medium ml-2">
                                    Cortex Widget
                                </span>
                            </div>
                            <iframe
                                src="https://cortex-widget-utk.vercel.app/"
                                title="Cortex Widget Live Demo"
                                className="w-full h-[500px] border-0"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Experience Real-Time AI Support
                        </h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            This is a live, fully functional demo of the Cortex support
                            widget. Go ahead — type a question and watch the AI respond
                            instantly.
                        </p>

                        <div className="space-y-5">
                            {benefits.map((b, i) => (
                                <motion.div
                                    key={b.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                                        <b.icon className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-base font-medium text-gray-700">
                                        {b.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <a
                                href="https://cortex-widget-utk.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                            >
                                Open Full Widget →
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
