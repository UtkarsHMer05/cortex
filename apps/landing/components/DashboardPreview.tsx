"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    MessageSquare,
    Bell,
    LayoutDashboard,
    Users,
} from "lucide-react";

const callouts = [
    {
        icon: MessageSquare,
        label: "Conversation Sidebar",
        position: "top-[15%] -left-4 lg:-left-12",
    },
    {
        icon: Bell,
        label: "Real-time Notifications",
        position: "top-[10%] -right-4 lg:-right-12",
    },
    {
        icon: LayoutDashboard,
        label: "Quick Navigation",
        position: "bottom-[25%] -left-4 lg:-left-12",
    },
    {
        icon: Users,
        label: "User Profiles",
        position: "bottom-[20%] -right-4 lg:-right-12",
    },
];

export default function DashboardPreview() {
    return (
        <section
            id="dashboard"
            className="py-20 lg:py-28 relative overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-200 font-semibold text-sm uppercase tracking-wider">
                        Dashboard
                    </span>
                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                        Powerful Dashboard for Your Team
                    </h2>
                    <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto">
                        A unified command center for managing every aspect of your customer
                        support operations.
                    </p>
                </motion.div>

                {/* Dashboard mockup with callouts */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7 }}
                    className="relative max-w-5xl mx-auto"
                >
                    {/* Main image */}
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <Image
                            src="/images/dashboard-preview.png"
                            alt="Full Cortex dashboard interface with conversations, sidebar, and navigation"
                            width={1600}
                            height={900}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Callout badges */}
                    {callouts.map((callout, i) => (
                        <motion.div
                            key={callout.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
                            className={`absolute ${callout.position} hidden lg:flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-xl border border-blue-100`}
                        >
                            <callout.icon className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">
                                {callout.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
