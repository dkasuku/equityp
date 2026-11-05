"use client";

import { motion } from "framer-motion";
import {
    Home, Building2, Building, Hotel, Warehouse, Store, LandPlot, TreePalm, Castle, PencilRuler,
} from "lucide-react";

const ICONS = [Home, LandPlot, Warehouse, TreePalm, Hotel, Store, Building2, Building, Castle, PencilRuler];

export interface WhatWeDevelopContent {
    eyebrow: string;
    heading: string;
    body: string;
    items: { title: string; desc: string }[];
}

export const whatWeDevelopDefaults: WhatWeDevelopContent = {
    eyebrow: "WHAT WE OFFER",
    heading: "Homes & Projects Built Around You",
    body: "From family maisonettes by the coast to cultural and eco-tourism investments — we create places worth coming home to.",
    items: [
        { title: "Ensuite Maisonettes", desc: "Elegant 3-bedroom, all-ensuite maisonettes in Mamburi, Malindi." },
        { title: "Gated Communities", desc: "Secure, well-planned neighbourhoods designed for families." },
        { title: "Bungalows", desc: "Single-storey family homes with modern layouts and finishes." },
        { title: "Holiday & Coastal Homes", desc: "Homes near the beach for living, retiring or short-stay rentals." },
        { title: "Echoes of Afrika", desc: "A cultural and eco-tourism hub open to investors and creatives." },
        { title: "Commercial Developments", desc: "Mixed-use spaces in growing towns along the coast." },
        { title: "Apartments", desc: "Upcoming modern apartment projects for urban living." },
        { title: "Custom Interiors", desc: "Personalise finishes and layouts before handover." },
        { title: "Home Financing Support", desc: "Flexible payment plans and guidance on financing options." },
        { title: "Free Viewings", desc: "Visit our sites by appointment — book from our SpurMall office." },
    ],
};

export function WhatWeDevelop({ content }: { content?: Partial<WhatWeDevelopContent> }) {
    const c = { ...whatWeDevelopDefaults, ...content };

    return (
        <section className="py-16 md:py-24 px-4 md:px-16 lg:px-24 xl:px-32 w-full">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-start max-w-2xl">
                    <motion.div className="flex items-center gap-1.5"
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <span className="size-1.5 bg-gold"></span>
                        <span className="text-sm text-navy tracking-wide">{c.eyebrow}</span>
                    </motion.div>
                    <motion.h2 className="text-3xl md:text-[40px]/12 text-navy mt-4 leading-tight font-medium"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                    >
                        {c.heading}
                    </motion.h2>
                    <motion.p className="text-charcoal/70 text-sm md:text-base mt-3"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        {c.body}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 md:mt-16">
                    {c.items.map((item, index) => {
                        const Icon = ICONS[index % ICONS.length];
                        return (
                            <motion.div key={item.title + index}
                                className="group bg-white border border-zinc-100 rounded-xl p-6 hover:border-gold hover:shadow-[0_10px_30px_rgba(35,42,53,0.08)] transition-all duration-300"
                                initial={{ y: 40, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index % 3) * 0.1, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                            >
                                <div className="flex items-center justify-center size-11 rounded-lg bg-navy/5 text-navy group-hover:bg-gold group-hover:text-navy transition-colors duration-300">
                                    <Icon className="size-5" />
                                </div>
                                <h3 className="text-navy font-medium mt-5">{item.title}</h3>
                                <p className="text-charcoal/65 text-sm mt-2 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
