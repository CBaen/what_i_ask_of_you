import Link from "next/link";
import { Home, ListChecks, Users, Settings, Activity } from "lucide-react";
import { clsx } from "clsx";

const navigation = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Checklist", href: "/dashboard/checklist", icon: ListChecks },
    { name: "Deputies", href: "/dashboard/deputies", icon: Users },
    { name: "Activity", href: "/dashboard/activity", icon: Activity },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    return (
        <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
            <div className="flex h-16 items-center px-6">
                <span className="text-lg font-bold font-serif text-slate-900">Guiding Light</span>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                        )}
                    >
                        <item.icon
                            className="mr-3 h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-primary-600"
                            aria-hidden="true"
                        />
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className="border-t border-slate-200 p-4">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-sm font-medium text-slate-700">User Name</p>
                        <p className="text-xs text-slate-500">View Profile</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
