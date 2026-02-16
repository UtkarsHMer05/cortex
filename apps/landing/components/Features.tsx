"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    MessageSquare,
    Brain,
    Puzzle,
    BookOpen,
} from "lucide-react";

const features = [
    {
        icon: MessageSquare,
        tag: "Conversations",
        title: "Manage All Conversations",
        titleAccent: "in One Inbox",
        description:
            "Every customer message, from every channel, lands in one unified inbox. See who's talking, what they need, and respond instantly — no tab-switching required.",
        image: "/images/conversations-list.png",
        alt: "Cortex conversations inbox with customer messages",
        bullets: [
            "Real-time message streaming",
            "Auto-assigned priority levels",
            "Filter by status, time, and contact",
        ],
    },
    {
        icon: Brain,
        tag: "AI Chat",
        title: "Let AI Build the Responses",
        titleAccent: "While You Analyze the Data",
        description:
            "Your AI agent handles first-response, answers FAQs from your knowledge base, and escalates only when it can't solve a problem — so your team focuses on what matters.",
        image: "/images/conversation-detail.png",
        alt: "AI-powered conversation with customer context and chat history",
        bullets: [
            "AI-powered first response",
            "Full customer context sidebar",
            "Operator takeover at any time",
        ],
    },
    {
        icon: Puzzle,
        tag: "Integrations",
        title: "Integrate Anywhere",
        titleAccent: "with One Line of Code",
        description:
            "Add the Cortex widget to any website or app in seconds. Choose from HTML, Next.js, React, or plain JavaScript — it just works.",
        image: "/images/integrations.png",
        alt: "Setup & Integrations page showing HTML, Next.js, React, and JavaScript options",
        bullets: [
            "HTML, React, Next.js & JS SDKs",
            "One-line script snippet",
            "Fully customizable widget",
        ],
    },
    {
        icon: BookOpen,
        tag: "Knowledge Base",
        title: "Build Your Knowledge Base",
        titleAccent: "and Train Your AI",
        description:
            "Upload FAQs, product docs, or support guides — your AI agent instantly learns from them and uses the knowledge to answer customer queries accurately.",
        image: "/images/knowledge-base.png",
        alt: "Knowledge Base with uploaded documents for AI training",
        bullets: [
            "Upload docs, PDFs, and text files",
            "AI auto-learns new content",
            "Manage files with one click",
        ],
    },
];

export default function Features() {
    return (
        <section id="features" className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {features.map((feature, i) => {
                    const isReversed = i % 2 === 1;

                    return (
                        <motion.div
                            key={feature.tag}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6 }}
                            className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i > 0 ? "mt-20 lg:mt-28" : ""
                                }`}
                        >
                            {/* Text column */}
                            <div
                                className={`${isReversed ? "lg:order-2" : ""
                                    }`}
                            >
                                {/* Tag */}
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
                                    <feature.icon className="w-3.5 h-3.5" />
                                    {feature.tag}
                                </div>

                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight mb-4">
                                    <span className="text-gray-900">
                                        {feature.title}{" "}
                                    </span>
                                    <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                        {feature.titleAccent}
                                    </span>
                                </h3>

                                <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-6">
                                    {feature.description}
                                </p>

                                {/* Bullet points */}
                                <ul className="space-y-3">
                                    {feature.bullets.map((bullet) => (
                                        <li
                                            key={bullet}
                                            className="flex items-center gap-3 text-sm text-gray-600"
                                        >
                                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                            </div>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Image column */}
                            <div
                                className={`${isReversed ? "lg:order-1" : ""
                                    }`}
                            >
                                <div className="rounded-xl lg:rounded-2xl overflow-hidden shadow-xl shadow-gray-900/8 border border-gray-200/80 bg-white">
                                    {/* Mini browser chrome */}
                                    <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border-b border-gray-200/80">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                                    </div>
                                    <Image
                                        src={feature.image}
                                        alt={feature.alt}
                                        width={1400}
                                        height={900}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
