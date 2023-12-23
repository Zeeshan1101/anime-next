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

                let filterInclude = pathname.includes("/filter");

                console.log(state);

                switch (state) {
                    case "anime": {
                        let manga = pathname.startsWith("/manga");
                        let anime = pathname === "/anime";

                        if (manga && filterInclude) {
                            path = pathname.replace("/manga", "/anime");
                        } else if (anime && !filterInclude) {
                            path = "/anime/filter";
                        } else {
                            path = "/anime";
                        }
                        break;
                    }
                    case "manga": {
                        let manga = pathname === "/manga";
                        let anime = pathname.startsWith("/anime");
                        if (anime && filterInclude) {
                            path = pathname.replace("/anime", "/manga");
                        } else if (manga && !filterInclude) {
                            path = "/manga/filter";
                        } else {
                            path = "/manga";
                        }
                        break;
                    }
                    default: {
                        path = pathname;
                        break;
                    }
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
