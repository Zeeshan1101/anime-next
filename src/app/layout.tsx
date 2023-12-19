import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { TailwindInticator } from "@/components/tailwind-indicator";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
            <head>
                <meta property="og:image" content="<generated>" />
                <meta property="og:image:alt" content="About Acme" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
            </head>
            <body className={poppins.className}>
                <SpeedInsights />
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
