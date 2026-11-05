// Exports the frontend's default content (properties, blog posts and section
// defaults) to backend/seed_content.json so `python seed.py` stays in sync.
//
// Usage (from nextjs/):  node --experimental-strip-types scripts/export-seed-content.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { properties } = await import(pathToFileURL(path.join(root, "data/properties.ts")).href);
const { posts } = await import(pathToFileURL(path.join(root, "data/blog.ts")).href);

// Pull a `const <name>[: Type] = { ... };` object literal out of a .tsx file.
function literal(file, name) {
    const src = readFileSync(path.join(root, file), "utf8");
    const m = src.match(new RegExp(`const ${name}(?::[^=]+)? = (\\{[\\s\\S]*?\\n\\});`));
    if (!m) throw new Error(`${name} not found in ${file}`);
    return Function(`return (${m[1]});`)();
}

const SECTIONS = [
    ["hero", "Homepage — Hero", "home", "sections/hero-sections.tsx", "heroDefaults"],
    ["stats", "Homepage — Who We Are", "home", "sections/stats.tsx", "statsDefaults"],
    ["what_we_develop", "Homepage — What We Offer", "home", "sections/what-we-develop.tsx", "whatWeDevelopDefaults"],
    ["projects", "Homepage — Featured Listings", "home", "sections/projects.tsx", "projectsDefaults"],
    ["gallery", "Homepage — Gallery Strip", "home", "sections/gallery.tsx", "galleryDefaults"],
    ["why_choose_us", "Homepage — Why Equity Premier", "home", "sections/why-choose-us.tsx", "whyChooseUsDefaults"],
    ["vision_mission", "Homepage — Vision & Mission", "home", "sections/vision-mission.tsx", "visionMissionDefaults"],
    ["core_values", "Homepage — Core Values", "home", "sections/core-values.tsx", "coreValuesDefaults"],
    ["cta", "Homepage — Call To Action", "home", "sections/call-to-action.tsx", "ctaDefaults"],
    ["contact", "Contact Form Block", "home", "sections/contact.tsx", "contactDefaults"],
    ["about_hero", "About — Hero", "about", "app/(public-pages)/about/page.tsx", "heroDefaults"],
    ["about_story", "About — Our Story", "about", "app/(public-pages)/about/page.tsx", "storyDefaults"],
    ["properties_hero", "Land for Sale — Hero", "properties", "app/(public-pages)/properties/page.tsx", "heroDefaults"],
    ["contact_hero", "Contact — Hero & Details", "contact", "app/(public-pages)/contact/page.tsx", "heroDefaults"],
    ["blog_hero", "Blog — Hero", "blog", "app/(public-pages)/blog/page.tsx", "heroDefaults"],
];

const out = {
    properties: properties.map((p) => ({
        slug: p.slug, name: p.name, tagline: p.tagline, type: p.type, status: p.status,
        location: p.location, price_from: p.priceFrom, beds: p.beds, baths: p.baths,
        size: p.size, plot: p.plot, featured: p.featured, short_desc: p.shortDesc,
        description: p.description, highlights: p.highlights, amenities: p.amenities,
        hero_image: p.heroImage, card_image: p.cardImage, gallery: p.gallery,
    })),
    posts: posts.map((p) => ({
        slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category,
        author: p.author, read_time: p.readTime, cover_image: p.coverImage,
        featured: p.featured, published: p.published, tags: p.tags, body: p.body,
        published_at: p.publishedAt,
    })),
    sections: [
        ...SECTIONS.map(([key, label, page, file, name]) => [key, label, page, literal(file, name)]),
        ["footer", "Global — Footer", "global", {
            blurb: "Your premier housing solutions — elegant, modern homes with premium finishes, secure environments and flexible financing in Malindi and beyond.",
            tagline: "Your Premier Housing Solutions.",
        }],
    ],
};

const dest = path.join(root, "../backend/seed_content.json");
writeFileSync(dest, JSON.stringify(out, null, 2) + "\n");
console.log(`wrote ${out.properties.length} properties, ${out.posts.length} posts, ${out.sections.length} sections -> ${dest}`);
