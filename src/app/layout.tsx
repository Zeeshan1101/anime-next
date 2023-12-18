import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { TailwindInticator } from "@/components/tailwind-indicator";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "500", "700"],
});

export const metadata: Metadata = {
    title: "Anime Tracking App",
    description: "Track your anime progress",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={poppins.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <div className="fixed bottom-3 right-2 z-50">
                        <ThemeToggle />
                    </div>
                    <TailwindInticator />
                </ThemeProvider>
            </body>
        </html>
    );
}
