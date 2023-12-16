import { MediaFragment, MediaType } from "@/__generated__/graphql";
import { AnimeCarousel } from "@/components/anime-carousel";
import { PageQuery } from "@/graphql/pages/anime";
import { getClient } from "@/lib/graphql";
import { notFound } from "next/navigation";
import MediaList from "@/components/media/media-list";
import { getSeasons } from "@/lib/helpers/get-seasons";
import GenreList from "@/components/genre-list";

export default async function Page() {
    const fetchInfo = getSeasons(new Date());

    const { data } = await (
        await getClient()
    ).query({
        query: PageQuery,
        variables: {
            nextSeason: fetchInfo.nextSeason,
            nextYear: fetchInfo.nextSeasonYear,
            season: fetchInfo.currentSeason,
            seasonYear: fetchInfo.currentYear,
            type: MediaType.Anime,
        },
        context: {
            fetchOptions: {
                next: {
                    tags: ["anime"],
                },
            },
        },
    });

    if (!data) {
        notFound();
    }

    return (
        <main className="pb-[--gap]">
            <div className="px-[--padding-x]">
                <AnimeCarousel
                    images={data.trending?.anime as MediaFragment[]}
                    alt
                />
            </div>

            <div className="mt-10 h-full w-full space-y-[--gap]">
                <GenreList />
                <MediaList
                    title="Seasonal"
                    media={data.season?.anime as MediaFragment[]}
                    link={`/anime?season=${fetchInfo.currentSeason}&seasonYear=${fetchInfo.currentYear}`}
                />
                <MediaList
                    title="Upcoming"
                    media={data.nextSeason?.anime as MediaFragment[]}
                    link={`/anime?season=${fetchInfo.nextSeason}&seasonYear=${fetchInfo.nextSeasonYear}`}
                />
                <MediaList
                    title="Popular"
                    media={data.popular?.anime as MediaFragment[]}
                    link="/anime?sort=POPULARITY_DESC"
                />
            </div>
        </main>
    );
}
