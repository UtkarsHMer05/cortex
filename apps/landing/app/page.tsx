import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import DemoSection from "@/components/DemoSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <ProductShowcase />
            <Features />
            <HowItWorks />
            <DemoSection />
            <CTASection />
            <Footer />
        </main>
    );
}
