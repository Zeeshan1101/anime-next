"use client";
import { Toggle, ToggleButton } from "./framer-motion/toggle";
import { usePathname, useRouter } from "next/navigation";

const MediaToggle = () => {
    const pathname = usePathname();

    const router = useRouter();

    return (
        <Toggle
            state={pathname.startsWith("/anime") ? "anime" : "manga"}
            className="h-10"
            onMediaChange={(state) => {
                router.push(`/${state}`);
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
