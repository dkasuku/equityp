// Equity Premier Housing Solutions — housing & development listings dataset
// Images sourced from Unsplash (allowed in next.config.ts remotePatterns).

const img = (id: string, w = 1200) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type PropertyType =
    | "Maisonettes"
    | "Bungalows"
    | "Apartments"
    | "Investment Projects";

export type PropertyStatus = "Selling" | "Selling Fast" | "Few Left" | "Coming Soon" | "Open to Investors";

// Field names are kept from the original schema (and backend columns):
//   beds  -> bedrooms / unit configuration
//   baths -> bathrooms / finish
//   size  -> access / distance
//   plot  -> payment / booking terms
export interface Property {
    slug: string;
    name: string;
    tagline: string;
    type: PropertyType;
    status: PropertyStatus;
    location: string;
    priceFrom: number | null; // KES; null => Price on request
    beds: string;
    baths: string;
    size: string;
    plot: string;
    featured: boolean;
    shortDesc: string;
    description: string[];
    highlights: string[];
    amenities: string[];
    heroImage: string;
    cardImage: string;
    gallery: string[];
}

export const properties: Property[] = [
    {
        slug: "mamburi-maisonettes-malindi",
        name: "Mamburi Ensuite Maisonettes",
        tagline: "Your dream home is closer than you think",
        type: "Maisonettes",
        status: "Selling",
        location: "Mamburi, Malindi",
        priceFrom: 5700000,
        beds: "3 Bedrooms",
        baths: "All Ensuite",
        size: "10 mins from Malindi Town, along Lamu Hwy",
        plot: "Book with KSh 2M · flexible financing",
        featured: true,
        shortDesc:
            "Elegant 3-bedroom all-ensuite maisonettes along the Lamu Highway, just 10 minutes from Malindi Town. KSh 5.7M — book with KSh 2M.",
        description: [
            "Your dream home is closer than you think. Discover elegant 3-bedroom, all-ensuite maisonettes in Mamburi, Malindi — strategically located along the Lamu Highway, just 10 minutes from Malindi Town.",
            "Enjoy spacious modern living with premium finishes, customizable interiors and a secure environment. Each maisonette is priced at KSh 5.7M, and you can secure yours with a booking of KSh 2M, with flexible financing for the balance.",
        ],
        highlights: [
            "3-bedroom, all-ensuite maisonettes",
            "Price: KSh 5.7M",
            "Booking: KSh 2M",
            "10 mins from Malindi Town on Lamu Highway",
        ],
        amenities: [
            "All bedrooms ensuite",
            "Spacious modern living",
            "Premium finishes",
            "Customizable interiors",
            "Secure environment",
            "Along Lamu Highway",
            "Flexible financing",
            "Free site visits",
        ],
        heroImage: img("1600596542815-ffad4c1539a9", 1600),
        cardImage: img("1600596542815-ffad4c1539a9", 900),
        gallery: [
            img("1600585154340-be6161a56a0c"),
            img("1600607687939-ce8a6c25118c"),
            img("1600566753190-17f0baa2a6c3"),
            img("1600210492486-724fe5c67fb0"),
        ],
    },
    {
        slug: "echoes-of-afrika",
        name: "Echoes of Afrika",
        tagline: "A cultural & eco-tourism hub — be part of the legacy",
        type: "Investment Projects",
        status: "Open to Investors",
        location: "Kenyan Coast",
        priceFrom: null,
        beds: "Heritage & Tourism Hub",
        baths: "Community-led",
        size: "Eco-tourism · Arts · Investment",
        plot: "Contributor & investor packages",
        featured: true,
        shortDesc:
            "More than a destination — a movement to preserve heritage, empower local communities and build a legacy in African tourism.",
        description: [
            "Are you passionate about culture, nature and sustainable tourism? Echoes of Afrika is more than just a destination — it's a movement to preserve heritage, empower local communities and build a legacy in African tourism.",
            "We're inviting forward-thinkers, investors, creatives and visionaries to be part of our growing community as we develop a unique cultural and tourism hub. Get in touch to learn how to get involved.",
        ],
        highlights: [
            "Be part of a visionary African heritage project",
            "Connect with like-minded contributors",
            "Explore opportunities in eco-tourism, arts and investment",
            "Stay informed on progress, events and how to get involved",
        ],
        amenities: [
            "Cultural heritage preservation",
            "Sustainable eco-tourism",
            "Arts & creative spaces",
            "Local community empowerment",
            "Investment opportunities",
            "Events & progress updates",
            "Contributor network",
            "Long-term legacy project",
        ],
        heroImage: img("1516426122078-c23e76319801", 1600),
        cardImage: img("1516426122078-c23e76319801", 900),
        gallery: [
            img("1547471080-7cc2caa01a7e"),
            img("1523805009345-7448845a9e53"),
            img("1489392191049-fc10c97e64b6"),
            img("1535941339077-2dd1c7963098"),
        ],
    },
];

export const propertyTypes: PropertyType[] = [
    "Maisonettes",
    "Bungalows",
    "Apartments",
    "Investment Projects",
];

export const propertyStatuses: PropertyStatus[] = [
    "Selling",
    "Selling Fast",
    "Few Left",
    "Coming Soon",
    "Open to Investors",
];
export function getProperty(slug: string): Property | undefined {
    return properties.find((p) => p.slug === slug);
}

export function featuredProperties(): Property[] {
    return properties.filter((p) => p.featured);
}

export function formatPrice(value: number | null): string {
    if (value === null) return "Price on request";
    if (value >= 1_000_000) {
        const m = value / 1_000_000;
        return `From KES ${Number.isInteger(m) ? m : m.toFixed(1)}M`;
    }
    return `From KES ${value.toLocaleString()}`;
}
