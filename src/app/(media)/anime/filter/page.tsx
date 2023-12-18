import { filterParamsCache } from "@/lib/filterParams";
import { Suspense } from "react";
import { MediaList } from "./components";
import { Loader } from "@/components/loader";

const removeEmpty = (obj: any) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key]);
        else if (obj[key] === null) delete obj[key];
    });
    return obj;
};

export default async function Page({
    searchParams,
}: {
    searchParams: {
        [x: string]: any;
    };
}) {
    const filterParams = removeEmpty({
        ...filterParamsCache.parse(searchParams),
    });

    const key = new URLSearchParams(filterParams).toString();

    return (
        <div className="h-full w-full px-[--padding-x]">
            <Suspense
                key={key}
                fallback={
                    <div className="h-full w-full">
                        <Loader />
                    </div>
                }
            >
                <MediaList params={filterParams} />
            </Suspense>
        </div>
    );
}
