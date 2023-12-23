import { PageNav } from "@/components/media/page-nav";
import { BarChart2, BookUser, Hash, Shell } from "lucide-react";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="relative h-full w-full pb-10">
            {children}

            <PageNav />
        </div>
    );
}
