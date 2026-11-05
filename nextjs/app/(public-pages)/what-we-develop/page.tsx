import type { Metadata } from "next";
import { WhatWeDevelop, whatWeDevelopDefaults, WhatWeDevelopContent } from "@/sections/what-we-develop";
import { getSections } from "@/lib/content";

export const metadata: Metadata = {
    title: "What We Offer — Equity Premier Housing Solutions",
    description: "Maisonettes, gated communities, coastal homes and investment projects by Equity Premier Housing Solutions.",
};

export default async function WhatWeDevelopPage() {
    const sections = await getSections();
    const content = sections.what_we_develop && Object.keys(sections.what_we_develop).length
        ? ({ ...whatWeDevelopDefaults, ...sections.what_we_develop } as WhatWeDevelopContent)
        : whatWeDevelopDefaults;

    return (
        <main className="pt-24 md:pt-32">
            <WhatWeDevelop content={content} />
        </main>
    );
}
