import { AnimeFragment } from "@/__generated__/graphql";
import { MediaCard } from "@/components/media/media-card";
import { FilterQuery } from "@/graphql/pages/filter";
import { anilist_client } from "@/lib/graphql-request";

const removeEmpty = (obj: any) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key]);
        else if (obj[key] === null) delete obj[key];
    });
    return obj;
};

export const MediaList = async ({
    params,
}: {
    params: {
        [x: string]: any;
    };
}) => {
    const data = await anilist_client.request(FilterQuery, {
        ...params,
        perPage: 18,
    });

    return (
        <div>
            <div className="grid w-full grid-cols-2 gap-[--gap] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {data?.animes?.media?.map((anime, index) => {
                    return (
                        <MediaCard
                            key={index}
                            image={anime as AnimeFragment}
                            className="min-h-[18rem] sm:min-h-[20rem] md:min-h-[22rem] lg:min-h-[22rem] xl:min-h-[24rem]"
                        />
                    );
                })}
            </div>
        </div>
    );
};
