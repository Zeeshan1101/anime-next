"use client";

import { Shell, Hash, BarChart2, BookUser } from "lucide-react";

// let's make a function that receive the specific element_id as string and scroll into that element_id
const scrolltoHash = function (element_id: string) {
    const element = document.getElementById(element_id);
    element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
    });
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const sections = [
    {
        name: "main",
        icon: Shell,
        func: scrollToTop,
        label: "main",
    },
    {
        name: "relation",
        icon: Hash,
        func: () => scrolltoHash("relation"),
        label: "relation",
    },
    {
        name: "stats",
        icon: BarChart2,
        func: () => scrolltoHash("stats"),
        label: "stats",
    },
    {
        name: "staff",
        icon: BookUser,
        func: () => scrolltoHash("staff"),
        label: "staff",
    },
];

export const PageNav = () => {
    return (
        <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-lg bg-gray-200 px-1 py-1 shadow dark:bg-gray-900">
            {sections.map((section, index) => (
                <button
                    key={index}
                    aria-label={section.label}
                    role="button"
                    onClick={section.func}
                    className="hover:bg-foreground/30 rounded-lg p-2"
                >
                    <section.icon
                        className="text-foreground dark:text-foreground-dark h-6 w-6"
                        size={24}
                    />
                </button>
            ))}
        </div>
    );
};
