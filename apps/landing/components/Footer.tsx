import { Zap } from "lucide-react";

const productLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Live Demo", href: "#demo" },
    { label: "Dashboard", href: "https://cortex-utk.vercel.app/conversations" },
];

const companyLinks = [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Support", href: "#" },
    { label: "Contact", href: "#" },
];

export default function Footer() {
    return (
        <footer className="bg-blue-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xl font-bold">Cortex</span>
                        </div>
                        <p className="text-blue-300 text-sm leading-relaxed max-w-xs">
                            AI-powered customer support platform that helps teams deliver
                            exceptional experiences at scale.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-blue-300 mb-4">
                            Product
                        </h4>
                        <ul className="space-y-3">
                            {productLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-blue-200 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-blue-300 mb-4">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-blue-200 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-blue-900">
                    <p className="text-sm text-blue-400 text-center">
                        © 2026 Cortex. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
