import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={twMerge(
                    clsx(
                        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                        {
                            "bg-primary-600 text-white hover:bg-primary-700": variant === "primary",
                            "bg-slate-800 text-white hover:bg-slate-700": variant === "secondary",
                            "border-2 border-slate-200 hover:bg-slate-100 text-slate-900": variant === "outline",
                            "hover:bg-slate-100 text-slate-700": variant === "ghost",
                            "bg-rose-500 text-white hover:bg-rose-600": variant === "danger",
                            "h-9 px-4 text-sm": size === "sm",
                            "h-11 px-6 text-base": size === "md",
                            "h-14 px-8 text-lg": size === "lg",
                        },
                        className
                    )
                )}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
