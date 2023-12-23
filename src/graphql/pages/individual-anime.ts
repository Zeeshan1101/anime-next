import { gql } from "@/__generated__";

export const IndividualAnimeQuery = gql(`
      query Anime($id: Int) {
        media:Media(id: $id) {
          bannerImage
          coverImage {
            extraLarge
            large
            medium
            color
          }
          title {
            romaji
            english
            native
            userPreferred
          }
          status(version: 2)
          description(asHtml: true)
          nextAiringEpisode {
                 id
                 timeUntilAiring
                 airingAt
                 episode
          }
          episodes
          relations {
               nodes{
                 id
                 type
                 title {
                   english
                   romaji
                   userPreferred
                 }
                 coverImage{
                 extraLarge
                   large
                   color
                 }
               }
             }
         recommendations {
               nodes{
                 id
                 mediaRecommendation{
                          id
                          type
                          title {
                            romaji
                            english
                            native
                            userPreferred
                          }
                          coverImage {
                            extraLarge
                            large
                            medium
                            color
                          }
                }
               }
             }
        }
      }
`);

export const AnimeUserListQuery = gql(`
      query UserList($id: Int,$page: Int,$perPage: Int) {
            users: Page(page: $page, perPage: $perPage) {
           pageInfo {
             total
             perPage
             currentPage
             lastPage
             hasNextPage
           }
           mediaList(mediaId: $id, isFollowing: true, sort: UPDATED_TIME_DESC) {
             id
             status
             score
             progress
             user {
               id
               name
               avatar {
                 large
               }
               mediaListOptions {
                 scoreFormat
               }
             }
           }
         }
      }
`);
