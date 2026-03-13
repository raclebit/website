# RACLEBIT — Build TODO List for Gemini CLI

> **CRITICAL RULES BEFORE STARTING:**
> 1. READ `.agents/skills/payload/SKILL.md` completely before any Payload code
> 2. READ `.agents/skills/gsap/SKILL.md` completely before any animation code  
> 3. READ `.agents/skills/frontend-design/SKILL.md` completely before any UI code
> 4. Always use `--yes` / `-y` flags to auto-answer CLI prompts
> 5. Focus on writing code first — do NOT run `npm run dev` or test until explicitly told
> 6. When `pnpm` or `npm` asks interactive questions, answer with defaults or pipe `y\n`

---

## PHASE 1 — Project Initialization

- [ ] **1.1** Read all three skill files in `.agents/skills/` (payload, gsap, frontend-design) before writing any code
- [ ] **1.2** Check if `package.json` exists in root. If not, initialize PayloadCMS 3 project:
  ```bash
  npx create-payload-app@latest . --template website --db postgres --no-git -y
  ```
  If project already exists, skip to 1.3.
- [ ] **1.3** Install all required dependencies:
  ```bash
  pnpm add gsap @gsap/react
  pnpm add -D @types/node
  ```
- [ ] **1.4** Create `.env.local` with:
  ```
  DATABASE_URI=postgresql://postgres:root@localhost:5432/pg4
  PAYLOAD_SECRET=raclebit-secret-key-2024-production
  NEXT_PUBLIC_SITE_URL=http://localhost:3000
  ```
- [ ] **1.5** Update `next.config.ts` to use `withPayload()` wrapper (follow payload skill instructions)
- [ ] **1.6** Configure `tailwind.config.ts` — add custom font variables for Inter and Instrument Sans

---

## PHASE 2 — PayloadCMS Collections & Globals

- [ ] **2.1** Create `src/collections/Users.ts` — admin users collection with email/password auth
- [ ] **2.2** Create `src/collections/Media.ts` — media uploads collection with image sizes (thumbnail: 400x300, card: 800x600, hero: 1600x900)
- [ ] **2.3** Create `src/collections/CaseStudies.ts` with fields:
  - `title` (text, required)
  - `slug` (text, unique, auto-generated from title)
  - `industry` (select: financial-services | ecommerce | professional-services | saas-startups)
  - `problem` (richText / Lexical)
  - `solution` (richText / Lexical)
  - `result` (richText / Lexical)
  - `resultMetric` (text — e.g. "70% faster processing")
  - `technologies` (array of `{ name: text }`)
  - `featured` (checkbox, default: false)
  - `coverImage` (upload → Media)
  - `publishedAt` (date)
  - `status` (select: draft | published, default: draft)
  - Enable `versions: { drafts: true }`
  - Add `access` rules: read = published only for public
- [ ] **2.4** Create `src/collections/BlogPosts.ts` with fields:
  - `title` (text, required)
  - `slug` (text, unique)
  - `excerpt` (textarea)
  - `content` (richText / Lexical with all features)
  - `category` (select: insights | process | architecture | announcements)
  - `coverImage` (upload → Media)
  - `author` (text)
  - `publishedAt` (date)
  - `status` (select: draft | published)
  - Enable `versions: { drafts: true }`
- [ ] **2.5** Create `src/globals/SiteSettings.ts` — global config (siteName, tagline, email, phone, instagram, linkedin, footerText)
- [ ] **2.6** Create `src/globals/SolutionsContent.ts` — global for engagement models + industries + core focus items (all as arrays with title + description)
- [ ] **2.7** Update `src/payload.config.ts`:
  - Register all collections: `[Users, Media, CaseStudies, BlogPosts]`
  - Register globals: `[SiteSettings, SolutionsContent]`
  - Set db: `postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } })`
  - Set editor: `lexicalEditor({ features: ... })` (rich text)
  - Set admin: `{ user: Users.slug }`
  - Set `sharp` for image processing
  - Enable CORS for `localhost:3000`

---

## PHASE 3 — Library Utilities

- [ ] **3.1** Create `src/lib/payload.ts` — exports `getPayloadClient()` for local API usage in Server Components:
  ```ts
  import { getPayload } from 'payload'
  import config from '@payload-config'
  export const getPayloadClient = async () => getPayload({ config })
  ```
- [ ] **3.2** Create `src/lib/gsap.ts` — GSAP plugin registration module (follow gsap skill). Register: `ScrollTrigger`, `SplitText`, `ScrollSmoother` if available. Export `gsap` as configured instance.
- [ ] **3.3** Create `src/lib/fonts.ts` — next/font/google setup for Inter and Instrument Sans, export CSS variable names
- [ ] **3.4** Create `src/lib/utils.ts` — utility: `cn()` for className merging (clsx + tailwind-merge), `formatDate()`, `truncate()`

