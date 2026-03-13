# RACLEBIT — Project Context for Gemini CLI

## Project Overview

You are building a **full-stack website rebuild** for **Raclebit**, a digital technology studio based in Indonesia. The stack is **Next.js (App Router) + PayloadCMS 3.x** with PostgreSQL as the database.

The project folder is `TestCMS` and already contains three skill directories:
- `.agents/skills/frontend-design` — Frontend design principles
- `.agents/skills/gsap` — GSAP animation integration patterns
- `.agents/skills/payload` — PayloadCMS development patterns

**READ ALL THREE SKILL FILES BEFORE WRITING ANY CODE.**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| CMS | PayloadCMS 3.x (embedded in Next.js) |
| Database | PostgreSQL — host: `localhost`, db: `pg4`, user: `postgres`, password: `root` |
| ORM | Drizzle (via Payload) |
| Styling | Tailwind CSS v4 |
| Animations | GSAP 3 + ScrollTrigger + SplitText |
| Fonts | Inter (body) + Instrument Sans (headings) via `next/font/google` |
| Language | TypeScript |

---

## Brand Identity

### Brand Essence
> "Technology that scales with clarity and creates real impact."

### Brand Name Meaning
- **Ra**cle = **B**yte + **Ter**a + **Mi**racle — precision, scale, impact

### Colors
| Name | Hex |
|---|---|
| Black (primary) | `#1B1B1B` |
| White (primary) | `#FAFAFA` |
| Monochrome only — no accent colors |

### Typography
- **Headings**: Instrument Sans (Regular, Medium, SemiBold, Bold)
- **Body / UI**: Inter (Regular, Medium, SemiBold, Bold)
- Type scale: H1=64px, H2=48px, H3=36px, H4=24px

### Brand Personality
- Calm & confident
- Analytical & structured
- Professional yet approachable
- Detail-oriented & accountable

### Voice & Tone
- Clear and direct — no fluff
- Strategic, not promotional
- Consultative and educational

---

## Website Pages & Structure

### Public-Facing Pages (Next.js frontend)

```
/                     → Home (Landing Page)
/about                → About Raclebit
/solutions            → Solutions & Engagement Models
/case-studies         → Portfolio / Case Studies (list)
/case-studies/[slug]  → Individual Case Study
/blog                 → Insights / Our Thinking (list)
/blog/[slug]          → Individual Article
/contact              → Contact Page
```

### CMS Admin
```
/admin                → PayloadCMS Admin Panel
```

---

## Home Page Sections (in order)

1. **Hero** — Full-viewport, animated headline: *"We Build Digital Systems That Last."* + subtext + CTA button "Start a Conversation"
2. **Marquee / Ticker** — Scrolling text: industries served (Financial Services / E-Commerce / Professional Services / SaaS & Startups)
3. **What We Do** — 3-column grid: System Architecture / Reliable Integrations / Maintainable Codebases
4. **Selected Work** — Case study cards (3 featured, pulled from CMS)
5. **How We Work** — 5-step process timeline (numbered, horizontal scroll or vertical accordion)
6. **Engagement Models** — 3 cards: Project-Based / Technology Partnership (Retainer) / System Audit & Assessment
7. **Insights Strip** — Latest 2–3 blog posts from CMS
8. **CTA Section** — *"Let's Build Systems That Last."* + contact prompt
9. **Footer** — Logo, nav links, contact info, social links

---

## About Page Sections

1. **Hero** — Brand statement + short manifesto
2. **Our Philosophy** — *"We believe digital products should be engineered, not improvised."*
3. **Vision & Mission** — Side-by-side or stacked
4. **Brand Values** — 4 pillars (Calm & Confident / Analytical & Structured / Professional & Approachable / Detail-Oriented & Accountable)
5. **How We Work** — Repeat process steps
6. **CTA** — Contact prompt

---

## Solutions Page Sections

1. **Hero** — Headline + description
2. **Engagement Models Detail** — 3 deep cards with descriptions
3. **Industries We Serve** — Financial Services, E-Commerce, Professional Services, SaaS & Startups
4. **Core Focus Areas** — 5 items: Scalable System Architecture / Reliable Workflows & Integrations / Maintainable Codebases / Operational Efficiency / Long-term Technical Sustainability
5. **CTA**

