import type { Metadata } from "next";
import { HeroSection } from "@/sections/hero-sections";
import { PropertiesExplorer } from "@/components/properties-explorer";
import { getProperties, getSection } from "@/lib/content";

export const metadata: Metadata = {
    title: "Homes for Sale — Equity Premier Housing Solutions",
    description:
        "Modern homes for sale and investment projects by Equity Premier Housing Solutions — including 3-bedroom ensuite maisonettes in Mamburi, Malindi.",
};

const heroDefaults = {
    eyebrow: "HOMES & PROJECTS",
    headingLead: "Find Your",
    headingAccent: "Premier",
    headingTail: "Home",
    body: "Elegant maisonettes and visionary investments — premium finishes, secure locations and flexible financing.",
    backgroundImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
};

export default async function PropertiesPage() {
    const [properties, hero] = await Promise.all([
        getProperties(),
        getSection("properties_hero", heroDefaults),
    ]);

    return (
        <main>
            <HeroSection content={hero} variant="compact" align="center" />

            <PropertiesExplorer properties={properties} />
        </main>
    );
}
