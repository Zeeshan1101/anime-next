import { gql } from "@/__generated__";
import { Button } from "@/components/ui/button";
import { getClient } from "@/lib/graphql";
import anilist from "@/lib/oauth";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
    return (
        <main>
            <h1>Manga</h1>
        </main>
    );
}
