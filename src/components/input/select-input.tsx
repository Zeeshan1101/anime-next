"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import React, { useEffect } from "react";

export const SelectInput = ({
    className,
    title,
    options,
    defaultValue,
    ...props
}: SelectPrimitive.SelectProps & {
    className?: string;
    title: string;
    options?: {
        label: string;
        value: string;
    }[];
}) => {
    const [value, setValue] = React.useState<string | undefined>("");

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <Select value={value} {...props}>
            <SelectTrigger className={cn("w-40", className)}>
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                {options?.map((option, index) => (
                    <SelectItem key={index} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
