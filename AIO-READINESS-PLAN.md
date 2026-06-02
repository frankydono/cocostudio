# CocoStudio AIO (AI Overview) Readiness Plan

## Goal
Make cocostudio.ph easily parsed, understood, and accurately represented by AI systems (Google AI Overviews, Bing Copilot, ChatGPT Browse, Perplexity, etc.) when users ask questions like:
- "What services does CocoStudio offer?"
- "Who is the founder of CocoStudio?"
- "How do I contact CocoStudio in the Philippines?"
- "Does CocoStudio do livestreaming in Manila?"

---

## PHASE 1: Structured Data (Schema.org) — HIGH PRIORITY

### 1.1 Homepage (`index.html`) — Expand LocalBusiness Schema
**Current:** Basic `LocalBusiness` with name, address, phone.
**Add:**
- `Organization` parent entity with `founder` (Person), `employee`, `hasOfferCatalog`
- `Service` nodes for each of the 6 core services under `makesOffer`
- `AggregateRating` (if testimonials can be structured as reviews)
- `image` array with multiple images
- `priceRange` (already present, verify accuracy)
- `hasMap` linking to Google Maps embed
- `paymentAccepted`, `currenciesAccepted`
- `foundingDate`

### 1.2 Service Pages — Add `Service` Schema
Each of the 6 service pages needs its own `Service` JSON-LD:
- `@type: Service`
- `provider` → links back to `Organization` via `@id`
- `serviceType` (e.g., "Livestreaming Services")
- `areaServed` (Quezon City, Metro Manila, Philippines)
- `hasOfferCatalog` with specific offerings
- `aggregateRating` if applicable

**Pages to update:**
- `design-services.html`
- `entertainment.html`
- `livestreaming.html`
- `production.html`
- `promotional.html`
- `web-development.html`

### 1.3 About Page — Add `Person` Schema for Founder
- `Person` for Franco Cawagas with `jobTitle`, `worksFor` → CocoStudio Org
- `alumniOf` (St. Paul University)
- `knowsAbout` array: digital entertainment, event production, livestreaming, etc.

### 1.4 All Pages — Add `BreadcrumbList` Schema
Every page should have breadcrumb structured data matching the nav hierarchy.

### 1.5 All Pages — Add `WebSite` Schema (on homepage only)
- `SearchAction` for site search (if applicable)
- `publisher` → Organization

### 1.6 Contact Page — Add `ContactPoint` Schema
Explicit `ContactPoint` with:
- `contactType`: customer service
- `telephone`, `email`, `areaServed`, `availableLanguage`
- `hoursAvailable`

### 1.7 Events/Projects — Add `Event` or `CreativeWork` Schema
- `Event` for past events with `organizer` → CocoStudio
- `ImageObject` or `VideoObject` for portfolio items

---

## PHASE 2: AI-Readable Files — HIGH PRIORITY

### 2.1 Create `llms.txt`
A plain-text file at root that summarizes the entire business for LLMs. Format:
```
# CocoStudio

> CocoStudio is a Philippines-based digital entertainment agency...

## Contact
- Email: inquiry@cocostudio.ph
- Phone: +63 917-114-7814
- Address: Symfoni Kamias, Quezon City, Philippines
- Hours: Monday-Friday 9:00-18:00

## Services
- Design Services: branding, social media, print...
- Entertainment for Events: dancers, DJs, aerialists...
...

## Founder
- Franco Cawagas, Founder & CEO
...
```

### 2.2 Create `llms-full.txt` (optional but powerful)
Complete deep-dive with every service detail, pricing philosophy, process, etc.

### 2.3 Enhance `robots.txt`
Add explicit AI bot guidance:
```
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
```

---

## PHASE 3: Semantic HTML & Content Architecture — MEDIUM PRIORITY

### 3.1 Semantic HTML Improvements
- Wrap service cards in `<article>` tags with `itemscope itemtype="https://schema.org/Service"`
- Use `<time>` tags for any dates (events, founding)
- Use `<address>` for contact info (already partially done)
- Add `role="main"`, `role="complementary"`, `role="contentinfo"` where missing
- Ensure `<main>` wraps only primary content (currently correct)

### 3.2 Heading Hierarchy Audit
Ensure every page has exactly one `<h1>` and logical `<h2>` → `<h3>` flow.

### 3.3 Entity Disambiguation
- Use `data-entity` attributes or microdata to mark up:
  - Service names
  - Person names
  - Locations
  - Phone numbers (tel: links already present - good)

---

## PHASE 4: FAQ & HowTo Content — HIGH PRIORITY