---

## Case Studies / Portfolio Page

- Grid of case study cards (pulled from CMS)
- Filter by industry
- Each card: client industry, problem summary, result metric

### Individual Case Study Page
- Hero with title
- Problem / Solution / Result layout
- Technologies used
- Related case studies

---

## Blog / Insights Page

- Grid of article cards (pulled from CMS)
- Categories filter
- Individual article with rich text

---

## Contact Page

- Contact form (name, email, company, message, engagement type select)
- Contact details: `contact@raclebit.com` / `+62 878 5665 5558` / `@raclebit`
- Optional: Calendly embed section

---

## PayloadCMS Collections (Data Models)

### 1. `pages` (Global Pages Content)
Fields:
- `title: text`
- `slug: text (unique)`
- `hero: group { headline, subheadline, ctaLabel, ctaLink }`
- `seo: group { metaTitle, metaDescription, ogImage }`

### 2. `case-studies`
Fields:
- `title: text`
- `slug: text`
- `industry: select [financial-services, ecommerce, professional-services, saas-startups]`
- `problem: richText`
- `solution: richText`
- `result: richText`
- `resultMetric: text` (e.g., "70% faster processing")
- `technologies: array { name: text }`
- `featured: checkbox`
- `coverImage: upload`
- `publishedAt: date`
- `status: select [draft, published]`

### 3. `blog-posts`
Fields:
- `title: text`
- `slug: text`
- `excerpt: textarea`
- `content: richText`
- `category: select [insights, case-studies, process, architecture]`
- `coverImage: upload`
- `author: text`
- `publishedAt: date`
- `status: select [draft, published]`

### 4. `site-settings` (Global)
Fields:
- `siteName: text`
- `tagline: text`
- `contactEmail: text`
- `contactPhone: text`
- `instagramHandle: text`
- `linkedinUrl: text`
- `footerText: richText`

### 5. `solutions` (Global or Collection)
Fields:
- `engagementModels: array { title, description, features: array { text } }`
- `industries: array { name, description }`
- `coreFocus: array { title, description }`

### 6. `media` (built-in Payload uploads collection)

---

## Animation Requirements (GSAP)

- **READ `.agents/skills/gsap/SKILL.md` before implementing animations**
- Hero headline: SplitText character stagger reveal on load
- Section headings: fade-up on ScrollTrigger enter
- Case study cards: staggered scale-up on scroll enter
- Process steps: sequential reveal with connecting line draw animation
- Marquee ticker: infinite horizontal GSAP loop (no CSS)
- Navigation: transparent → frosted glass on scroll (ScrollTrigger)
- Page transitions: smooth opacity + y-translate between routes
- Cursor: custom cursor with magnetic effect on interactive elements
- All animations must respect `prefers-reduced-motion`

---

## Design Direction — Awwwards Level

**Aesthetic**: Monochromatic editorial luxury. Think Pentagram, Collins, or Linear.land.

### Design Principles
- Extreme whitespace — generous padding, breathing room
- Bold typographic hierarchy — Instrument Sans for display, sized aggressively
- Grid-breaking layouts — asymmetric, overlapping elements
- Fine 1px rules / dividers as structural elements
- Numbers displayed large (e.g., "01", "02") as section markers
- Subtle noise/grain texture overlay on dark sections
- Images in 4:3 or 16:9 ratio with object-fit cover, grayscale filter with hover color reveal
- Micro-interactions on every button and link
- Mobile-first but desktop-spectacular

### Specific UI Patterns
- Sticky nav: `position: fixed`, transparent initially, `backdrop-filter: blur(12px)` + `bg-white/90` on scroll
- Hero text: very large (clamp 48px–120px), tracked tight, uppercase or mixed case
- CTA buttons: border-only (outline style) with fill-on-hover ink wipe animation
- Cards: clean white with 1px border `#E0E0E0`, subtle shadow on hover
- Footer: full black `#1B1B1B` background, white text

---

## Project Structure

