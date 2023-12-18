"use client";

import { cn } from "@/lib/utils";
import { motion, useDragControls } from "framer-motion";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";

const HorizontalScrollList = ({
    children,
    className,
    width = 0,
    ...props
}: {
    children: ReactNode;
    className?: string;
    width?: number;
}) => {
    const ref = useRef<any>(null);

    const hasDragged = useRef(false);
    const dragControls = useDragControls();
    const [scroll, setScroll] = useState(0);

    const bind = useGesture(
        {
            onDragStart: ({ first, last, event }) => {
                if (first) hasDragged.current = true;
                if (last) setTimeout(() => (hasDragged.current = false), 0);
                dragControls.start(event as PointerEvent);
            },
            onClickCapture: (event) => {
                if (hasDragged.current) {
                    event.event?.stopPropagation();
                }
            },
        },
        {
            drag: {
                filterTaps: true,
            },
        },
    );

    useEffect(() => {
        if (ref?.current && !width) {
            setScroll(ref.current.scrollWidth - ref.current.clientWidth);
        } else {
            setScroll(width);
        }
    }, [width]);

    return (
        <div ref={ref} className="overflow-hidden">
            {/* @ts-ignore */}
            <motion.div
                data-x={scroll}
                drag="x"
                dragConstraints={{
                    right: 0,
                    left: -scroll,
                }}
                dragControls={dragControls}
                {...bind()}
                className={cn("cursor-grab touch-none", className)}
                {...props}
            >
                <div className="w-full cursor-grab">{children}</div>
            </motion.div>
        </div>
    );
};

export default HorizontalScrollList;
