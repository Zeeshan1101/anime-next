import { CharacterConnection } from "@/__generated__/graphql";
import { VoicactorList } from "@/components/media/staff/voiceactor-list";
import { AnimeVoiceActorsQuery } from "@/graphql/pages/individual-anime";
import { voiceActorParamsCache } from "@/lib/filter-params";
import { anilist_client } from "@/lib/graphql-request";
import { transformerAnimeVoiceActors } from "@/lib/transformers";
import { CSSProperties } from "react";

export default async function Page({
    params,
    searchParams,
}: {
    params: {
        id: string;
    };
    searchParams: {
        [x: string]: any;
    };
}) {
    const languageParams = voiceActorParamsCache.parse(searchParams);

    const res = await anilist_client.request(AnimeVoiceActorsQuery, {
        id: parseInt(params.id),
        ...languageParams,
    });

    const data = transformerAnimeVoiceActors(
        res?.Media?.characters as CharacterConnection,
    );

    return (
        <section
            id="staff"
            className="flex min-h-screen w-full scroll-mt-2 flex-col md:scroll-mt-4"
            style={
                {
                    "--media-color":
                        res.Media?.coverImage?.color || "var(--foreground)",
                } as CSSProperties
            }
        >
            <div className="mt-10 flex h-full flex-1 flex-col md:mt-0">
                <VoicactorList data={data} />
            </div>
        </section>
    );
}
