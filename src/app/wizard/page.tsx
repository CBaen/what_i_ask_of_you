"use client";

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Step1Triggers } from "@/components/wizard/Step1Triggers";
import { Step2Contacts } from "@/components/wizard/Step2Contacts";
import { Step3Review } from "@/components/wizard/Step3Review";

export interface WizardState {
    triggerPeriod: string;
    primaryContact: { name: string; email: string };
    proxyContact: { name: string; email: string };
}

const INITIAL_STATE: WizardState = {
    triggerPeriod: "30 Days",
    primaryContact: { name: "", email: "" },
    proxyContact: { name: "", email: "" },
};

export default function WizardPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<WizardState>(INITIAL_STATE);

    const nextStep = () => setStep((s) => Math.min(s + 1, 3));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const updateData = (data: Partial<WizardState>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    return (
        <div className="space-y-8">
            {/* Progress Bar */}
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                    className="absolute left-0 top-0 h-full bg-primary-600 transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                />
            </div>

            {/* Step Content */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
                {step === 1 && (
                    <Step1Triggers
                        value={formData.triggerPeriod}
                        onChange={(val) => updateData({ triggerPeriod: val })}
                        onNext={nextStep}
                    />
                )}
                {step === 2 && (
                    <Step2Contacts
                        data={formData}
                        onChange={updateData}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                )}
                {step === 3 && (
                    <Step3Review
                        data={formData}
                        onBack={prevStep}
                    />
                )}
            </div>
        </div>
    );
}
