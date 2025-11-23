import { Bell } from "lucide-react";

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
            <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
            <div className="flex items-center gap-4">
                <button className="rounded-full p-1 text-slate-400 hover:text-slate-500">
                    <Bell className="h-6 w-6" />
                </button>
            </div>
        </header>
    );
}
