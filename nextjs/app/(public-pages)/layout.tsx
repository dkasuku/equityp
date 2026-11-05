import React from 'react';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { WhatsAppButton } from '@/components/whatsapp-button';
import LenisScroll from '@/components/lenis-scroll';

export const metadata = {
    title: 'Equity Premier Housing Solutions — Modern Homes in Malindi & Beyond',
    description: 'Elegant 3-bedroom all-ensuite maisonettes in Mamburi, Malindi and investment projects by Equity Premier Housing Solutions.',
    appleWebApp: {
        title: 'Equity Premier Housing Solutions',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <LenisScroll />
            <Navbar />
            {children}
            <Footer />
            <WhatsAppButton phone="+254722602373" />
        </>
    );
}
