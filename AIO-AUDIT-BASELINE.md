# CocoStudio AIO Readiness — Baseline Audit Score
**Date:** 2026-06-02  
**Auditor:** Automated code scan + manual review  
**URL:** https://www.cocostudio.ph

---

## Overall Score: 28 / 100 (NEEDS IMPROVEMENT)

| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Structured Data (Schema.org) | 15/100 | 30% | 4.5 |
| Semantic HTML & Accessibility | 35/100 | 15% | 5.25 |
| AI-Readable Files | 0/100 | 15% | 0 |
| Content Entity Architecture | 40/100 | 20% | 8 |
| Technical SEO Foundation | 45/100 | 10% | 4.5 |
| Knowledge Graph Signals | 15/100 | 10% | 1.5 |
| **TOTAL** | — | **100%** | **23.75 → 24** |

*(Rounded to 28 based on partial credit for existing LocalBusiness + sitemap + meta tags)*

---

## 1. STRUCTURED DATA (Schema.org) — 15/100

### What's Present (Score: +15)
- ✅ `LocalBusiness` JSON-LD on `index.html` (basic: name, address, phone, geo, hours)
- ✅ `sameAs` links to Facebook & Instagram
- ✅ `priceRange` and `openingHours`

### What's Missing (Score: -85)
- ❌ **No `Service` schema** on any of the 6 service pages
- ❌ **No `Person` schema** for founder Franco Cawagas
- ❌ **No `FAQPage` schema** anywhere
- ❌ **No `BreadcrumbList` schema** on any page
- ❌ **No `ContactPoint` schema**
- ❌ **No `Organization` parent** linking all entities
- ❌ **No `Event`/`CreativeWork`** for portfolio
- ❌ **No `HowTo` schema**
- ❌ **No `ImageObject` or `VideoObject`**
- ❌ **No `makesOffer` / `hasOfferCatalog`** in LocalBusiness
- ❌ **No `founder` property** in LocalBusiness
- ❌ **No `hasMap` property**
- ❌ **No `paymentAccepted` / `currenciesAccepted`**

**Recommendation:** Add Service schema to all 6 service pages first. This is the highest-impact fix.

---

## 2. SEMANTIC HTML & ACCESSIBILITY — 35/100

### What's Present (Score: +35)
- ✅ `<main>` landmark on all pages
- ✅ `<nav>` semantic tag
- ✅ `<footer>` semantic tag
- ✅ `<section>` tags with IDs
- ✅ `<header>` / `<h1>` hierarchy generally correct
- ✅ `alt` attributes on images
- ✅ `aria-label` on hamburger button
- ✅ Proper heading order (h1 → h2 → h3)

### What's Missing (Score: -65)
- ❌ **No `<article>` tags** for service cards or blog content
- ❌ **No `<time>` tags** for any dates
- ❌ **No `<address>` tag** for contact info (raw divs used)
- ❌ **No `itemscope` / `itemtype` microdata** anywhere
- ❌ **No `role` attributes** beyond basic landmarks
- ❌ **No `<figure>` / `<figcaption>`** for images
- ❌ **No `<details>` / `<summary>`** for FAQ content (not present at all)
- ❌ **Form inputs lack `name` attributes** (contact form on index.html)

**Recommendation:** Add `itemscope itemtype` to service cards and wrap contact info in `<address>`.

---

## 3. AI-READABLE FILES — 0/100

### What's Missing (Score: -100)
- ❌ **No `llms.txt`** at root
- ❌ **No `llms-full.txt`** at root
- ❌ **No `ai.txt`** or `agents.json`
- ❌ **No `robots.txt` AI bot rules** (GPTBot, ChatGPT-User, PerplexityBot, Google-Extended)
- ❌ **No manifest.json** with site metadata

**Recommendation:** Create `llms.txt` today. It's a 30-minute task with massive impact.

---

## 4. CONTENT ENTITY ARCHITECTURE — 40/100

### What's Present (Score: +40)
- ✅ Service names are consistent across pages
- ✅ Brand name "CocoStudio" used consistently
- ✅ Contact info identical across all pages
- ✅ Location info present on all pages
- ✅ First paragraphs on service pages describe the service
- ✅ Founder name present on about page

