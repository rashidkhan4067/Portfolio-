# Anti-Vibe-Coding Rules

Use this as a standing reference (or paste into `.cursorrules` / system prompt) for any UI work on this portfolio. The goal: every visual decision is deliberate, nothing is a default the AI reached for because it's common.

---

## Hard bans — never do these, no exceptions

1. **No gradient text.** Headlines, names, labels — solid color only. Never `background-clip: text` with a gradient.
2. **No gradient backgrounds.** No `linear-gradient`, `radial-gradient`, or gradient mesh anywhere as a section/page background. Flat `background-color` only.
3. **No glassmorphism.** No `backdrop-filter: blur()`, no frosted-glass cards, no translucent panels over busy backgrounds.
4. **No floating decorative cards.** No badges/chips/cards positioned absolutely with their own drop-shadow floating over other content "for visual interest."
5. **No heavy shadows.** Max shadow allowed: `0 1px 2px` at low opacity. Never multi-layer box-shadows, never glow effects, never colored shadows.
6. **No decorative blurred divs.** No `absolute inset-0` divs with blur/opacity used purely as atmospheric color wash.
7. **No rounded-everything.** If every element (buttons, cards, photos, badges) shares the same heavy border-radius with zero sharp/flat elements to contrast, that's a tell. Mix intentionally.
8. **No `vw`-based auto-shrinking text.** Real type scale with explicit breakpoint values only.
9. **No decorative numbered markers** (01/02/03, step circles) unless the content is a genuine sequence the reader needs ordered.
10. **No bounce/spring animation by default.** Motion is 150–250ms, eased, purposeful — never decorative bounce, never animation added just because it's easy to add.
11. **No three-stop accent color systems.** One accent color. Not an accent + a secondary accent + a tertiary highlight color all competing.
12. **No centering text on mobile just because it's mobile.** Alignment carries over from desktop unless there's a stated reason to change it.

---

## Required — every section must have these

1. **One flat background color per section**, verified in DevTools computed styles (no `background-image` present).
2. **One signature element per section.** Decide what's allowed to be bold. Everything else stays quiet.
3. **Hairline borders (1px, low-contrast) instead of shadows** wherever visual separation is needed.
4. **Real mobile content reorder**, not desktop scaled down. If a layout has a photo, badge row, or decorative element that doesn't have an honest mobile answer, that's a sign it shouldn't exist on desktop either.
5. **Explicit type scale** with named steps (e.g. h1/h2/body/caption), each with defined px values per breakpoint — never inherited/auto/clamped without a deliberate min/max.
6. **Consistent spacing grid** (8px base) — every margin/padding value should be a multiple of the base unit, not arbitrary px values.
7. **Visible keyboard focus states** and reduced-motion support respected.

---

## Self-check before accepting any AI-generated UI output

Run this checklist against every new component or section before merging:

- [ ] Does any text use a gradient? → remove
- [ ] Does any background use a gradient or blurred decorative div? → remove
- [ ] Is there more than one accent color in active use? → consolidate to one
- [ ] Are there shadows heavier than a 1–2px hairline? → flatten
- [ ] Would this exact layout look the same if I prompted "build a hero section" with zero other context? → if yes, it's a template default, revise it
- [ ] Does the mobile version have a genuinely different, deliberate structure — or is it just the desktop layout squeezed narrower?
- [ ] Is every rounded corner, every spacing value, every color choice traceable to a decision — or did it just happen to render that way?

If any answer reveals a default rather than a decision, stop and fix it before moving to the next section.

---

## How to prompt to avoid triggering these defaults

When writing prompts for Cursor/AI tools:
- Name the exact hex values, not "a neutral palette"
- Name the exact max shadow/radius values, not "subtle styling"
- Explicitly state what to remove, not just what to add — AI models default toward decoration unless told to strip it
- Reference real sites (Stripe, Google, Microsoft Fluent) as the bar, and call out specifically what *not* to do (gradients, glass, floating cards) every time, since these defaults are sticky and can quietly creep back in across edits