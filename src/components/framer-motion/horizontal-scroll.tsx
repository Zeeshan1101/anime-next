"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { config } from "@react-spring/web";

// const HorizontalScrollList = ({
//     children,
//     className,
//     width = 0,
//     ...props
// }: {
//     children: ReactNode;
//     className?: string;
//     width?: number;
// }) => {
//     const ref = useRef<any>(null);

//     const hasDragged = useRef(false);
//     const dragControls = useDragControls();
//     const [scroll, setScroll] = useState(0);
//     const scrollRef = useRef<HTMLDivElement>(null);

//     useGesture(
//         {
//             onDragStart: ({ first, last, event }) => {
//                 if (first) hasDragged.current = true;
//                 if (last) setTimeout(() => (hasDragged.current = false), 0);
//                 dragControls.start(event as PointerEvent);
//             },
//             onClickCapture: ({ event }) => {
//                 if (hasDragged.current) {
//                     event?.preventDefault();
//                     event?.stopPropagation();
//                 }
//             },
//         },
//         {
//             drag: {
//                 filterTaps: true,
//             },
//             target: scrollRef,
//         },
//     );

//     useEffect(() => {
//         if (ref?.current) {
//             setScroll(ref.current?.scrollWidth - ref.current.clientWidth);
//         }
//     }, []);

//     return (
//         <div ref={ref}>
//             <motion.div
//                 data-x={scroll}
//                 drag="x"
//                 dragConstraints={{
//                     right: 0,
//                     left: -scroll,
//                 }}
//                 dragControls={dragControls}
//                 ref={scrollRef}
//                 className={cn("cursor-grab touch-none", className)}
//                 {...props}
//             >
//                 {children}
//             </motion.div>
//         </div>
//     );
// };

const HorizontalScrollList = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const isDragging = useRef(false);

    const [{ x }, api] = useSpring(() => ({ x: 0 }));

    let [scroll, setScroll] = useState(0);

    useEffect(() => {
        if (ref?.current) {
            setScroll(ref.current?.scrollWidth - ref.current.clientWidth);
        }
    }, []);

    const bind = useGesture(
        {
            onDrag: ({ first, last, offset: [x] }) => {
                if (first) isDragging.current = true;
                if (last) setTimeout(() => (isDragging.current = false), 0);
                api.start({ x, config: config.gentle });
            },
            onClickCapture: ({ event }) => {
                if (isDragging.current) {
                    event?.stopPropagation();
                    event?.preventDefault();
                }
            },
            // onWheel: ({ event }) => {
            //     api.start({ x: x.get() + event.deltaX });
            // },
        },
        {
            drag: {
                bounds: { left: -scroll, right: 0 },
                axis: "x",
                from: () => [x.get(), 0],
                rubberband: true,
                filterTaps: true,
                preventScroll: true,
                preventScrollAxis: "y",
            },
            wheel: {
                bounds: { left: 0, right: scroll },
                axis: "x",
                rubberband: true,
            },
        },
    );

    return (
        <div ref={ref}>
            <animated.div
                data-x={scroll}
                className={cn("w-max touch-pan-y select-none", className)}
                {...bind()}
                style={{ x }}
            >
                {children}
            </animated.div>
        </div>
    );
};

export default HorizontalScrollList;