---

## PHASE 4 — Layout Components

- [ ] **4.1** Create `src/components/layout/Navbar.tsx`:
  - Logo (SVG inline — recreate Raclebit wordmark: circle+square logomark + "Raclebit" text)
  - Nav links: Home / About / Solutions / Case Studies / Blog / Contact
  - "Start a Conversation" CTA button (outlined, ink-wipe hover)
  - Mobile: hamburger menu with full-screen overlay
  - GSAP: transparent → `backdrop-filter: blur(12px)` + white bg on scroll (ScrollTrigger)
  - GSAP: stagger reveal of nav items on initial load
- [ ] **4.2** Create `src/components/layout/Footer.tsx`:
  - Background: `#1B1B1B`, text: `#FAFAFA`
  - Logo (white version)
  - 4-column grid: Brand / Industries / Engagement / Get In Touch
  - Contact info: email, phone, @raclebit
  - Social links: LinkedIn, Instagram
  - Copyright: "© 2026 Raclebit. All rights reserved."
  - Fine top border line
- [ ] **4.3** Create `src/components/ui/CustomCursor.tsx`:
  - Custom circular cursor that follows mouse with `gsap.to()` lerp
  - Grows/morphs on hover over links and buttons (magnetic effect)
  - Client component with `useEffect`
  - CSS: `mix-blend-mode: difference`
- [ ] **4.4** Create `src/components/ui/PageTransition.tsx`:
  - Wraps page content
  - On route change: fade-out current page, fade-in new page
  - Uses GSAP timeline
- [ ] **4.5** Create `src/app/(frontend)/layout.tsx`:
  - Import Inter + Instrument Sans from `lib/fonts.ts`
  - Include `<Navbar>`, `<CustomCursor>`, `<Footer>`
  - Apply font CSS variables to `<html>` tag
  - Global CSS imports

---

## PHASE 5 — Home Page Sections

- [ ] **5.1** Create `src/components/sections/Hero.tsx`:
  - Full viewport height (`100svh`)
  - Massive display headline using Instrument Sans: *"We Build Digital Systems That Last."*
  - Font size: clamp(48px, 8vw, 120px), letter-spacing: -0.03em
  - Subtext: smaller Inter body text below
  - Two CTAs: "Start a Conversation" (filled black) + "View Our Work" (outlined)
  - Background: pure white `#FAFAFA`
  - GSAP SplitText: characters stagger in on load (y: 100 → 0, opacity 0 → 1)
  - Decorative element: large outlined "01" number, positioned right/bottom, semi-transparent
  - Thin horizontal divider line at bottom of hero
- [ ] **5.2** Create `src/components/sections/Marquee.tsx`:
  - Infinite horizontal ticker (GSAP `xPercent` loop, no CSS animation)
  - Items: "Financial Services" · "E-Commerce" · "Professional Services" · "SaaS & Startups" · "System Architecture" · "Scalable Systems" (repeated)
  - Text style: uppercase, Inter Medium, tracking-widest
  - Border top and bottom: 1px `#1B1B1B`
  - Background: `#1B1B1B`, text: `#FAFAFA`
  - Speed: smooth, ~60px/sec
- [ ] **5.3** Create `src/components/sections/WhatWeDo.tsx`:
  - Section heading: "What We Do" (Instrument Sans, large)
  - 3-column grid of feature blocks
  - Each block: large number (01/02/03), title, description, thin bottom border
  - Content: Scalable System Architecture / Reliable Workflows & Integrations / Maintainable Codebases
  - GSAP: stagger reveal each column on scroll enter
- [ ] **5.4** Create `src/components/sections/SelectedWork.tsx`:
  - Props: `caseStudies: CaseStudy[]` (passed from server component)
  - Section header: "Selected Work" + "View All" link aligned right
  - 3-column card grid
  - Each card: cover image (grayscale → color on hover), industry tag, title, result metric
  - Card hover: subtle scale + shadow transition
  - GSAP: cards stagger in on scroll
- [ ] **5.5** Create `src/components/sections/HowWeWork.tsx`:
  - 5-step vertical list with connecting animated line
  - Each step: large bold number + title + description
  - Steps: Business Discovery → System Architecture Blueprint → Development & Integration → Testing & Validation → Deployment & Support
  - GSAP ScrollTrigger: draw connecting line SVG as user scrolls, each step fades in sequentially
- [ ] **5.6** Create `src/components/sections/EngagementModels.tsx`:
  - 3 cards side by side
  - Cards: Project-Based Development / Technology Partnership (Retainer) / System Audit & Digital Assessment
  - Each card: title, short description, list of included items
  - Featured card (Partnership) has black background, white text
  - Hover: subtle lift effect
