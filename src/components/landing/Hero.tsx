import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
            <div className="container mx-auto px-4 text-center">
                <h1 className="mx-auto max-w-4xl font-serif text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
                    Speak to them, <br />
                    <span className="text-primary-600">one last time.</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                    The only secure, zero-knowledge dead man's switch designed with compassion.
                    Ensure your final words, passwords, and wishes reach the right people—only when necessary.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/wizard">
                        <Button size="lg">Start Your Protocol</Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="ghost" size="lg">
                            How it works <span aria-hidden="true">→</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