```
TestCMS/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Public website routes
│   │   │   ├── layout.tsx       # Main layout with nav + footer
│   │   │   ├── page.tsx         # Home
│   │   │   ├── about/page.tsx
│   │   │   ├── solutions/page.tsx
│   │   │   ├── case-studies/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── contact/page.tsx
│   │   └── (payload)/           # CMS admin routes (auto by Payload)
│   ├── collections/
│   │   ├── CaseStudies.ts
│   │   ├── BlogPosts.ts
│   │   ├── Media.ts
│   │   └── Users.ts
│   ├── globals/
│   │   ├── SiteSettings.ts
│   │   └── Solutions.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Marquee.tsx
│   │   │   ├── WhatWeDo.tsx
│   │   │   ├── SelectedWork.tsx
│   │   │   ├── HowWeWork.tsx
│   │   │   ├── EngagementModels.tsx
│   │   │   ├── InsightsStrip.tsx
│   │   │   └── CTASection.tsx
│   │   └── ui/
│   │       ├── AnimatedText.tsx
│   │       ├── CaseStudyCard.tsx
│   │       ├── BlogCard.tsx
│   │       ├── CustomCursor.tsx
│   │       └── PageTransition.tsx
│   ├── lib/
│   │   ├── payload.ts           # Payload client/local API
│   │   └── gsap.ts              # GSAP setup + plugin registration
│   └── payload.config.ts        # Main Payload config
├── public/
│   └── fonts/ (if self-hosted)
├── payload.config.ts
├── next.config.ts
└── .env.local
```

---

## Environment Variables (.env.local)

```env
DATABASE_URI=postgresql://postgres:root@localhost:5432/pg4
PAYLOAD_SECRET=raclebit-secret-key-2024-production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Key Implementation Notes

1. **PayloadCMS 3.x uses the Next.js App Router** — no separate Express server needed. Payload runs inside Next.js via `withPayload()` in `next.config.ts`.

2. **Local API for data fetching** — Use `getPayload({ config })` from `payload` package in Server Components. No REST/GraphQL calls needed for server-side rendering.

3. **Draft/Preview mode** — Enable `versions: { drafts: true }` on collections for live preview from admin.

4. **Image handling** — Use Payload's built-in media collection + Next.js `<Image>` component.

5. **Rich Text rendering** — Use `@payloadcms/richtext-lexical/react` (`RichText` component) for rendering Lexical editor content.

6. **Seeding** — After the schema is built, seed sample data: 3 case studies, 3 blog posts, site settings.

7. **GSAP Registration** — Register ScrollTrigger and SplitText plugins in a client-side `useEffect` or in the lib/gsap.ts module with `gsap.registerPlugin()`.

8. **Answer all CLI prompts automatically** — Use `--yes` / `-y` flags for package installs. For `create-payload-app` prompts, pipe answers via stdin or use flags.

---

## Content — Existing Raclebit.com Data

### Hero Copy
- Headline: "We Build Digital Systems That Last."
- Subline: "We design and build well-architected digital systems that grow with your business. Technology partner focused on system architecture, scalability, and long-term reliability."
- CTA: "Start a Conversation"

### Case Studies (seed data)
1. **Financial Services** — Problem: Manual invoicing causing delays. Solution: Automated invoice/payment system. Result: 70% faster processing, zero human error.
2. **E-Commerce & Logistics** — Problem: Fragmented inventory across channels. Solution: Unified real-time inventory sync. Result: 99.2% inventory accuracy.
3. **Professional Services** — Problem: No resource planning system. Solution: Internal resource allocation + time tracking system. Result: Improved project profitability visibility.

### Blog Posts (seed data)
1. "Why Most Internal Systems Fail" — architectural pitfalls
2. "The Hidden Cost of Poor Architecture" — technical debt impact
3. "Security as a Foundation, Not a Feature" — security-first thinking

### Contact Info
- Email: `contact@raclebit.com`
- Phone: `+62 878 5665 5558`
- Instagram: `@raclebit`

---

## Performance & SEO

- All pages must have proper `<title>` and `<meta description>` via Next.js `generateMetadata`
- Images use `next/image` with proper `alt` tags
- Fonts preloaded via `next/font/google`
- No unused CSS — Tailwind purge enabled
- Lighthouse score target: 90+ on all metrics
