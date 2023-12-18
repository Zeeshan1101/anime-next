"use client";
import { Toggle, ToggleButton } from "./framer-motion/toggle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MediaToggle = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    return (
        <Toggle
            state={pathname.startsWith("/anime") ? "anime" : "manga"}
            className="order-1 col-span-1 h-10"
            onMediaChange={(state) => {
                let path;

                if (state === "anime" && pathname.startsWith("/manga")) {
                    path = pathname.replace("/manga", "/anime");
                } else if (state === "manga" && pathname.startsWith("/anime")) {
                    path = pathname.replace("/anime", "/manga");
                } else {
                    path = pathname;
                }

                const wholePath =
                    path + "?" + new URLSearchParams(searchParams).toString();
                router.push(wholePath);
            }}
            onAuxClick={(state) => {
                if (state === "anime") {
                    router.push("/anime");
                } else {
                    router.push("/manga");
                }
            }}
        >
            <ToggleButton value="anime" motionClassName="h-10">
                Anime
            </ToggleButton>
            <ToggleButton value="manga" motionClassName="h-10">
                Manga
            </ToggleButton>
        </Toggle>
    );
};

export { MediaToggle };
