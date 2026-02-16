"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    MessageSquare,
    Bot,
    Puzzle,
    BookOpen,
} from "lucide-react";

const tabs = [
    {
        id: "conversations",
        label: "Conversations",
        icon: MessageSquare,
        image: "/images/conversations-list.png",
        alt: "Cortex conversations inbox — manage all customer messages in one place",
    },
    {
        id: "ai-chat",
        label: "AI Chat",
        icon: Bot,
        image: "/images/conversation-detail.png",
        alt: "AI-powered chat with customer context panel and conversation history",
    },
    {
        id: "integrations",
        label: "Integrations",
        icon: Puzzle,
        image: "/images/integrations.png",
        alt: "Setup & Integrations — HTML, Next.js, React, and JavaScript SDKs",
    },
    {
        id: "knowledge-base",
        label: "Knowledge Base",
        icon: BookOpen,
        image: "/images/knowledge-base.png",
        alt: "Knowledge Base — upload and manage documents for your AI assistant",
    },
];

export default function ProductShowcase() {
    const [active, setActive] = useState(0);
    const activeTab = (tabs[active] ?? tabs[0])!;

    return (
        <section className="py-16 lg:py-20 bg-white relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10"
                >
                    {tabs.map((tab, i) => (
                        <button
                            key={tab.id}
                            onClick={() => setActive(i)}
                            className={`
                                inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                                ${active === i
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                    : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/50"
                                }
                            `}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Screenshot display */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/10 border border-gray-200/80 bg-white">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200/80">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                            </div>
                            <div className="flex-1 mx-8">
                                <div className="bg-white rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-400 max-w-sm mx-auto text-center">
                                    cortex-utk.vercel.app
                                </div>
                            </div>
                        </div>

                        {/* Animated screenshot switcher */}
                        <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-gray-100">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab.id}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={activeTab.image}
                                        alt={activeTab.alt}
                                        fill
                                        className="object-cover object-top"
                                        sizes="(max-width: 1200px) 100vw, 1200px"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
