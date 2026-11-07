"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
    {
        title: "Explore",
        links: [
            { label: "Home", href: "/" },
            { label: "Projects", href: "/properties" },
            { label: "About Us", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Listings",
        links: [
            { label: "Mamburi Maisonettes", href: "/properties/mamburi-maisonettes-malindi" },
            { label: "Echoes of Afrika", href: "/properties/echoes-of-afrika" },
            { label: "All Homes", href: "/properties" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "Our Vision", href: "/about" },
            { label: "Our Mission", href: "/about" },
            { label: "Core Values", href: "/about" },
            { label: "Get in Touch", href: "/contact" },
        ],
    },
];

const spring = { delay: 0.2, type: "spring" as const, stiffness: 320, damping: 70, mass: 1 };

export function Footer() {
    return (
        <footer className="relative bg-navy text-white pt-16 pb-8 mt-32 px-4 md:px-16 lg:px-24 xl:px-32 w-full overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-forest via-gold to-navy-light" />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">

                    {/* Left Brand Details */}
                    <div className="lg:col-span-7 flex flex-col items-start gap-6">
                        <Link href="/" className="select-none flex items-center bg-white rounded-xl p-2">
                            <Image
                                src="/equity-logo.jpg"
                                alt="Equity Premier Housing Solutions"
                                width={180}
                                height={48}
                                className="h-16 w-auto object-contain"
                                priority
                            />
                        </Link>
                        <p className="text-white/70 text-sm/5.5 max-w-md">
                            Your premier housing solutions — elegant, modern homes with premium finishes, secure environments and flexible financing. Now selling 3-bedroom ensuite maisonettes in Mamburi, Malindi.
                        </p>
                        <p className="text-gold text-sm font-medium max-w-md">
                            📞 0722 602373 &nbsp;·&nbsp; 📍 SpurMall Ruiru Kimbo, 3rd Floor, Suite T03
                        </p>
                    </div>

                    {/* Right Link Columns */}
                    <div className="lg:col-span-5 flex justify-between gap-8 flex-wrap">
                        {columns.map((col) => (
                            <div key={col.title} className="flex flex-col gap-5">
                                <span className="text-gold">{col.title}</span>
                                <div className="flex flex-col gap-3 text-xs text-white/70">
                                    {col.links.map((link) => (
                                        <motion.div key={link.label}
                                            initial={{ y: 50, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={spring}
                                        >
                                            <Link href={link.href} className="hover:text-gold transition-colors duration-200">
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-px bg-white/15"></div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-5 text-xs text-white/60">
                    <p>Copyright {new Date().getFullYear()} © Equity Premier Housing Solutions. All Rights Reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-gold transition-colors duration-200">Privacy Policy</a>
                        <a href="#" className="hover:text-gold transition-colors duration-200">Terms of Service</a>
                        <a href="#" className="hover:text-gold transition-colors duration-200">Cookie Policy</a>
                    </div>
                </div>

                {/* Decorative brand watermark */}
                <span className="pointer-events-none select-none absolute -bottom-6 right-0 text-[120px] md:text-[200px] font-semibold leading-none text-white/[0.04] tracking-tight">
                    EQUITY
                </span>
            </div>
        </footer>
    );
}