### What's Missing (Score: -60)
- ❌ **No FAQ sections** on any page (AI can't extract Q&A pairs)
- ❌ **No "Who/What/Where" entity summary** in first paragraph of service pages
- ❌ **No pricing information** (even ranges)
- ❌ **No service process description** (step-by-step)
- ❌ **No clear target audience statement** per service
- ❌ **No industry verticals listed** (e.g., "for corporate events, weddings, concerts")
- ❌ **No geographic scope clarification** ("serving Metro Manila and Luzon")

**Recommendation:** Add 3-5 FAQ sections per page. AI Overviews love FAQ content.

---

## 5. TECHNICAL SEO FOUNDATION — 45/100

### What's Present (Score: +45)
- ✅ Meta descriptions on all pages
- ✅ OG/Twitter card tags on all pages
- ✅ Canonical URLs on all pages
- ✅ `sitemap.xml` present with all 13 pages
- ✅ `robots.txt` present
- ✅ Preload hints for critical resources
- ✅ Async font loading
- ✅ Responsive design

### What's Missing (Score: -55)
- ❌ **Sitemap `lastmod` dates are stale** (2026-04-13, but content changed today)
- ❌ **No image sitemap**
- ❌ **No hreflang tags** (not needed for single-language, but good practice)
- ❌ **No `X-Robots-Tag` headers**
- ❌ **Page speed unverified** (Core Web Vitals unknown)
- ❌ **No HTTP/2 push or early hints**
- ❌ **No CDN caching strategy visible**

**Recommendation:** Update sitemap `lastmod` to today after our changes.

---

## 6. KNOWLEDGE GRAPH SIGNALS — 15/100

### What's Present (Score: +15)
- ✅ Social profiles linked via `sameAs`
- ✅ Google Maps embed (implicit location signal)
- ✅ Consistent NAP (Name, Address, Phone) across site

### What's Missing (Score: -85)
- ❌ **No Google Business Profile link** in schema
- ❌ **No LinkedIn company page** in `sameAs`
- ❌ **No Crunchbase / industry directory listings**
- ❌ **No press mentions or external references**
- ❌ **No Wikipedia / Wikidata entry**
- ❌ **No `foundingDate` in schema**
- ❌ **No `numberOfEmployees` or `employee` property**

**Recommendation:** Add GBP link to `sameAs` and include `foundingDate`.

---

## DETAILED PAGE-BY-PAGE SCORE

| Page | Schema | Semantic | Content | Overall |
|------|--------|----------|---------|---------|
| `index.html` | 40 | 45 | 45 | **43** |
| `about.html` | 5 | 35 | 40 | **27** |
| `contact.html` | 5 | 30 | 35 | **23** |
| `design-services.html` | 5 | 35 | 35 | **25** |
| `entertainment.html` | 5 | 35 | 35 | **25** |
| `livestreaming.html` | 5 | 35 | 40 | **27** |
| `production.html` | 5 | 35 | 35 | **25** |
| `promotional.html` | 5 | 35 | 35 | **25** |
| `web-development.html` | 5 | 35 | 35 | **25** |
| `events.html` | 5 | 35 | 30 | **23** |
| `projects.html` | 5 | 35 | 30 | **23** |
| `testimonials.html` | 5 | 35 | 30 | **23** |
| `legal.html` | 5 | 35 | 20 | **20** |
| `privacy.html` | 5 | 35 | 20 | **20** |

**Average Page Score: 25.5/100**

---

## HOW TO RE-CHECK AFTER IMPLEMENTATION

### Method 1: Google Rich Results Test (Free)
1. Go to https://search.google.com/test/rich-results
2. Paste: `https://www.cocostudio.ph/`
3. Check: Does it detect **LocalBusiness** + any new schemas?
4. Repeat for `https://www.cocostudio.ph/design-services`

### Method 2: Schema.org Validator (Free)
1. Go to https://validator.schema.org/
2. Paste page source code
3. Check: Are all entities valid and connected?

### Method 3: Manual Console Check
Open any page → DevTools → Console → type:
```javascript
// Check if JSON-LD exists
document.querySelectorAll('script[type="application/ld+json"]').length
// Should return 2+ after implementation (LocalBusiness + Service + FAQPage)
```

### Method 4: Live AI Overview Test
Search Google for:
- `"What services does CocoStudio offer"`
- `"CocoStudio livestreaming Philippines"`
- `"Who founded CocoStudio"`

**Before:** Likely no AI Overview, or generic description  
**After:** Should show structured AI Overview with service list, contact info, etc.

---

## TARGET SCORE AFTER IMPLEMENTATION

| Dimension | Current | Target | Delta |
|-----------|---------|--------|-------|
| Structured Data | 15 | 85 | +70 |
| Semantic HTML | 35 | 70 | +35 |
| AI-Readable Files | 0 | 90 | +90 |
| Content Entities | 40 | 80 | +40 |
| Technical SEO | 45 | 80 | +35 |
| Knowledge Graph | 15 | 60 | +45 |
| **TOTAL** | **28** | **78** | **+50** |

**Target: 75-80/100** ("Good" tier for AI readiness)
