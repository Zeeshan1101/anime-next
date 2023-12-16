"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { ReactNode, useEffect, useRef, useState } from "react";

const HorizontalScrollList = ({
    children,
    className,
    ...props
}: {
    children: ReactNode;
    className?: string;
}) => {
    const ref = useRef<any>(null);

    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current?.scrollWidth - ref.current?.offsetWidth);
        }
    }, []);

    return (
        <div ref={ref}>
            <motion.div
                drag="x"
                dragConstraints={{
                    right: 0,
                    left: -width,
                }}
                className={cn(className)}
                {...props}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default HorizontalScrollList;
