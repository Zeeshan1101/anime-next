import { MediaToggle } from "@/components/media-toggle";
import { ReactNode } from "react";
import { SearchInput } from "@/components/nav-bar/search-input";
import { LoginButton } from "@/components/nav-bar/login-button";

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <main className="flex min-h-screen w-full flex-col px-12 py-4">
            <div className="mb-5 flex items-center justify-between">
                <MediaToggle />
                <SearchInput />
                <LoginButton />
            </div>
            {children}
        </main>
    );
}
