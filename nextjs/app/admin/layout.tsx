"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import {
    LayoutDashboard, Building2, Inbox, ImageIcon, LayoutTemplate, LogOut, ExternalLink, Newspaper, Menu, X,
} from "lucide-react";
import { clearToken, getToken } from "@/lib/api";
import { cn } from "@/lib/utils";

const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/properties", label: "Properties", icon: Building2 },
    { href: "/admin/enquiries", label: "Requests", icon: Inbox },
    { href: "/admin/blog", label: "Blog", icon: Newspaper },
    { href: "/admin/media", label: "Media", icon: ImageIcon },
    { href: "/admin/sections", label: "Site Sections", icon: LayoutTemplate },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const isLogin = pathname === "/admin/login";
    const [ready, setReady] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        if (isLogin) {
            setReady(true);
            return;
        }
        if (!getToken()) {
            router.replace("/admin/login");
            return;
        }
        setReady(true);
    }, [isLogin, pathname, router]);
    /* eslint-enable react-hooks/set-state-in-effect */

    if (isLogin) {
        return (
            <>
                {children}
                <Toaster richColors position="top-right" />
            </>
        );
    }

    if (!ready) {
        return <div className="min-h-screen grid place-items-center text-muted-foreground text-sm">Loading…</div>;
    }

    const signOut = () => { clearToken(); router.replace("/admin/login"); };

    const sidebarBody = (
        <>
            <div className="p-6 flex items-center gap-2.5">
                <span className="bg-white rounded-md p-1 shrink-0"><Image src="/equity-logo.jpg" alt="Equity Premier Housing Solutions" width={36} height={36} className="h-8 w-auto object-contain" priority /></span>
                <div className="leading-none">
                    <p className="font-semibold tracking-wide text-sm">EQUITY <span className="text-gold">PREMIER</span></p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/50 mt-1">Admin</p>
                </div>
            </div>

            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                {nav.map((item) => {
                    const Icon = item.icon;
                    const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                                active ? "bg-gold text-navy font-medium" : "text-white/70 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <Icon className="size-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 space-y-1 border-t border-white/10">
                <Link href="/" target="_blank" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                    <ExternalLink className="size-4" /> View site
                </Link>
                <button onClick={signOut} className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                    <LogOut className="size-4" /> Sign out
                </button>
            </div>
        </>
    );

    const current = nav.find((n) => (n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href)));

    return (
        <div className="min-h-screen md:flex bg-muted/40">
            {/* Desktop sidebar */}
            <aside className="w-64 shrink-0 bg-navy text-white flex-col hidden md:flex md:sticky md:top-0 md:h-screen">
                {sidebarBody}
            </aside>

            {/* Mobile top bar */}
            <header className="md:hidden sticky top-0 z-40 flex items-center justify-between gap-3 bg-navy text-white px-4 h-14">
                <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="p-2 -ml-2 rounded-md hover:bg-white/10 cursor-pointer">
                    <Menu className="size-5" />
                </button>
                <p className="text-sm font-medium truncate">{current?.label ?? "Admin"}</p>
                <span className="bg-white rounded p-0.5"><Image src="/equity-logo.jpg" alt="" width={32} height={32} className="h-7 w-auto object-contain" /></span>
            </header>

            {/* Mobile drawer */}
            <div className={cn("md:hidden fixed inset-0 z-50 transition", menuOpen ? "visible" : "invisible")}>
                <div onClick={() => setMenuOpen(false)} className={cn("absolute inset-0 bg-black/50 transition-opacity", menuOpen ? "opacity-100" : "opacity-0")} />
                <aside className={cn("absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-navy text-white flex flex-col transition-transform duration-300", menuOpen ? "translate-x-0" : "-translate-x-full")}>
                    <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="absolute top-4 right-3 p-2 rounded-md hover:bg-white/10 cursor-pointer">
                        <X className="size-5" />
                    </button>
                    {sidebarBody}
                </aside>
            </div>

            <div className="flex-1 min-w-0">
                <main className="p-4 sm:p-5 md:p-8 max-w-7xl">{children}</main>
            </div>

            <Toaster richColors position="top-right" />
        </div>
    );
}
