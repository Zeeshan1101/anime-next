import { MediaFragment, MediaSeason, MediaType } from "@/__generated__/graphql";
import { AnimeCarousel } from "@/components/anime-carousel";
import { PageQuery } from "@/graphql/pages/anime";
import { getClient } from "@/lib/graphql";
import { notFound } from "next/navigation";

export default async function Page() {
    const { data } = await getClient().query({
        query: PageQuery,
        variables: {
            nextSeason: MediaSeason.Winter,
            nextYear: 2024,
            season: MediaSeason.Fall,
            seasonYear: 2023,
            type: MediaType.Anime,
        },
    });

    if (!data) {
        notFound();
    }

    return (
        <main>
            <AnimeCarousel
                images={data.trending?.anime as MediaFragment[]}
                alt
            />
            <div className="mt-5">Hello</div>
        </main>
    );
}
