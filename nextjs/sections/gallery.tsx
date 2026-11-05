"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export interface GalleryContent {
    images: string[];
}

export const galleryDefaults: GalleryContent = {
    images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    ],
};

export function Gallery({ content }: { content?: Partial<GalleryContent> }) {
    const c = { ...galleryDefaults, ...content };
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const images = [...c.images, ...c.images];

    useEffect(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        const handleScroll = () => {
            const rect = container.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            const totalHeight = rect.height;
            const scrolled = -rect.top;
            const maxScroll = totalHeight - viewHeight;
            if (maxScroll <= 0) return;

            const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
            const limit = Math.max(0, track.scrollWidth - window.innerWidth);
            track.style.transform = `translateX(-${progress * limit}px)`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        const timer = setTimeout(handleScroll, 100);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            clearTimeout(timer);
        };
    }, [c.images.length]);

    return (
        <section ref={containerRef} className="relative h-[180vh] w-full">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <div ref={trackRef} className="flex gap-5 px-4 md:px-16 lg:px-24 xl:px-32 py-16 md:py-20 will-change-transform transition-transform duration-300 ease-out">
                    {images.map((src, index) => (
                        <Image key={index} src={src} alt={`Gallery image ${index + 1}`} width={364} height={457}
                            className="object-cover shrink-0 pointer-events-none rounded-xl h-[457px] w-[364px]" />
                    ))}
                </div>
            </div>
        </section>
    );
}
