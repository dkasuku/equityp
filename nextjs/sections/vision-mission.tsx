"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 320, damping: 70, mass: 1 };

export interface VisionMissionContent {
    eyebrow: string;
    visionTitle: string;
    visionBody: string;
    missionTitle: string;
    missionBody: string;
    africaTitle: string;
    africaBody: string;
}

export const visionMissionDefaults: VisionMissionContent = {
    eyebrow: "OUR PURPOSE",
    visionTitle: "Our Vision",
    visionBody: "To be Kenya's most trusted housing developer — giving every family and investor a premier home and a lasting legacy.",
    missionTitle: "Our Mission",
    missionBody: "To build quality, secure and beautifully finished homes, offered with honest pricing and flexible financing, while investing in projects that celebrate African heritage.",
    africaTitle: "WHERE WE BUILD",
    africaBody: "Our current development is in Mamburi, Malindi — along the Lamu Highway, just 10 minutes from Malindi Town. Alongside it we are growing Echoes of Afrika, a cultural and eco-tourism hub on the Kenyan Coast.",
};

export function VisionMission({ content }: { content?: Partial<VisionMissionContent> }) {
    const c = { ...visionMissionDefaults, ...content };

    return (
        <section className="px-4 md:px-16 lg:px-24 xl:px-32 w-full mt-8">
            <div className="max-w-7xl mx-auto bg-navy rounded-3xl overflow-hidden relative px-6 py-16 md:p-16">
                <span className="pointer-events-none select-none absolute -top-8 right-4 text-[140px] md:text-[220px] font-semibold leading-none text-white/[0.04] tracking-tight">EP</span>

                <div className="relative">
                    <motion.div className="flex items-center gap-1.5"
                        initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }} transition={{ delay: 0.2, ...spring }}
                    >
                        <span className="size-1.5 bg-gold"></span>
                        <span className="text-sm text-gold tracking-wide">{c.eyebrow}</span>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-8">
                        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }} transition={spring}
                        >
                            <div className="flex items-center justify-center size-12 rounded-xl bg-gold text-navy">
                                <Eye className="size-6" />
                            </div>
                            <h3 className="text-2xl md:text-3xl text-white font-medium mt-6">{c.visionTitle}</h3>
                            <p className="text-white/70 text-sm md:text-base mt-3 leading-relaxed">{c.visionBody}</p>
                        </motion.div>

                        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }} transition={{ delay: 0.15, ...spring }}
                        >
                            <div className="flex items-center justify-center size-12 rounded-xl bg-gold text-navy">
                                <Target className="size-6" />
                            </div>
                            <h3 className="text-2xl md:text-3xl text-white font-medium mt-6">{c.missionTitle}</h3>
                            <p className="text-white/70 text-sm md:text-base mt-3 leading-relaxed">{c.missionBody}</p>
                        </motion.div>
                    </div>

                    <motion.div className="mt-12 pt-10 border-t border-white/10"
                        initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }} transition={{ delay: 0.2, ...spring }}
                    >
                        <h4 className="text-gold text-sm tracking-wide">{c.africaTitle}</h4>
                        <p className="text-white/80 text-sm md:text-base mt-3 leading-relaxed max-w-4xl">{c.africaBody}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
