import { ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Status Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-slate-900">Protocol Active</h2>
                            <p className="text-sm text-slate-500">Next check-in required by: <span className="font-semibold">Dec 25, 2025</span></p>
                        </div>
                    </div>
                    <Button variant="outline">Check In Now</Button>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Action 1 */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-primary-300 transition-colors cursor-pointer">
                    <h3 className="font-medium text-slate-900">Update Checklist</h3>
                    <p className="mt-2 text-sm text-slate-500">Add new accounts or update passwords.</p>
                </div>
                {/* Action 2 */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-primary-300 transition-colors cursor-pointer">
                    <h3 className="font-medium text-slate-900">Manage Deputies</h3>
                    <p className="mt-2 text-sm text-slate-500">Add or remove trusted contacts.</p>
                </div>
                {/* Action 3 */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-primary-300 transition-colors cursor-pointer">
                    <h3 className="font-medium text-slate-900">Test Protocol</h3>
                    <p className="mt-2 text-sm text-slate-500">Run a simulation to ensure everything works.</p>
                </div>
            </div>
        </div>
    );
}
