"use client";

import { motion } from "framer-motion";
import { UserPlus, Settings, Puzzle, HeartHandshake } from "lucide-react";

const steps = [
    {
        icon: UserPlus,
        number: "01",
        title: "Sign Up",
        description: "Create your account in 30 seconds. No credit card required.",
    },
    {
        icon: Settings,
        number: "02",
        title: "Customize",
        description:
            "Configure your widget, set your brand colors, and tailor the experience.",
    },
    {
        icon: Puzzle,
        number: "03",
        title: "Integrate",
        description:
            "Add Cortex to your website or app with a single line of code.",
    },
    {
        icon: HeartHandshake,
        number: "04",
        title: "Support",
        description:
            "Start delivering amazing customer experiences instantly.",
    },
];

const stepVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
};

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="py-20 lg:py-28 relative overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                        How It Works
                    </span>
                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Get started in{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                            minutes
                        </span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                        Four simple steps to transform your customer support operations.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            custom={i}
                            variants={stepVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="relative text-center"
                        >
                            {/* Number circle */}
                            <div className="relative z-10 mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-xl shadow-blue-500/25 mb-6">
                                <step.icon className="w-7 h-7 text-white" />
                            </div>

                            {/* Step number */}
                            <span className="inline-block text-xs font-bold text-blue-400 tracking-widest uppercase mb-2">
                                Step {step.number}
                            </span>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
