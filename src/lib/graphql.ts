"use server";
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { cookies } from "next/headers";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";

const removeTypenameLink = removeTypenameFromVariables();

export async function getClient() {
      const token = cookies().get("access_token")?.value;
      const httpLink = new HttpLink({
            uri: process.env.ANILIST_GRAPHQL as string,
            // you can disable result caching here if you want to
            // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
            fetchOptions: { cache: "no-store" },
            headers: {
                  ...(token && { Authorization: `Bearer ${token}` }),
            },
      });

      const link = from([removeTypenameLink, httpLink]);
      const { getClient: client } = registerApolloClient(() => {
            return new ApolloClient({
                  cache: new InMemoryCache(),
                  link,
            });
      });
      const setClient = await client();
      return setClient;
}
