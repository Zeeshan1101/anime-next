import { AnimeFragment, PageInfo } from "@/__generated__/graphql";
import { MediaCard } from "@/components/media/media-card";
import { Pagination } from "@/components/pagination";
import { FilterQuery } from "@/graphql/pages/filter";
import { anilist_client } from "@/lib/graphql-request";

export const MediaList = async ({
    params,
}: {
    params: {
        [x: string]: any;
    };
}) => {
    const data = await anilist_client.request(FilterQuery, {
        ...params,
    });

    console.log(data);

    return (
        <div className="w-full">
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
            {/* @ts-ignore */}
            <Pagination pageInfo={data?.animes?.pageInfo as PageInfo} />
        </div>
    );
};
