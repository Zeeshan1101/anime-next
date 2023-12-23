import { Media } from "@/__generated__/graphql";

export const transformerAnimeData = (data: Media[]) => {
      return data.map((item) => ({
            title:
                  item.title?.userPreferred ||
                  item.title?.english ||
                  item.title?.romaji,
            id: item.id,
            coverImage: item.coverImage?.extraLarge || item.coverImage?.large,
            color: item.coverImage?.color,
            type: item.type,
      }));
};

export type TranformedAnimeData = ReturnType<typeof transformerAnimeData>;

export type AnimeData = TranformedAnimeData[number];
