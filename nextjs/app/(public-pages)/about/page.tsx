import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MoveRight, Building2, Users, Globe2 } from "lucide-react";
import { HeroSection } from "@/sections/hero-sections";
import { VisionMission, visionMissionDefaults, VisionMissionContent } from "@/sections/vision-mission";
import { CoreValues, coreValuesDefaults, CoreValuesContent } from "@/sections/core-values";
import { getSections } from "@/lib/content";

export const metadata: Metadata = {
    title: "About Us — Equity Premier Housing Solutions",
    description:
        "Equity Premier Housing Solutions builds and sells modern, quality homes in Kenya — from all-ensuite maisonettes in Malindi to the Echoes of Afrika heritage project.",
};

const ICONS = [Building2, Users, Globe2];

const heroDefaults = {
    eyebrow: "WHO WE ARE",
    headingLead: "Building Homes,",
    headingAccent: "Building Legacies",
    body: "Your premier housing solutions partner — creating modern, secure and beautifully finished homes across Kenya.",
    backgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
};

const storyDefaults = {
    eyebrow: "OUR STORY",
    heading: "Homes You Will Love, Terms You Can Afford",
    paragraphs: [
        "Equity Premier Housing Solutions was founded on a simple idea: a quality home should be within reach for every hardworking family. We design and build modern homes with premium finishes in secure, well-connected locations.",
        "Our current development is a collection of elegant 3-bedroom, all-ensuite maisonettes in Mamburi, Malindi — along the Lamu Highway, just 10 minutes from Malindi Town — priced at KSh 5.7M with a KSh 2M booking.",
        "Beyond homes, we are building Echoes of Afrika, a cultural and eco-tourism hub that preserves heritage and empowers local communities. Visit us at SpurMall Ruiru Kimbo to start your journey.",
    ],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    ctaLabel: "View homes",
    ctaHref: "/properties",
    stats: [
        { value: "KSh 5.7M", label: "Maisonettes from" },
        { value: "KSh 2M", label: "Booking to secure yours" },
        { value: "Malindi", label: "Current development" },
    ],
};

export default async function AboutPage() {
    const sections = await getSections();
    const merge = <T,>(key: string, defaults: T): T =>
        sections[key] && Object.keys(sections[key]).length
            ? ({ ...defaults, ...sections[key] } as T)
            : defaults;

    const hero = merge("about_hero", heroDefaults);
    const story = merge("about_story", storyDefaults);

    return (
        <main>
            <HeroSection content={hero} variant="compact" align="left" heightClass="min-h-[480px]" />

            <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-16 md:py-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="relative h-[420px] rounded-2xl overflow-hidden">
                        <Image src={story.image} alt="Homes by Equity Premier" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="size-1.5 bg-gold"></span>
                            <span className="text-sm text-navy tracking-wide">{story.eyebrow}</span>
                        </div>
                        <h2 className="text-3xl md:text-[40px]/12 text-navy font-medium mt-4">{story.heading}</h2>
                        {story.paragraphs.map((p: string, i: number) => (
                            <p key={i} className="text-charcoal/70 mt-4 leading-relaxed">{p}</p>
                        ))}
                        <Link href={story.ctaHref} className="inline-flex items-center gap-2 mt-7 bg-navy hover:bg-navy-light text-white px-6 py-3 rounded-full text-sm transition-colors">
                            {story.ctaLabel} <MoveRight size={16} />
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
                    {story.stats.map((s: { value: string; label: string }, i: number) => {
                        const Icon = ICONS[i % ICONS.length];
                        return (
                            <div key={s.label} className="bg-cream rounded-2xl p-7 flex items-center gap-4">
                                <div className="flex items-center justify-center size-12 rounded-xl bg-gold text-navy shrink-0"><Icon className="size-6" /></div>
                                <div>
                                    <p className="text-2xl text-navy font-medium">{s.value}</p>
                                    <p className="text-charcoal/60 text-sm">{s.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <VisionMission content={merge<VisionMissionContent>("vision_mission", visionMissionDefaults)} />
            <CoreValues content={merge<CoreValuesContent>("core_values", coreValuesDefaults)} />

            <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-20">
                <div className="max-w-7xl mx-auto bg-navy rounded-3xl px-6 py-14 md:p-16 text-center relative overflow-hidden">
                    <span className="pointer-events-none select-none absolute -bottom-8 right-4 text-[140px] md:text-[220px] font-semibold leading-none text-white/[0.04]">IR</span>
                    <div className="relative">
                        <h2 className="text-3xl md:text-5xl text-white font-medium max-w-2xl mx-auto leading-tight">Let&rsquo;s build your future together</h2>
                        <p className="text-white/70 max-w-xl mx-auto mt-4">Whether you&rsquo;re buying your first home or investing in Africa&rsquo;s growth, our team is ready to help.</p>
                        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                            <Link href="/properties" className="bg-gold hover:bg-gold-dark text-navy font-medium px-6 py-3 rounded-full text-sm transition-colors">Browse developments</Link>
                            <Link href="/contact" className="border border-white/30 hover:border-gold text-white px-6 py-3 rounded-full text-sm transition-colors">Get in touch</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
