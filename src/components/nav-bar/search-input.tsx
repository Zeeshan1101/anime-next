"use client";

import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";

export const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const searchParams = useSearchParams();
        const search = searchParams.get("search");
        return (
            <Input
                ref={ref}
                className={cn("w-96 pl-5", className)}
                {...props}
                defaultValue={search || ""}
            />
        );
    },
);

SearchInput.displayName = "SearchInput";
