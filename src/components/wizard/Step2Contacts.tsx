import { Button } from "@/components/ui/Button";
import { Users, UserPlus } from "lucide-react";
import { WizardState } from "@/app/wizard/page";

interface Step2Props {
    data: WizardState;
    onChange: (data: Partial<WizardState>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function Step2Contacts({ data, onChange, onNext, onBack }: Step2Props) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <Users className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Add Contacts</h2>
                    <p className="text-slate-600">
                        Who should receive your messages?
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 p-6">
                    <h3 className="font-semibold text-slate-900">Primary Contact</h3>
                    <p className="text-sm text-slate-500 mb-4">The main person to handle your affairs.</p>
                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={data.primaryContact.name}
                            onChange={(e) => onChange({ primaryContact: { ...data.primaryContact, name: e.target.value } })}
                            className="rounded-lg border border-slate-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={data.primaryContact.email}
                            onChange={(e) => onChange({ primaryContact: { ...data.primaryContact, email: e.target.value } })}
                            className="rounded-lg border border-slate-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        />
                    </div>
                </div>

                <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center hover:bg-slate-50 cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                        <UserPlus className="h-8 w-8 text-slate-400" />
                        <span className="font-medium text-slate-600">Add Proxy Contact (Optional)</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>Back</Button>
                <Button onClick={onNext}>Next: Review</Button>
            </div>
        </div>
    );
}
