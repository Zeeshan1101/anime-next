"use client";

import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const pathname = usePathname();

        const searchParams = useSearchParams();

        const router = useRouter();

        const search = searchParams.get("search");

        const [searchValue, setSearchValue] = React.useState("");

        React.useEffect(() => {
            setSearchValue(search || "");
        }, [search]);

        return (
            <Input
                ref={ref}
                className={cn(
                    "order-3 col-span-2 w-full pl-5 md:order-2 lg:w-96",
                    className,
                )}
                {...props}
                placeholder="Search..."
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
                value={searchValue}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        let path = pathname.startsWith("/anime")
                            ? "/anime"
                            : "/manga";

                        const params = new URLSearchParams(searchParams);

                        if (searchValue) {
                            params.set("search", searchValue);
                        } else {
                            params.delete("search");
                        }

                        path = `${path}/filter?${params.toString()}`;

                        router.push(path);
                    }
                }}
            />
        );
    },
);

SearchInput.displayName = "SearchInput";
