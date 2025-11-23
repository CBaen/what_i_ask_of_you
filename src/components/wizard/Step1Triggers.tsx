```typescript
import { Button } from "@/components/ui/Button";
import { Clock } from "lucide-react";
import { clsx } from "clsx";

interface Step1Props {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

export function Step1Triggers({ value, onChange, onNext }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
          <Clock className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Configure Triggers</h2>
          <p className="text-slate-600">
            If you don't check in within this timeframe, your protocol will activate.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {["7 Days", "30 Days", "90 Days"].map((period) => (
          <button
            key={period}
            onClick={() => onChange(period)}
            className={clsx(
              "rounded-xl border-2 p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 transition-all",
              value === period
                ? "border-primary-600 bg-primary-50 ring-2 ring-primary-600 ring-offset-2"
                : "border-slate-200 hover:border-primary-600 hover:bg-primary-50"
            )}
          >
            <span className="block text-lg font-semibold text-slate-900">{period}</span>
            <span className="block text-sm text-slate-500">Inactivity Period</span>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext}>Next: Add Contacts</Button>
      </div>
    </div>
  );
}
```
