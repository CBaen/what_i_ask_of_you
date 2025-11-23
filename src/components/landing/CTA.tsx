import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTA() {
    return (
        <section className="bg-primary-600 py-24 sm:py-32">
            <div className="container mx-auto px-4 text-center">
                <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Don't leave things unsaid.
                    <br />
                    Secure your legacy today.
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
                    It takes less than 5 minutes to set up your basic protocol.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/wizard">
                        <Button size="lg" className="bg-white text-primary-600 hover:bg-primary-50">
                            Get Started for Free
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
