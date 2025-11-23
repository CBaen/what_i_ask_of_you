import { ShieldCheck, HeartHandshake, Clock } from "lucide-react";

const features = [
    {
        name: "Zero-Knowledge Security",
        description:
            "We can't read your messages. Everything is encrypted on your device before it ever reaches our servers. You hold the only key.",
        icon: ShieldCheck,
    },
    {
        name: "Compassionate Delegation",
        description:
            "Designate a trusted 'Proxy' to handle your affairs. Our system guides them gently through the process when the time comes.",
        icon: HeartHandshake,
    },
    {
        name: "The Dead Man's Switch",
        description:
            "Automated check-ins ensure you're okay. If you don't respond after a set time, your protocol activates automatically.",
        icon: Clock,
    },
];

export function Features() {
    return (
        <section className="bg-slate-50 py-24 sm:py-32">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary-600">Peace of Mind</h2>
                    <p className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Technology that honors your legacy.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                    <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
