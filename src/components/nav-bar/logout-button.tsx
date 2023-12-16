"use client";

import { logout } from "@/app/(actions)";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
    const router = useRouter();
    return (
        <div className="flex h-5 items-center justify-center rounded-lg px-0">
            <Button
                variant="link"
                onClick={async () => {
                    await logout();
                }}
            >
                <LogOut size={16} />
            </Button>
        </div>
    );
};
