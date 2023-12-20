import HorizontalScrollList from "@/components/framer-motion/horizontal-scroll";
import { cookies } from "next/headers";
import { anilist_client } from "@/lib/graphql-request";
import { UserProgress, userQuery } from "@/graphql/user";
import { Media, MediaType } from "@/__generated__/graphql";
import { WatchCard } from "./watch-card";

export const WatchingList = async () => {
    const accessToken = cookies().get("access_token")?.value;

    if (!accessToken) return false;

    const user = await anilist_client.request(userQuery, undefined, {
        Authorization: `Bearer ${accessToken}`,
        next: {
            tags: ["user"] as unknown,
        } as unknown as string,
    });

    if (!user.user?.id) return false;

    const data = await anilist_client.request(UserProgress, {
        id: user.user.id,
        type: MediaType.Anime,
    });

    if (!data) return false;

    return (
        <div className="w-full space-y-3">
            <div className="flex w-full items-center justify-between px-[--padding-x]">
                <h1 className="text-xl font-semibold capitalize">Watching</h1>
            </div>
            <div className="overflow-hidden px-[--padding-x]">
                <HorizontalScrollList className="flex gap-[--gap]">
                    {data?.currentList?.media?.map((media, index) => (
                        <WatchCard
                            key={index}
                            anime={media?.media as Media}
                            progress={media?.progress as number}
                        />
                    ))}
                </HorizontalScrollList>
            </div>
        </div>
    );
};
