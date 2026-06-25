## Goal
Merge the "About me" content into the hero, drop the "Building AI products that scale" headline, and feature the mysterious "?" Wanted poster as the hero visual. The standalone About section becomes a stats-only band so nothing duplicates.

## Hero — new composition

Two-column layout on desktop, stacked on mobile.

```text
┌──────────────────────────────────────────────┐
│  • Open to AI engineering & founder roles    │
│                                              │
│  Left (7/12)                Right (5/12)     │
│  ───────────                ─────────────    │
│  Hi, I'm Rahul.             ┌───────────┐    │
│  AI Engineer · Team         │ — WANTED — │   │
│  Lead · Builder.            │            │   │
│                             │     ?      │   │
│  Long-form bio (from        │  (animated)│   │
│  current About): ships      │            │   │
│  production LLM + voice,    │ Identity   │   │
│  leads team at BAAP,        │ classified │   │
│  500+ users, 99% uptime…    └───────────┘    │
│                                              │
│  [Download CV] [View work] [Email]           │
│  · AI Engineer · Team Lead · Full Stack ·    │
└──────────────────────────────────────────────┘
```

Left column:
- Eyebrow badge: pulse dot + "Open to AI engineering & founder roles"
- New headline (replaces "Building AI products that scale"):
  `Hi, I'm Rahul.` then gradient line `AI engineer, team lead, builder.`
- Bio paragraph (moved from About): the "I architect and ship production AI…" copy + the shorter intro line, merged into one tight paragraph
- CTA row: Download CV (primary), View work (ghost), small "hello@…" link
- Role tag row stays

Right column (the "?" poster, polished):
- Aspect ~4/5, rounded-3xl, glass border, soft shadow-lift
- Background: grid-bg + radial primary glow + animated noise dots
- Top: `— WANTED —` kerned label + `AI Founder · Builder · Shipper`
- Center: huge animated gradient `?` (slow scale + subtle rotate), with a pulsing ring behind it
- Corner stamps: "CLASSIFIED" rotated badge top-right, "REWARD: a great hire" bottom-left chip
- Bottom: glass card → `Identity classified` / `AI Engineer · Team Lead · Pune, India`
- Subtle parallax on scroll (translateY on the poster opposite to text)

## About section — slimmed
- Remove the duplicate bio paragraph and the "?" poster (now in hero)
- Keep the eyebrow + title, replace intro with one short line
- Show only the 4 stat cards in a clean 4-up grid
- Add one secondary line: highlight reel chips (Voice AI · RAG · CV · Full-stack)

## Files
- `src/routes/index.tsx` — rewrite `Hero()` and `About()` only. No other sections touched. Imports unchanged.

## Out of scope
Marquee, Skills, Projects, Experience, Services, TechWall, Contact, Footer, theme, tokens.
