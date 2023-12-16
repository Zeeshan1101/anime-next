import genres from "@/lib/genres";
import Image from "next/image";
import HorizontalScrollList from "./framer-motion/horizontal-scroll";

const GenreList = () => {
    return (
        <div className="popular space-y-3 overflow-hidden">
            <div className="flex w-full items-center justify-between px-[--padding-x]">
                <h1 className="text-xl font-semibold capitalize">Genres</h1>
            </div>
            <div className="px-[--padding-x]">
                <HorizontalScrollList className="flex gap-[--gap]">
                    {genres?.map((genre, index) => (
                        <div
                            key={index}
                            className="card relative min-h-[15rem] min-w-[240px] flex-shrink-0 gap-1 overflow-hidden rounded-lg"
                        >
                            <Image
                                src={genre.image}
                                fill
                                sizes="100%"
                                alt={genre.genre}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute left-0 top-0 h-full w-full bg-black/50"></div>
                            <div className="absolute bottom-5 left-5 z-10 text-xl font-semibold text-white">
                                {genre.genre}
                            </div>
                        </div>
                    ))}
                </HorizontalScrollList>
            </div>
        </div>
    );
};

export default GenreList;
