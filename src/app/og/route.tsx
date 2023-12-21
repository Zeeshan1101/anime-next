import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export async function GET() {
    return new ImageResponse(
        (
            // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                }}
            >
                <div tw="flex gap-10 text-4xl">
                    <div tw="text-purple-600 px-2">Anime</div>
                    <div tw="text-indigo-600 px-2">Tracking</div>
                    <div tw="text-purple-600 px-2">App</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}
