import { cn } from "@/lib/utils";
import { LogIn } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import anilist from "@/lib/oauth";
import { getClient } from "@/lib/graphql";
import { AvatarImage, Avatar, AvatarFallback } from "../ui/avatar";
import { LogoutButton } from "./logout-button";
import { userQuery } from "@/graphql/user";

export const LoginButton = async ({ className }: { className?: string }) => {
    const accessToken = cookies().get("access_token")?.value;
    if (accessToken === undefined) {
        return (
            <div className="order-2 flex justify-end md:order-3">
                <Button
                    className={cn(" px-3 py-1 ", className)}
                    variant="ghost"
                    asChild
                >
                    <Link href={anilist.getAuthURL()}>
                        <LogIn size={16} />
                    </Link>
                </Button>
            </div>
        );
    }

    const { data } = await (
        await getClient()
    ).query({
        query: userQuery,
        context: {
            fetchOptions: {
                next: {
                    tags: ["user"],
                },
            },
        },
    });

    if (!data) return;

    return (
        <div className="order-2 flex items-center justify-end gap-5 md:order-3">
            <Button
                className={cn("h-6 w-6 rounded-lg", className)}
                variant={"link"}
            >
                <Avatar>
                    <AvatarImage
                        src={data?.user?.avatar?.large as string}
                        className="object-cover"
                    />
                    <AvatarFallback>{data?.user?.name}</AvatarFallback>
                </Avatar>
            </Button>
            <LogoutButton />
        </div>
    );
};

LoginButton.displayName = "LoginButton";
