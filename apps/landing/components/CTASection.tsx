"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
    return (
        <section className="py-20 lg:py-28 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1),transparent_60%)]" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                        Ready to transform your
                        <br />
                        customer support?
                    </h2>
                    <p className="text-lg text-blue-100 max-w-xl mx-auto mb-10">
                        Join teams using Cortex to deliver exceptional support experiences.
                        Get started in minutes — no credit card required.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://cortex-utk.vercel.app/conversations"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-blue-700 font-bold text-base shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all duration-300"
                        >
                            Launch Dashboard
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                        <a
                            href="https://cortex-widget-utk.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/40 text-white font-bold text-base hover:bg-white/10 hover:border-white/60 transition-all duration-300"
                        >
                            Try Widget
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
