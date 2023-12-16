import { MediaToggle } from "@/components/media-toggle";
import { ReactNode } from "react";
import { SearchInput } from "@/components/nav-bar/search-input";
import { LoginButton } from "@/components/nav-bar/login-button";

export default function Layout({ children }: { children?: ReactNode }) {
    return (
        <main className="flex min-h-screen w-full flex-col py-4 [--gap:1rem] [--padding-x:1rem] sm:[--gap:1.5rem] sm:[--padding-x:1.5rem] md:[--gap:2rem] md:[--padding-x:2rem] lg:[--gap:2.5rem] lg:[--padding-x:3rem]">
            <div className="mb-5 grid grid-cols-2 items-center justify-between gap-[--gap] overflow-hidden px-[--padding-x] md:flex">
                <MediaToggle />
                <SearchInput />
                <LoginButton />
            </div>
            {children}
        </main>
    );
}
