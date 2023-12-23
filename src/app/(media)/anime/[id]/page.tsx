import { Media, MediaStatus } from "@/__generated__/graphql";
import { ShowEpisodes } from "@/components/media/main/show-episodes";
import { Summary } from "@/components/media/main/summary";
import { Timer } from "@/components/media/main/timer";
import { UserList } from "@/components/media/main/user-list";
import { IndividualAnimeQuery } from "@/graphql/pages/individual-anime";
import { anilist_client } from "@/lib/graphql-request";
import Image from "next/image";
import { CSSProperties } from "react";
import ScrollMediaList from "@/components/media/scroll-media-list";
import { TranformedAnimeData, transformerAnimeData } from "@/lib/transformers";

export default async function Page({ params }: { params: { id: string } }) {
    const data = await anilist_client.request(IndividualAnimeQuery, {
        id: parseInt(params.id),
    });

    if (!data) return false;

    console.log(data?.media?.recommendations?.nodes);

    return (
        <main className="space-y-[--gap]">
            <section id="main">
                <div className="px-[--padding-x]">
                    <div
                        className="relative h-96 w-full rounded-lg "
                        style={
                            {
                                "--text-color": data?.media?.bannerImage
                                    ? "white"
                                    : "currentColor",
                            } as CSSProperties
                        }
                    >
                        {data?.media?.bannerImage && (
                            <>
                                <Image
                                    src={data.media?.bannerImage as string}
                                    fill
                                    quality={60}
                                    sizes="100vw"
                                    className="absolute h-full w-full rounded-lg object-cover"
                                    alt={
                                        (data.media?.title
                                            ?.english as string) ||
                                        "Banner Image"
                                    }
                                />
                                <div className="absolute h-full w-full rounded-lg bg-black/60" />
                            </>
                        )}
                        <div className="absolute left-1/2 top-1/4 w-10/12 -translate-x-1/2  rounded-lg">
                            <div className="flex h-full grid-flow-col grid-cols-6 flex-col items-center gap-5 lg:grid lg:grid-flow-row xl:grid-cols-5">
                                <div className="relative col-span-2 h-96 w-full max-w-[16rem] rounded-lg shadow xl:col-span-1">
                                    <Image
                                        src={
                                            data.media?.coverImage
                                                ?.extraLarge as string
                                        }
                                        fill
                                        sizes="100%"
                                        className="rounded-lg"
                                        alt={
                                            (data.media?.title
                                                ?.english as string) ||
                                            "Cover Image"
                                        }
                                    />
                                </div>
                                <div className="text-foreground col-span-4 flex items-center text-center lg:text-left lg:text-[--text-color]">
                                    <div>
                                        <div className="line-clamp-2  text-xl font-semibold  lg:text-2xl xl:text-4xl">
                                            {data?.media?.title?.userPreferred}
                                        </div>
                                        <ShowEpisodes
                                            status={
                                                data?.media
                                                    ?.status as MediaStatus
                                            }
                                            episodes={data?.media?.episodes}
                                            nextEpisode={
                                                data?.media?.nextAiringEpisode
                                                    ?.episode
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {data?.media?.nextAiringEpisode && (
                            <Timer
                                time={
                                    data?.media?.nextAiringEpisode
                                        ?.airingAt as number
                                }
                            />
                        )}
                    </div>
                </div>
                <div className="mt-56 space-y-5 lg:mt-32">
                    <Summary>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: data?.media?.description as string,
                            }}
                        ></div>
                    </Summary>
                    <div>
                        <UserList id={parseInt(params.id)} />
                    </div>
                </div>
            </section>

            <section id="relation" className="scroll-mb-20 space-y-[--gap]">
                <ScrollMediaList
                    title="Related"
                    media={transformerAnimeData(
                        data?.media?.relations?.nodes as Media[],
                    )}
                />
                <ScrollMediaList
                    title="Recommendations"
                    media={
                        data?.media?.recommendations?.nodes?.map((item) => ({
                            title:
                                item?.mediaRecommendation?.title
                                    ?.userPreferred ||
                                item?.mediaRecommendation?.title?.romaji,

                            coverImage:
                                item?.mediaRecommendation?.coverImage
                                    ?.extraLarge ||
                                item?.mediaRecommendation?.coverImage?.large,
                            id: item?.mediaRecommendation?.id,
                            type: item?.mediaRecommendation?.type,
                            color: item?.mediaRecommendation?.coverImage?.color,
                        })) as TranformedAnimeData
                    }
                />
            </section>

            <section id="stats"></section>

            <section id="staff"></section>
        </main>
    );
}
