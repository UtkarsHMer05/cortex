import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Cortex — AI-Powered Customer Support Platform",
    description:
        "Transform your customer support with AI-powered intelligence. Manage conversations, build knowledge bases, and deliver exceptional experiences — all in one platform.",
    keywords: [
        "customer support",
        "AI",
        "chatbot",
        "knowledge base",
        "helpdesk",
        "SaaS",
    ],
    openGraph: {
        title: "Cortex — AI-Powered Customer Support Platform",
        description:
            "Transform your customer support with AI-powered intelligence.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable}>
            <body>{children}</body>
        </html>
    );
}
