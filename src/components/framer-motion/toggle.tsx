"use client";
import { motion } from "framer-motion";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { cn } from "@/lib/utils";

const mediaContext = createContext<{
    media: string;
    setMedia: (state: string) => void;
} | null>(null);

const Toggle = ({
    state,
    children,
    className,
    onMediaChange,
}: {
    state: string;
    children: ReactNode;
    className?: string;
    onMediaChange?: (state: string) => void;
}) => {
    const [media, setMedia] = useState(state);

    useEffect(() => {
        if (onMediaChange) {
            onMediaChange(media);
        }
    }, [media, onMediaChange]);

    return (
        <mediaContext.Provider value={{ media, setMedia }}>
            <motion.div
                className={cn(
                    "relative flex h-8 w-max items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-900",
                    className,
                )}
            >
                {children}
            </motion.div>
        </mediaContext.Provider>
    );
};

const ToggleButton = ({
    value,
    children,
    className,
    motionClassName,
}: {
    value: string;
    children: ReactNode;
    className?: string;
    motionClassName?: string;
}) => {
    const ctx = useContext(mediaContext);

    return (
        <button
            className={cn("w-24 text-center text-sm ", className)}
            onClick={() => ctx?.setMedia(value)}
        >
            <div className="relative z-10 font-semibold text-white mix-blend-exclusion ">
                {children}
            </div>
            {ctx?.media === value && (
                <motion.div
                    layoutId="media-toggle"
                    className={cn(
                        "absolute top-0 h-8 w-24 rounded-lg bg-black dark:bg-white",
                        motionClassName,
                    )}
                    transition={{
                        duration: 0.2,
                        type: "easeInOut",
                    }}
                ></motion.div>
            )}
        </button>
    );
};

export { Toggle, ToggleButton };
