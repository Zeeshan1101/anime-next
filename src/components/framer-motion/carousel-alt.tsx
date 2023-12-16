"use client";
import Image from "next/image";
import { CSSProperties, useState } from "react";
import { motion, useIsomorphicLayoutEffect } from "framer-motion";
import { cn } from "@/lib/utils";

import moment from "moment";
import { MediaFragment } from "@/__generated__/graphql";

const CarouselAlt = <T extends MediaFragment[]>({ images }: { images: T }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useIsomorphicLayoutEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length, activeIndex]);

    return (
        <div className="relative h-96 w-full overflow-hidden rounded-lg">
            <motion.div
                className="relative h-full w-full"
                animate={{ y: activeIndex * -100 + "%" }}
                transition={{
                    duration: 0.5,
                    type: "spring",
                    bounce: 0.2,
                    ease: "easeInOut",
                }}
            >
                {images.map((image, index) => {
                    return (
                        <div key={index} className="h-full w-full">
                            <CarouselItem
                                image={image?.bannerImage as string}
                                alt={image.title?.userPreferred as string}
                                episode={
                                    image.nextAiringEpisode?.episode as number
                                }
                                airingAt={
                                    image.nextAiringEpisode?.airingAt as number
                                }
                            />
                        </div>
                    );
                })}
            </motion.div>
            <div className="absolute right-5 top-1/2 z-[999] -translate-y-1/2">
                <div className="flex flex-col items-center gap-4">
                    {images.map((image, index) => {
                        return (
                            <motion.button
                                key={index}
                                className={cn(
                                    "relative z-10 h-4 w-4 rounded-full bg-[--media-color] transition-all duration-300",
                                )}
                                style={
                                    {
                                        "--media-color":
                                            image?.coverImage?.color ||
                                            "hsl(var(--background))",
                                    } as CSSProperties
                                }
                                onClick={() => {
                                    setActiveIndex(index);
                                }}
                            >
                                {activeIndex === index && (
                                    <motion.span
                                        layoutId="coursel-on"
                                        className="absolute inset-0 h-full w-full rounded-full outline outline-offset-2 outline-[--media-color]"
                                        animate={{
                                            outlineColor: "var(--media-color)",
                                        }}
                                    ></motion.span>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const CarouselItem = ({
    image,
    alt,
    episode,
    airingAt,
}: {
    image: string;
    alt: string;
    episode: number;
    airingAt: number;
}) => {
    return (
        <div className="relative z-10 h-full w-full">
            <Image
                src={image}
                fill
                alt={alt}
                className="h-full w-full object-cover object-center"
            />
            <div className="absolute bottom-5 z-20 flex w-full items-center justify-between px-14 ">
                <div className="text-white">
                    <div className="text-3xl font-semibold">{alt}</div>
                    <div className="opacity-60 ">
                        {episode && episode} Episodes
                    </div>
                </div>
                <div className="text-xl font-medium text-white">
                    {airingAt && moment.unix(airingAt).calendar()}
                </div>
            </div>
            <div className="absolute inset-0 z-10 h-full w-full bg-black opacity-50"></div>
        </div>
    );
};

export { CarouselAlt };
