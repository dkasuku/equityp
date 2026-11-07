"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            toast.success("Welcome back");
            router.replace("/admin");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Brand panel */}
            <div className="hidden lg:flex flex-col justify-between bg-navy p-12 relative overflow-hidden">
                <div className="flex items-center gap-3 relative">
                    <span className="bg-white rounded-lg p-1.5"><Image src="/equity-logo.jpg" alt="Equity Premier Housing Solutions" width={48} height={48} className="h-14 w-auto object-contain" priority /></span>
                </div>
                <div className="relative">
                    <h1 className="text-4xl text-white font-medium leading-tight max-w-md">
                        Manage your developments, requests and content.
                    </h1>
                    <p className="text-white/60 mt-4 max-w-sm">
                        Your Premier Housing Solutions.
                    </p>
                </div>
                <span className="pointer-events-none select-none absolute -bottom-10 -right-4 text-[220px] font-semibold leading-none text-white/[0.04]">EP</span>
            </div>

            {/* Form */}
            <div className="flex items-center justify-center p-6 md:p-12">
                <form onSubmit={onSubmit} className="w-full max-w-sm space-y-6">
                    <Image src="/equity-logo.jpg" alt="Equity Premier Housing Solutions" width={160} height={110} className="lg:hidden h-20 w-auto object-contain mx-auto" priority />
                    <div>
                        <h2 className="text-2xl font-semibold text-navy">Admin sign in</h2>
                        <p className="text-muted-foreground text-sm mt-1.5">Enter your credentials to continue.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required autoComplete="email"
                            placeholder="admin@equitypremierhousing.com"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required autoComplete="current-password"
                            placeholder="••••••••"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Signing in…" : "Sign in"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
