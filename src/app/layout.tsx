import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({
    weight: ["300", "400", "700", "900"],
    subsets: ["latin"],
    variable: "--font-merriweather",
});

export const metadata: Metadata = {
    title: "What I Ask of You",
    description: "Secure, compassionate end-of-life planning.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={clsx(
                    inter.variable,
                    merriweather.variable,
                    "antialiased font-sans bg-background text-foreground"
                )}
            >
                {children}
            </body>
        </html>
    );
}
