import { ImageResponse } from "next/og";

// Image metadata
export const alt = "About Acme";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 128,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <span
                    style={{
                        color: "black",
                    }}
                >
                    A
                </span>
                <span
                    style={{
                        color: "gray",
                    }}
                >
                    T
                </span>
            </div>
        ),
    );
}
