// Static fallback used when the API is unavailable. The live content is
// served by the Flask backend and editable in the admin panel.

const img = (id: string, w = 1400) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type BlockType = "paragraph" | "heading" | "quote" | "image";

export interface Block {
    type: BlockType;
    text?: string;
    src?: string;
    caption?: string;
}

export interface Post {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    readTime: string;
    coverImage: string;
    featured: boolean;
    published: boolean;
    tags: string[];
    body: Block[];
    publishedAt: string | null;
}

const P = (text: string): Block => ({ type: "paragraph", text });
const H = (text: string): Block => ({ type: "heading", text });
const Q = (text: string): Block => ({ type: "quote", text });
const IMG = (id: string, caption = ""): Block => ({ type: "image", src: img(id), caption });

export const posts: Post[] = [
    {
        slug: "why-mamburi-malindi-is-the-place-to-own-a-home",
        title: "Why Mamburi, Malindi Is the Place to Own Your Next Home",
        excerpt: "Ten minutes from Malindi Town on the Lamu Highway, Mamburi blends coastal calm with easy access — and our 3-bedroom ensuite maisonettes start at KSh 5.7M.",
        category: "Malindi", author: "Equity Premier", readTime: "5 min read",
        coverImage: img("1600596542815-ffad4c1539a9"), featured: true, published: true,
        tags: ["Malindi", "Maisonettes", "Coast"],
        publishedAt: "2026-10-28T09:00:00Z",
        body: [
            P("Malindi has long been one of Kenya's most loved coastal towns. Mamburi, just 10 minutes away along the Lamu Highway, gives you the best of both worlds: a quiet, secure neighbourhood with town, schools, hospitals and the beach all within easy reach."),
            H("Strategically located on the Lamu Highway"),
            P("Good roads make daily life easier and help homes hold their value. Being right on the Lamu Highway means smooth commutes into Malindi Town and a direct route up the coast."),
            IMG("1600585154340-be6161a56a0c", "Modern coastal living, minutes from town."),
            H("Spacious, all-ensuite maisonettes"),
            P("Each maisonette has three bedrooms, every one ensuite, with premium finishes and interiors you can customise. Priced at KSh 5.7M, you can secure yours with a KSh 2M booking and flexible financing for the balance."),
            Q("Your dream home is closer than you think."),
        ],
    },
    {
        slug: "first-time-home-buyer-guide-kenya",
        title: "Buying Your First Home in Kenya: A Simple Step-by-Step Guide",
        excerpt: "From viewing to booking to handover — what to check, what to ask and how flexible financing works when you buy an off-plan or ready home.",
        category: "Buying Guide", author: "Equity Premier", readTime: "6 min read",
        coverImage: img("1600607687939-ce8a6c25118c"), featured: false, published: true,
        tags: ["Buying Guide", "Financing"],
        publishedAt: "2026-10-20T09:00:00Z",
        body: [
            P("Buying your first home is one of the biggest decisions you will make. Here is how to approach it with confidence."),
            H("1. Visit the site"),
            P("Always view the home or show unit in person. Look at the finishes, the neighbourhood, access roads and security."),
            H("2. Understand the price and booking"),
            P("Ask for the full price, the booking amount and the payment schedule in writing. For our Mamburi maisonettes, that is KSh 5.7M with a KSh 2M booking."),
            H("3. Review the documents"),
            P("Check the sale agreement and ownership documents with a lawyer before you commit."),
            H("4. Personalise and plan the handover"),
            P("If interiors are customisable, agree on your choices early so your home is ready the way you want it."),
        ],
    },
    {
        slug: "echoes-of-afrika-heritage-tourism-hub",
        title: "Echoes of Afrika: Building a Legacy in African Heritage Tourism",
        excerpt: "More than a destination — a movement to preserve heritage, empower local communities and grow sustainable eco-tourism. Here is how you can be part of it.",
        category: "Investment", author: "Equity Premier", readTime: "4 min read",
        coverImage: img("1516426122078-c23e76319801"), featured: false, published: true,
        tags: ["Echoes of Afrika", "Investment", "Eco-tourism"],
        publishedAt: "2026-10-12T09:00:00Z",
        body: [
            P("Are you passionate about culture, nature and sustainable tourism? Echoes of Afrika is a cultural and tourism hub being developed to preserve heritage, empower local communities and build a lasting legacy in African tourism."),
            H("Who we are inviting"),
            P("Forward-thinkers, investors, creatives and visionaries who want to be part of a growing community shaping something unique."),
            H("Why join"),
            P("Be part of a visionary African heritage project, connect with like-minded contributors, explore opportunities in eco-tourism, arts and investment, and stay informed on progress and events."),
            Q("Preserve heritage. Empower communities. Build a legacy."),
            P("Call 0722 602373 or visit us at SpurMall Ruiru Kimbo to learn how to get involved."),
        ],
    },
];

export function formatDate(iso: string | null): string {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
