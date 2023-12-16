import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { onError } from "@apollo/client/link/error";
import { cookies } from "next/headers";
import { logout } from "@/app/(actions)";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";

const logoutpage = async () => {
      await logout();
};

const removeTypenameLink = removeTypenameFromVariables();

const logoutLink = onError(({ networkError, response }) => {
      // To retry on network errors, we recommend the RetryLink
      // instead of the onError link. This just logs the error.

      if (
            response &&
            (response?.errors as any)[0].message === "Invalid token"
      ) {
            logoutpage();
      }
      if (networkError) {
            console.log(`[Network error]: ${networkError}`);
      }
});

const httpLink = new HttpLink({
      uri: process.env.ANILIST_GRAPHQL as string,
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      fetchOptions: { cache: "no-store" },

      headers: {
            Authorization: "Bearer " + cookies().get("access_token")?.value,
      },
});

const link = from([removeTypenameLink, httpLink, logoutLink]);

export const { getClient } = registerApolloClient(() => {
      return new ApolloClient({
            cache: new InMemoryCache(),
            link,
      });
});
