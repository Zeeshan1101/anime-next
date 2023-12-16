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
                className={cn(
                    "order-3 col-span-2 w-full pl-5 md:order-2 lg:w-96",
                    className,
                )}
                {...props}
                defaultValue={search || ""}
                placeholder="Search..."
            />
        );
    },
);

SearchInput.displayName = "SearchInput";
