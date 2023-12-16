import anilist from "@/lib/oauth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
      const searchParams = request.nextUrl.searchParams;

      const tokens = await anilist.getTokens(
            searchParams.get("code") as string,
      );

      const { access_token, expires_in } = tokens;

      cookies().set("access_token", access_token, {
            httpOnly: true,
            maxAge: expires_in,
      });

      redirect("/");
}
