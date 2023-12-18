import {
      MediaStatus,
      MediaType,
      MediaSource,
      MediaSeason,
} from "@/__generated__/graphql";
import {
      createSearchParamsCache,
      parseAsArrayOf,
      parseAsBoolean,
      parseAsInteger,
      parseAsString,
      parseAsStringEnum,
} from "next-usequerystate/parsers";

export const filterParams = {
      page: parseAsInteger,
      id: parseAsInteger,
      type: parseAsStringEnum<MediaType>(Object.values(MediaType)).withDefault(
            MediaType.Anime,
      ),
      isAdult: parseAsBoolean.withDefault(false),
      search: parseAsString,
      status: parseAsStringEnum<MediaStatus>(Object.values(MediaStatus)),
      countryOfOrigin: parseAsString,
      source: parseAsStringEnum<MediaSource>(Object.values(MediaSource)),
      season: parseAsStringEnum<MediaSeason>(Object.values(MediaSeason)),
      seasonYear: parseAsInteger,
      year: parseAsString,
      genres: parseAsArrayOf(parseAsString),
};

export const filterParamsCache = createSearchParamsCache(filterParams);
