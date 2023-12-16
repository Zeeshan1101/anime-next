import { MediaFragment } from "@/__generated__/graphql";

import Image from "next/image";

export const MediaCard = ({ image }: { image: MediaFragment }) => {
    return (
        <div className="card flex min-h-[24rem] w-[16rem] min-w-[16rem] flex-shrink-0 flex-col gap-1">
            <div className="relative flex-1 overflow-hidden rounded-lg">
                <Image
                    src={image?.coverImage?.extraLarge as string}
                    fill
                    sizes="100%"
                    alt={image.title?.userPreferred as string}
                    className="absolute h-full w-full object-cover"
                />
                <div className="absolute inset-0 z-10 bg-black/0" />
            </div>

            <div className="line-clamp-1 h-5 pl-4">
                {image.title?.userPreferred}
            </div>
        </div>
    );
};
