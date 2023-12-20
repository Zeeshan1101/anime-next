"use client";
import { LazyMotion, domMax } from "framer-motion";
import { ReactNode } from "react";

export const LazyMotionWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <LazyMotion strict features={domMax}>
            {children}
        </LazyMotion>
    );
};