- [ ] **5.7** Create `src/components/sections/InsightsStrip.tsx`:
  - Props: `posts: BlogPost[]`
  - Section header: "Our Thinking"
  - Horizontal row of 2–3 blog post preview cards
  - Each card: category tag, title, excerpt, "Read More" link
  - Clean minimal card style
- [ ] **5.8** Create `src/components/sections/CTASection.tsx`:
  - Full-width dark section (`#1B1B1B`)
  - Large centered heading: "Let's Build Systems That Last."
  - Subtext: brand essence quote
  - CTA button: "Start a Conversation" (outlined white, ink-wipe on hover)
  - GSAP: text splits and animates in on scroll
- [ ] **5.9** Create `src/app/(frontend)/page.tsx` (Home):
  - Server Component
  - Fetch featured case studies via local Payload API (max 3, `featured: true`)
  - Fetch latest blog posts (max 3, published)
  - Compose all sections in order: `<Hero> <Marquee> <WhatWeDo> <SelectedWork> <HowWeWork> <EngagementModels> <InsightsStrip> <CTASection>`

---

## PHASE 6 — About Page

- [ ] **6.1** Create `src/app/(frontend)/about/page.tsx`:
  - Server Component with `generateMetadata`
  - Fetch site settings from CMS for any dynamic content
  - Sections: Hero → Philosophy → Vision & Mission → Brand Values → How We Work → CTA
- [ ] **6.2** Create `src/components/sections/about/AboutHero.tsx`:
  - Split layout: large text left, decorative geometric right
  - Headline: "We Engineer Digital Systems."
  - Subtext: brand overview paragraph
  - GSAP slide-in on load
- [ ] **6.3** Create `src/components/sections/about/Philosophy.tsx`:
  - Bold pull quote: *"Digital products should be engineered, not improvised."*
  - Supporting paragraph
  - Large decorative quotation mark in background
- [ ] **6.4** Create `src/components/sections/about/VisionMission.tsx`:
  - Two-column grid: Vision (left) | Mission (right)
  - Fine vertical divider between columns
  - Instrument Sans headings + Inter body
- [ ] **6.5** Create `src/components/sections/about/BrandValues.tsx`:
  - 4-item grid: Calm & Confident / Analytical & Structured / Professional & Approachable / Detail-Oriented & Accountable
  - Each: icon (minimal SVG), title, description

---

## PHASE 7 — Solutions Page

- [ ] **7.1** Create `src/app/(frontend)/solutions/page.tsx`:
  - Fetch `SolutionsContent` global from Payload
  - Sections: Hero → Engagement Models → Industries → Core Focus → CTA
- [ ] **7.2** Create engagement model detail cards component with expandable accordion for feature lists
- [ ] **7.3** Create industry grid with icons
- [ ] **7.4** Create core focus list (5 items with dividers)

---

## PHASE 8 — Case Studies Pages

- [ ] **8.1** Create `src/app/(frontend)/case-studies/page.tsx`:
  - Server Component — fetch all published case studies
  - Filter bar by industry (client-side filtering)
  - Grid layout of case study cards
- [ ] **8.2** Create `src/components/ui/CaseStudyCard.tsx`:
  - Image, industry badge, title, result metric, "View Project" link
  - Full styling per brand guidelines
- [ ] **8.3** Create `src/app/(frontend)/case-studies/[slug]/page.tsx`:
  - Server Component — `generateStaticParams` for all slugs
  - `generateMetadata` with case study title/description
  - Fetch single case study by slug
  - Render: hero image, industry tag, problem/solution/result sections, tech tags, related studies
  - GSAP: hero image parallax on scroll

---

## PHASE 9 — Blog Pages

- [ ] **9.1** Create `src/app/(frontend)/blog/page.tsx`:
  - Fetch all published posts
  - Grid of blog cards with category filter
- [ ] **9.2** Create `src/components/ui/BlogCard.tsx` — category, title, excerpt, date, author
- [ ] **9.3** Create `src/app/(frontend)/blog/[slug]/page.tsx`:
  - Full article layout
  - Render rich text with `<RichText>` from `@payloadcms/richtext-lexical/react`
  - Reading progress bar (GSAP ScrollTrigger driven)
  - Table of contents sidebar

---

## PHASE 10 — Contact Page

- [ ] **10.1** Create `src/app/(frontend)/contact/page.tsx`
- [ ] **10.2** Create `src/components/sections/ContactForm.tsx` (Client Component):
  - Fields: Name, Email, Company (optional), Engagement Type (select), Message
  - Submit via Server Action or API Route to send email / store in Payload (optional leads collection)
  - GSAP: form fields stagger in on load
  - Validation: required fields, email format
