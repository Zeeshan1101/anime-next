import { MediaFragment } from "@/__generated__/graphql";

import Image from "next/image";

export const MediaCard = ({ image }: { image: MediaFragment }) => {
    return (
        <div className="card flex min-h-[16rem] w-[10rem]  flex-shrink-0 flex-col gap-1 sm:min-h-[18rem]  md:min-h-[20rem] md:w-[12rem] lg:min-h-[22rem]  lg:w-[14rem] xl:min-h-[24rem] xl:w-[16rem]">
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

            <div className="md:text-normal line-clamp-1 h-6 pl-1 text-sm md:pl-4">
                {image.title?.userPreferred}
            </div>
        </div>
    );
};
