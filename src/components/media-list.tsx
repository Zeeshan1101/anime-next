import { MediaFragment } from "@/__generated__/graphql";
import Image from "next/image";
import Link from "next/link";

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
        <div className="popular space-y-3">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-semibold capitalize">{title}</h1>
                <Link
                    href={link}
                    className="text-sm font-semibold text-gray-500 hover:text-gray-700"
                >
                    See all
                </Link>
            </div>
            <div className="grid h-96 w-full grid-cols-6 gap-10">
                {media?.map((image: MediaFragment, index) => (
                    <div
                        key={index}
                        className="card flex h-full flex-col gap-1"
                    >
                        <div className="relative flex-1 overflow-hidden rounded-lg">
                            <Image
                                src={image.coverImage?.extraLarge as string}
                                fill
                                sizes="100%"
                                alt={image.title?.userPreferred as string}
                                className="absolute h-full w-full object-cover"
                            />
                        </div>
                        <div className="line-clamp-1 h-5 pl-4">
                            {image.title?.userPreferred}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaList;