### 4.1 Add FAQ Sections to Key Pages
AI Overviews heavily favor FAQ content. Add sections to:
- **Homepage**: "What is CocoStudio?", "Where is CocoStudio located?", "What industries does CocoStudio serve?"
- **Contact**: "How do I book CocoStudio?", "What is your response time?", "Do you travel outside Quezon City?"
- **Each Service Page**: 3-5 specific FAQs

### 4.2 Mark FAQ with `FAQPage` Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What livestreaming services does CocoStudio offer?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "CocoStudio provides..."
    }
  }]
}
```

### 4.3 Add HowTo Schema Where Applicable
- "How to book CocoStudio for an event"
- "How to prepare for a livestream with CocoStudio"

---

## PHASE 5: Content Optimization for AI Parsing — MEDIUM PRIORITY

### 5.1 First-Paragraph Entity Summary
Every page should have a concise first paragraph that explicitly states:
- Who (CocoStudio)
- What (specific service)
- Where (Philippines, Quezon City, Metro Manila)
- For whom (target audience)

**Example for livestreaming.html:**
> "CocoStudio provides professional livestreaming services in Quezon City, Metro Manila, Philippines. We specialize in multi-camera live broadcasts for corporate events, concerts, brand activations, and virtual conferences."

### 5.2 Entity Consistency
Use exact same entity names everywhere:
- "CocoStudio" (not "Coco Studio" or "cocostudio")
- "Franco Cawagas" (consistent spelling)
- Service names should match exactly across all pages

### 5.3 Add `speakable` Schema (optional)
Mark key paragraphs as `speakable` for voice assistants.

---

## PHASE 6: Technical SEO for AI Crawlers — MEDIUM PRIORITY

### 6.1 Server-Side Rendering Check
Current site is static HTML (good). Ensure no critical content is JS-only.

### 6.2 Page Speed
- Core Web Vitals affect AI crawl budget
- LCP < 2.5s, CLS < 0.1
- Compress images further (WebP already used - good)

### 6.3 Mobile-First
Already responsive. Verify no content hidden on mobile.

### 6.4 XML Sitemap Enhancement
- Add `image:image` tags to sitemap for all pages
- Update `lastmod` dates when content changes
- Consider adding `news:news` if blog added later

---

## PHASE 7: Knowledge Graph & Entity Building — LONG TERM

### 7.1 Google Business Profile
Ensure GBP is claimed, verified, and linked to website.

### 7.2 Wikipedia/Wikidata
If brand grows, create Wikidata entry. Not immediate priority.

### 7.3 Social Profile Consistency
Ensure bio/description is identical across:
- Facebook
- Instagram
- LinkedIn (if exists)
- Google Business Profile

### 7.4 Backlinks with Entity Anchors
Earn links with anchor text containing "CocoStudio Philippines" or specific services.

---

## PHASE 8: Monitoring & Testing — ONGOING

### 8.1 Google Rich Results Test
Test every page after schema implementation:
https://search.google.com/test/rich-results

### 8.2 Schema Markup Validator
https://validator.schema.org/

### 8.3 Monitor AI Overview Mentions
Search: "CocoStudio Philippines", "livestreaming Quezon City", etc.
Check if AI Overviews appear and what they say.

### 8.4 Track Brand Queries
Set up Google Search Console to monitor branded queries.

---

## IMPLEMENTATION PRIORITY MATRIX

| Priority | Phase | Task | Effort |
|----------|-------|------|--------|
| P0 | 1.2 | Add Service schema to all 6 service pages | Medium |
| P0 | 1.1 | Expand LocalBusiness schema on homepage | Medium |
| P0 | 4.1 | Add FAQ sections + FAQPage schema to all pages | High |
| P0 | 2.1 | Create `llms.txt` | Low |
| P1 | 1.3 | Add Person schema for founder | Low |
| P1 | 1.4 | Add BreadcrumbList to all pages | Medium |
| P1 | 5.1 | Add entity-summary first paragraphs | Medium |
| P1 | 2.3 | Enhance robots.txt for AI bots | Low |
| P2 | 1.6 | Add ContactPoint schema | Low |
| P2 | 3.1 | Semantic HTML improvements | Medium |
| P2 | 6.4 | Sitemap enhancement | Low |
| P3 | 7.1 | Google Business Profile optimization | Medium |
| P3 | 2.2 | Create `llms-full.txt` | Medium |
| P3 | 4.3 | HowTo schema | Medium |

---

## QUICK WINS (Do Today)
1. Create `llms.txt` at root
2. Add `FAQPage` schema to homepage with 5 questions
3. Add `BreadcrumbList` schema to all pages
4. Enhance `robots.txt` with AI bot rules
5. Update sitemap `lastmod` to today's date
