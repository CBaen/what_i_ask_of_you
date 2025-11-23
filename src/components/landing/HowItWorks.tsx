export function HowItWorks() {
    return (
        <section className="py-24 sm:py-32">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary-600">Simple & Secure</h2>
                    <p className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        How it works
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl lg:max-w-4xl">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="relative flex flex-col items-center text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold text-xl mb-4">
                                1
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">Write & Upload</h3>
                            <p className="mt-2 text-slate-600">
                                Draft your final messages, upload documents, and list your accounts.
                            </p>
                        </div>
                        <div className="relative flex flex-col items-center text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold text-xl mb-4">
                                2
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">Encrypt Locally</h3>
                            <p className="mt-2 text-slate-600">
                                Your browser encrypts everything with your password. We store only the locked vault.
                            </p>
                        </div>
                        <div className="relative flex flex-col items-center text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold text-xl mb-4">
                                3
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">Live Your Life</h3>
                            <p className="mt-2 text-slate-600">
                                We check in periodically. If you stop responding, we unlock the vault for your trusted contacts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
