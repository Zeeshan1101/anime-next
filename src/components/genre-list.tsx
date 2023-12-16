"use client";

import genres from "@/lib/genres";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GenreList = () => {
    const ref = useRef<any>(null);

    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (ref.current) {
            setWidth(ref.current?.scrollWidth - ref.current?.offsetWidth);
        }
    }, []);

    return (
        <div className="popular space-y-3 overflow-hidden">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-xl font-semibold capitalize">Genres</h1>
            </div>
            <div ref={ref}>
                <motion.div
                    drag="x"
                    dragConstraints={{
                        right: 0,
                        left: -width,
                    }}
                    className=" flex gap-10"
                >
                    {genres?.map((genre, index) => (
                        <motion.div
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
                            <div className="absolute bottom-5 left-5 z-10 text-xl font-semibold">
                                {genre.genre}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default GenreList;
