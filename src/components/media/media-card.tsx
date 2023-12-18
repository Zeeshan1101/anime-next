"use client";
import { AnimeFragment, MediaFragment } from "@/__generated__/graphql";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { CSSProperties } from "react";
import { useRouter } from "next/navigation";

export const MediaCard = ({
    image,
    scroll = false,
    className,
}: {
    image: MediaFragment | AnimeFragment;
    scroll?: Boolean;
    className?: string;
}) => {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                router.push(`/media/${image.id}`);
            }}
        >
            <div
                className={cn(
                    "card flex flex-shrink-0 select-none flex-col gap-1",
                    scroll
                        ? "min-h-[16rem] w-[10rem]  sm:min-h-[18rem]  md:min-h-[20rem] md:w-[12rem] lg:min-h-[22rem]  lg:w-[14rem] xl:min-h-[24rem] xl:w-[16rem]"
                        : "h-full w-full",
                    className,
                )}
                style={
                    {
                        "--media-color":
                            image?.coverImage?.color || "--foreground",
                    } as CSSProperties
                }
            >
                <div className="bg-[--media-color]/20 relative flex-1 overflow-hidden  rounded-lg">
                    <Image
                        src={image?.coverImage?.extraLarge as string}
                        fill
                        sizes="100%"
                        priority
                        quality={60}
                        alt={image.title?.userPreferred as string}
                        className="absolute h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 z-10 bg-black/0" />
                </div>
                <div className="md:text-normal line-clamp-1 h-6 pl-1 text-start text-sm font-medium md:pl-4">
                    {image.title?.userPreferred}
                </div>
            </div>
        </button>
    );
};

//  min-h-[16rem] w-[10rem]  sm:min-h-[18rem]  md:min-h-[20rem] md:w-[12rem] lg:min-h-[22rem]  lg:w-[14rem] xl:min-h-[24rem] xl:w-[16rem]
