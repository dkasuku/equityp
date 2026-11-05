"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Minus, Lightbulb, Building2, ShieldCheck, Leaf, Handshake } from "lucide-react";

const ICONS = [Lightbulb, Building2, ShieldCheck, Leaf, Handshake];

export interface WhyChooseUsContent {
    eyebrow: string;
    heading: string;
    body: string;
    items: { title: string; description: string; image: string }[];
}

export const whyChooseUsDefaults: WhyChooseUsContent = {
    eyebrow: "WHY EQUITY PREMIER",
    heading: "Own a Home With Confidence",
    body: "We build homes we would be proud to live in — and make the buying journey clear, secure and affordable.",
    items: [
        { title: "Premium Finishes", description: "Quality materials and modern detailing in every room, built to last for generations.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80" },
        { title: "All-Ensuite Living", description: "Every bedroom has its own bathroom — privacy and comfort for the whole family.", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80" },
        { title: "Customizable Interiors", description: "Make it yours. Choose finishes and layouts that suit your lifestyle before handover.", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80" },
        { title: "Secure Environment", description: "Homes set in a safe, well-planned neighbourhood along the Lamu Highway near Malindi Town.", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80" },
        { title: "Flexible Financing", description: "Book with KSh 2M and clear the balance on a plan that works for you. Talk to us about options.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80" },
    ],
};

export function WhyChooseUs({ content }: { content?: Partial<WhyChooseUsContent> }) {
    const c = { ...whyChooseUsDefaults, ...content };
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const heroImage = c.items[0]?.image || "/equity-logo.jpg";

    return (
        <section className="py-16 mt-28 px-4 md:px-16 lg:px-24 xl:px-32 w-full bg-cream">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
                <div className="flex flex-col">
                    <motion.div className="flex items-center gap-1.5"
                        initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }} transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <span className="size-1.5 bg-gold"></span>
                        <span className="text-sm text-navy tracking-wide">{c.eyebrow}</span>
                    </motion.div>
                    <motion.h2 className="text-3xl md:text-[40px]/12 text-navy mt-4 leading-tight font-medium max-w-100"
                        initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }} transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
                    >
                        {c.heading}
                    </motion.h2>

                    <div className="flex flex-col gap-4 mt-12 md:mt-16 w-full">
                        {c.items.map((item, index) => {
                            const isOpen = openIndex === index;
                            const Icon = ICONS[index % ICONS.length];
                            return (
                                <motion.div key={item.title + index} className="bg-white rounded-sm border border-zinc-100/50 overflow-hidden"
                                    initial={{ y: 150, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }} transition={{ delay: index * 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                                >
                                    <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full flex items-center justify-between p-4 md:py-4 md:px-6 text-left hover:bg-zinc-50/30 transition cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <Icon className="size-5 text-gold" />
                                            <span className="text-sm md:text-base text-navy font-medium">{item.title}</span>
                                        </div>
                                        {isOpen ? <Minus className="size-4 text-gold" /> : <Plus className="size-4 text-gold" />}
                                    </button>

                                    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                        <div className="overflow-hidden">
                                            <p className="p-4 md:px-10 pt-0 text-xs md:text-sm text-charcoal/70 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col justify-between">
                    <motion.p className="text-charcoal/70 text-sm md:text-base max-w-115 md:mt-20 mb-8"
                        initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }} transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        {c.body}
                    </motion.p>

                    <motion.div className="relative w-121.5 h-102.75 rounded-xl overflow-hidden shadow-sm bg-zinc-100 max-w-full"
                        initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }} transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <Image src={heroImage} alt="Homes by Equity Premier" width={486} height={411}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${openIndex === null ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                        />
                        {c.items.map((item, index) => (
                            <Image key={item.title + index} src={item.image} alt={item.title} width={486} height={411}
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${openIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
