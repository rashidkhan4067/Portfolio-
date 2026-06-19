# Portfolio UI — Design Aim

**Site**: Muhammad Rashid Shafique — Systems Engineer & Full-Stack Developer portfolio
**Direction**: Google Material (restrained, current era) — minimal, flat, professional. Not glassmorphism, not vibe-coded.

---

## Why this direction

At 13–19 the goal was looking decent through brands — the logo did the talking. At 21 the goal is a clean watch — quiet, well-made, no logo needed. The same shift applies here: this site started with 3D cards, glassmorphism, gradient text, floating glass badges. That was using every technique because it was new and exciting. Now the goal is restraint — confidence that the real work (VidSnap, Al Shifaa HMS) and the real content don't need ornamentation to look credible.

**Rule of thumb**: if I have to ask "does this serve the content or is it just decoration," it's decoration. Cut it.

---

## Token system (current state)

**Color**
- Light mode background: `#FAFAFA`
- Dark mode background: `#0A0A0A`
- Text (light): near-black, `#1A1A1A`
- Text (dark): off-white
- Accent: blue, `#1A73E8`-range — used only for active nav text, links, primary CTA fill
- Borders: hairline 1px, `#E5E5E5`-range (light) / `#2A2A2A`-range (dark)

**Type**
- Clean grotesk / system sans
- Name (h1): ~64px desktop → 36–40px mobile, line-height ~1.15
- Eyebrow label: uppercase, accent blue, letter-spaced
- Body: standard grey-on-background, no pure black

**Components**
- Buttons: flat fill (primary) / flat 1px outline (secondary), max 6–8px radius, zero shadow
- Photo container: hairline border, zero shadow, 8px max radius, image fills edge-to-edge, backdrop matched as closely as possible to page background
- Nav: active link = color change only, no pill/background; Resume = flat filled button

---

## Banned — vibe-coded tells to never reintroduce

- Gradient text (was on the name — removed)
- Gradient mesh / blob backgrounds (was in hero — removed, recheck if it creeps back via leftover decorative divs)
- Glassmorphism / floating glass tech badges (was around the photo — removed)
- Heavy drop shadows on cards, photos, or buttons
- Rounded-everything with no sharp contrast
- Decorative numbered markers (01/02/03) unless content is a real sequence
- `vw`-based auto-shrinking text instead of real breakpoint type scale
- Centered mobile text when desktop is left-aligned without a deliberate reason (decided: stay left-aligned on mobile, matches Stripe/Linear/Vercel pattern, fits "engineer" tone over "consumer landing page" tone)

---
## Quality bar before marking a section ✅

- [ ] Zero gradients anywhere (text or background)
- [ ] One accent color only, used consistently
- [ ] Flat or near-flat shadows
- [ ] Hairline borders where separation is needed, not shadows
- [ ] Type scale deliberate across breakpoints, no vw auto-shrink
- [ ] Mobile is a real content reorder, not desktop squeezed down
- [ ] Alignment is a decision, not a framework default
- [ ] Nothing competes for attention with the one signature element on the page