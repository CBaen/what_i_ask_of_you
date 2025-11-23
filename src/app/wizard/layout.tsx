import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WizardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-slate-500 hover:text-slate-700">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <span className="text-lg font-bold font-serif text-slate-900">Protocol Setup</span>
                </div>
                <div className="text-sm text-slate-500">Step 1 of 3</div>
            </header>
            <main className="container mx-auto max-w-3xl p-6">
                {children}
            </main>
        </div>
    );
}