- [ ] **10.3** Create contact info display: email (linked), phone (linked), social links
- [ ] **10.4** Optional: Add `src/collections/Leads.ts` — store form submissions in Payload admin

---

## PHASE 11 — UI Polish & Global Styles

- [ ] **11.1** Create `src/app/globals.css`:
  - CSS custom properties for brand colors (`--color-black`, `--color-white`)
  - Font variable assignments from next/font
  - Base reset / typography defaults
  - Custom scrollbar (thin, black)
  - Selection color: black background, white text
  - Noise texture overlay class (using SVG filter or CSS)
- [ ] **11.2** Create `src/components/ui/AnimatedText.tsx`:
  - Reusable component wrapping GSAP SplitText
  - Props: `text`, `type` (words|chars|lines), `delay`, `trigger`
  - Used across all section headings
- [ ] **11.3** Create `src/components/ui/Button.tsx`:
  - Variants: `primary` (filled black), `outline` (border only), `ghost`
  - Ink-wipe hover effect using `::before` pseudo-element with `clip-path` or `scaleX`
  - Smooth 300ms transition
- [ ] **11.4** Add `prefers-reduced-motion` media query handling in GSAP setup — wrap all animations in check
- [ ] **11.5** Add loading states and skeleton screens for CMS-fetched content

---

## PHASE 12 — Seed Data

- [ ] **12.1** Create `src/seed/index.ts` — seed script to populate initial data:
  - Create admin user (email: `admin@raclebit.com`, password: `admin123`)
  - Create `SiteSettings` global with brand data
  - Create 3 Case Studies with full content from CONTEXT.md
  - Create 3 Blog Posts with full content from CONTEXT.md
  - Create `SolutionsContent` global with all engagement models, industries, core focus
- [ ] **12.2** Add `"seed": "npx ts-node --esm src/seed/index.ts"` to `package.json` scripts

---

## PHASE 13 — SEO & Metadata

- [ ] **13.1** Create `src/app/(frontend)/layout.tsx` with base metadata:
  - `title.template`: `%s | Raclebit`
  - Default description from brand guidelines
  - OG image setup
  - Twitter card meta
- [ ] **13.2** Add `generateMetadata` to every page file with page-specific title and description
- [ ] **13.3** Create `src/app/sitemap.ts` — dynamic sitemap including all published case studies and blog posts
- [ ] **13.4** Create `src/app/robots.ts`

---

## PHASE 14 — Final Integration Check

- [ ] **14.1** Verify `payload.config.ts` has all collections and globals registered
- [ ] **14.2** Verify all `import` paths are correct (no missing modules)
- [ ] **14.3** Verify all Server Components use `async/await` pattern correctly
- [ ] **14.4** Verify all Client Components have `'use client'` directive
- [ ] **14.5** Verify GSAP animations only run in Client Components or `useEffect`
- [ ] **14.6** Verify all `.env.local` variables are used — no hardcoded secrets
- [ ] **14.7** Verify `next.config.ts` uses `withPayload()` wrapper
- [ ] **14.8** Run TypeScript check: `pnpm tsc --noEmit` — fix all type errors

---

## PHASE 15 — Testing (Run LAST)

- [ ] **15.1** Run `pnpm dev` and verify the app starts on port 3000
- [ ] **15.2** Navigate to `http://localhost:3000/admin` — create first admin user
- [ ] **15.3** Run seed script: `pnpm seed`
- [ ] **15.4** Verify home page renders all sections
- [ ] **15.5** Verify all page routes return 200
- [ ] **15.6** Verify CMS admin at `/admin` allows CRUD on all collections
- [ ] **15.7** Verify GSAP animations fire correctly on scroll
- [ ] **15.8** Verify mobile responsive layout
- [ ] **15.9** Verify dark footer and navbar transitions

---

## Quick Reference — Brand Values

| Token | Value |
|---|---|
| `--color-black` | `#1B1B1B` |
| `--color-white` | `#FAFAFA` |
| Font Heading | Instrument Sans |
| Font Body | Inter |
| H1 | 64px |
| H2 | 48px |
| H3 | 36px |
| H4 | 24px |
| Letter spacing | -0.02em to -0.04em for large headings |
| Border color | `#E0E0E0` |
| Transition | 300ms ease-in-out |

---

## Important: Auto-answering CLI Prompts

When any prompt appears during install, answer as follows:
- "Would you like to install X?" → `y`
- "Which package manager?" → select `pnpm` or press Enter for default
- "Initialize git repo?" → `n`
- "Run install now?" → `y`
- "Which database?" → select `postgres`
- "Connection string?" → `postgresql://postgres:root@localhost:5432/pg4`
- "Secret?" → `raclebit-secret-key-2024`
- Any other prompt → press Enter (accept default)

Always prefer `--yes` / `--no-git` / `-y` CLI flags to skip prompts entirely.
