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
