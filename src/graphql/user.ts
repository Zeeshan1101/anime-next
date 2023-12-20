import { gql } from "@/__generated__";

export const userQuery = gql(`
    query user{
        user: Viewer {
            id
            name
            avatar {
                large
            }
        }
    }
`);

export const UserProgress = gql(`
      query WatchingNow($id: Int,$type: MediaType) {
        currentList:Page(page: 1, perPage: 10) {
            pageInfo {
                  total
                  perPage
                  currentPage
                  lastPage
                  hasNextPage
            }
        media: mediaList(userId: $id, type: $type, status_in: [CURRENT, REPEATING]) {
              progress
              status
              media {
              id
                coverImage {
                  extraLarge
                  large
                  color
                }
                title {
                  romaji
                  english
                  native
                  userPreferred
                }
              }
            }
        }
      }
 `);
