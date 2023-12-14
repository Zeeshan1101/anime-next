import { MediaToggle } from "@/components/media-toggle";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <main className="flex min-h-screen w-full flex-col px-12 py-4">
            <div>
                <MediaToggle />
            </div>
            {children}
        </main>
    );
}
