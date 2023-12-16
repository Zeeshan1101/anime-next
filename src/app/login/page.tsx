"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <main className="flex min-h-screen w-full flex-col p-24">
            <button
                className="h-14 w-full"
                onClick={() => {
                    router.back();
                }}
            >
                <div className="flex items-center gap-5 transition-all duration-200 hover:gap-4">
                    <ArrowLeft className="h-6 w-6" />
                    Back
                </div>
            </button>
            <div className="flex flex-1 items-center justify-center ">
                Hello
            </div>
        </main>
    );
}
