import { MediaFragment } from "@/__generated__/graphql";
import Link from "next/link";
import HorizontalScrollList from "../framer-motion/horizontal-scroll";
import { MediaCard } from "./media-card";

const MediaList = ({
    media,
    title,
    link,
}: {
    media: MediaFragment[];
    title: string;
    link: string;
}) => {
    return (
        <div className="popular space-y-3 overflow-hidden">
            <div className="flex w-full items-center justify-between px-[--padding-x]">
                <h1 className="text-xl font-semibold capitalize">{title}</h1>
                <Link
                    href={link}
                    className=" text-sm font-semibold text-gray-500 hover:text-gray-700"
                >
                    See all
                </Link>
            </div>
            <div className="px-[--padding-x]">
                <HorizontalScrollList className="flex gap-[--gap]">
                    {media?.map((image: MediaFragment, index) => (
                        <MediaCard image={image} key={index} />
                    ))}
                </HorizontalScrollList>
            </div>
        </div>
    );
};

export default MediaList;
