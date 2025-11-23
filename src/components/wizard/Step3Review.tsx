import { Button } from "@/components/ui/Button";
import { ShieldCheck } from "lucide-react";
import { WizardState } from "@/app/wizard/page";

interface Step3Props {
    data: WizardState;
    onBack: () => void;
}

export function Step3Review({ data, onBack }: Step3Props) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Review & Sign</h2>
                    <p className="text-slate-600">
                        Ready to activate your protocol?
                    </p>
                </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                <div className="flex justify-between border-b border-slate-200 pb-4">
                    <span className="text-slate-600">Trigger</span>
                    <span className="font-semibold text-slate-900">{data.triggerPeriod} Inactivity</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-4">
                    <span className="text-slate-600">Primary Contact</span>
                    <span className="font-semibold text-slate-900">
                        {data.primaryContact.name || "Not Set"} <span className="text-slate-400 font-normal">({data.primaryContact.email || "No Email"})</span>
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-600">Encryption</span>
                    <span className="font-semibold text-green-600">AES-256-GCM (Ready)</span>
                </div>
            </div>

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>Back</Button>
                <Button className="bg-green-600 hover:bg-green-700">Sign & Activate Protocol</Button>
            </div>
        </div>
    );
}
