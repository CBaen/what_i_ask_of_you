import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTA } from "@/components/landing/CTA";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col">
            <Hero />
            <Features />
            <HowItWorks />
            <CTA />
        </main>
    );
}
