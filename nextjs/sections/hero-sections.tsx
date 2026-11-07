"use client";

import { useEffect, useState } from "react";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HeroContent {
    badge?: string;
    eyebrow?: string;
    heading?: string;
    headingLead?: string;
    headingAccent?: string;
    headingTail?: string;
    body: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    /** Slideshow images — cross-fade every `intervalMs`. */
    backgroundImages?: string[];
    backgroundImage?: string;
    intervalMs?: number;
}

export const heroDefaults: HeroContent = {
    badge: "3-Bed Ensuite Maisonettes in Malindi · KSh 5.7M",
    headingLead: "Your Dream Home Is",
    headingAccent: "Closer",
    headingTail: "Than You Think",
    body: "Equity Premier Housing Solutions builds and sells elegant, modern homes — starting with all-ensuite maisonettes in Mamburi, Malindi, just 10 minutes from town. Premium finishes, a secure environment and flexible financing.",
    primaryLabel: "View Homes",
    primaryHref: "/properties",
    secondaryLabel: "Book a Viewing",
    secondaryHref: "/contact",
    backgroundImages: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80",
    ],
    intervalMs: 6000,
};

export function HeroSection({
    content,
    variant = "full",
    align = "center",
    heightClass,
    className,
}: {
    content?: Partial<HeroContent>;
    variant?: "full" | "compact";
    align?: "center" | "left";
    heightClass?: string;
    className?: string;
}) {
    // Inner-page banners (compact) only show what they pass in — no homepage buttons or slideshow.
    const c = variant === "full" ? { ...heroDefaults, ...content } : ({ body: "", ...content } as HeroContent);

    // Tolerate a legacy single `backgroundImage` value from older CMS content.
    const legacy = (content as { backgroundImage?: string } | undefined)?.backgroundImage;
    const images = c.backgroundImages?.length ? c.backgroundImages : legacy ? [legacy] : (heroDefaults.backgroundImages ?? []);

    const badge = c.eyebrow ?? c.badge;
    const isHomeBadge = c.badge !== undefined && c.eyebrow === undefined;

    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (images.length < 2) return;
        const id = setInterval(
            () => setIndex((i) => (i + 1) % images.length),
            Math.max(2000, c.intervalMs || 6000)
        );
        return () => clearInterval(id);
    }, [images.length, c.intervalMs]);

    const height = heightClass ?? (variant === "full" ? "min-h-screen" : "min-h-[480px]");

    return (
        <section className={cn("relative flex w-full overflow-hidden bg-navy", align === "center" ? "items-center justify-center text-center" : "items-center justify-center text-left", height, className)}>
            {/* Cross-fading slideshow with a slow Ken Burns drift */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={images.length > 1 ? index : images[0]}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        opacity: { duration: 1.6, ease: "easeInOut" },
                        scale: { duration: 8, ease: "linear" },
                    }}
                >
                    <Image src={images[index]} alt="" fill sizes="100vw" className="object-cover" priority={index === 0} />
                </motion.div>
            </AnimatePresence>

            {/* Navy tint for brand consistency + text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            <div className={cn("relative z-10 flex flex-col px-4 md:px-16 lg:px-24 xl:px-32 w-full max-w-7xl mx-auto", variant === "full" ? "pt-28 pb-20" : "pt-32 pb-16", align === "center" ? "items-center" : "items-start")}>

                <motion.div className="inline-flex items-center gap-2 text-sm text-white pl-2 pr-4 py-1 rounded-full border border-gold/40 bg-white/15 backdrop-blur mb-4"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    {isHomeBadge ? <HomeIcon size={16} className="text-gold" /> : <span className="size-1.5 bg-gold rounded-full" />}
                    <p>{badge}</p>
                </motion.div>

                <motion.h1 className={cn("text-white font-medium leading-tight", variant === "full" ? "text-5xl md:text-[64px] max-w-3xl" : "text-4xl md:text-6xl max-w-3xl")}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                >
                    {c.heading ? c.heading : <>{c.headingLead} <span className="text-gold">{c.headingAccent}</span> {c.headingTail}</>}
                </motion.h1>

                <motion.p className={cn("text-white mt-4", variant === "full" ? "max-w-2xl text-white/90" : "max-w-xl text-white/80")}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                >
                    {c.body}
                </motion.p>

                {(c.primaryLabel || c.secondaryLabel) && (
                    <motion.div className="flex flex-wrap items-center justify-center gap-4 mt-8"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        {c.primaryLabel && c.primaryHref && (
                            <Link href={c.primaryHref} className="bg-gold hover:bg-gold-dark px-7 py-3 rounded-full shadow-lg shadow-black/20 text-navy text-sm font-medium cursor-pointer transition">
                                {c.primaryLabel}
                            </Link>
                        )}
                        {c.secondaryLabel && c.secondaryHref && (
                            <Link href={c.secondaryHref} className="border border-white/40 hover:border-gold bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full text-sm font-medium cursor-pointer transition group">
                                <div className="relative overflow-hidden">
                                    <span className="block transition-transform duration-200 group-hover:-translate-y-full">{c.secondaryLabel}</span>
                                    <span className="absolute top-0 left-0 block transition-transform duration-200 group-hover:translate-y-0 translate-y-full">{c.secondaryLabel}</span>
                                </div>
                            </Link>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Slide indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-10 flex items-center gap-2.5 z-10">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className="group p-1.5 cursor-pointer"
                        >
                            <span
                                className={`block h-[3px] rounded-full transition-all duration-500 ${
                                    i === index ? "w-10 bg-gold" : "w-5 bg-white/40 group-hover:bg-white/70"
                                }`}
                            />
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}
