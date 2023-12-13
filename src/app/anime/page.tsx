import { gql } from "@/__generated__";
import { Button } from "@/components/ui/button";
import { getClient } from "@/lib/graphql";
import anilist from "@/lib/oauth";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="flex min-h-screen w-full flex-col p-10">
      <h1>Anime</h1>
      <Button asChild variant="link">
        <Link href={anilist.getAuthURL()}>Login</Link>
      </Button>
    </main>
  );
}
