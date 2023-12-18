"use client";
import { filterParams } from "@/lib/filter-params";
import {
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useQueryStates } from "next-usequerystate";
import { Button } from "./ui/button";
import { getNumberRange } from "@/lib/utils";
import { useTransition } from "react";

type PageInfo = {
    currentPage: number;
    hasNextPage: boolean;
    lastPage: number;
    perPage: number;
    total: number;
};

export const Pagination = ({ pageInfo }: { pageInfo: PageInfo }) => {
    const [__, startTransition] = useTransition();
    const [_, setFilterParams] = useQueryStates(filterParams, {
        shallow: false,
        history: "replace",
    });

    const handlePageChange = (page: number) => {
        startTransition(() => {
            setFilterParams({
                page,
            });
        });
    };

    const handlePerPageChange = (perPage: number) => {
        startTransition(() => {
            setFilterParams({
                perPage,
            });
        });
    };

    const prev = pageInfo.currentPage > 1;
    const next = pageInfo.hasNextPage;

    return (
        <div className="my-4 flex w-full items-center justify-between px-2 md:justify-end">
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="hidden text-sm font-medium sm:block">
                        Rows per page
                    </p>
                    <Select
                        value={`${pageInfo.perPage}`}
                        onValueChange={(value) => {
                            handlePerPageChange(parseInt(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={pageInfo.perPage} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {getNumberRange(0, 30).map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[150px] items-center justify-center gap-1 text-sm font-medium">
                    Page {pageInfo.currentPage}
                    <span className="hidden sm:block">
                        of {pageInfo.lastPage}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => {
                            handlePageChange(1);
                        }}
                        disabled={!prev}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            handlePageChange(pageInfo.currentPage - 1);
                        }}
                        disabled={!prev}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            handlePageChange(pageInfo.currentPage + 1);
                        }}
                        disabled={!next}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => {
                            handlePageChange(pageInfo.lastPage);
                        }}
                        disabled={!(next && pageInfo.lastPage)}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
