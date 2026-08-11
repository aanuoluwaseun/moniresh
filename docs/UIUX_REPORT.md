# MONIRESH — UIUX Audit Report
> White & Pink Editorial System | Clean, Not AI-Generic | Date: 2026-08-11 | Build: 8cf6d31

## Philosophy
**Not AI-generic:** No purple nebula gradients, no glassy neon cards, no 8-metric dashboards. MONIRESH is editorial calm: white paper + ink type + one pink accent for action. Think *Linear + Notion Paper*, not *AI wrapper*.

**Principles:** White space > decoration, typography > icons, honest empty states > fake numbers.

---

## 1. Color System

| Token | Hex | Usage | Notes |
|---|---|---|---|
| **Background** | `#FFFEFE` / `#FFF8FB` | Page bg | Warm white, not stark #FFF — easier on eyes for long reading |
| **White / Card** | `#FFFFFF` | Cards, inputs, nav | Pure white for elevation |
| **Ink 900** | `#1A0B14` | Headings, primary buttons | Deep plum-black (not pure black) — softer |
| **Ink 700** | `#4A2A3D` | Body copy | Warm charcoal |
| **Ink 500** | `#8B6B7F` | Secondary text, captions | Muted plum |
| **Moni 500** | `#FF2D78` | Primary action | One pink, used sparingly. Only CTAs, focus rings, active |
| **Moni 50** | `#FFF0F6` | Tint | Card hover, badge bg, focus ring `ring-moni-50` |
| **Moni 200** | `#FFC2D4` | Border | Card borders, dashed upload |
| **Moni 600** | `#E6005C` | Hover | Button hover `hover:bg-moni-600` |
| **Emerald** | `#059669` | Success | Only for “No fabricated” checks |

**Rule:** Pink appears on < 12% of viewport. White is king. No pink backgrounds on large sections (except one gradient CTA `pink-gradient` = `135deg #FF2D78 → #FF5A8A → #FF8FAD` used once per page max).

---

## 2. Typography Scale

Family: `Geist Sans` ( `--font-geist-sans` ) — geometric, editorial. No mono except code. Weights: 500 Medium, 700 Bold, 850-900 Black.

| Level | Size | Weight | Tracking | Leading | Example |
|---|---|---|---|---|---|
| **Display Hero** | 42px → 52px lg | 900 Black | `-0.035em` | `0.92` | Homepage `Research, / without the chaos.` — italic `font-light` for second line |
| **H1 Page** | 20–22px | 900 | `-0.02em` | `1` | Dashboard, Literature title |
| **H2 Section** | 24px / 28px | 900 | `-0.02em` | `1` | “A workspace that respects the work.” |
| **H3 Card** | 16–18px | 850-900 | `-0.015em` | `1.2` | Project title, gap card |
| **Body Large** | 17px | 500 | `0` | `1.6` | Hero subhead |
| **Body** | 14–15px | 500 | `0` | `1.8` | Cards, features |
| **Small** | 13px | 500 | `0` | `1.5` | Nav, helper |
| **Caption / Eyebrow** | 11px | 700-900 | `0.16–0.18em` uppercase | `1` | “FOR SERIOUS RESEARCHERS”, “RESEARCH OS” |
| **Mono / Code** | 11–12px | 600 | `0` | `1.6` | Boolean string `bg-ink-900` |

**Rhythm:** No `text-balance` overuse. Max line width 620px for body.

---

## 3. Shapes & Radius (Corner System)

| Shape | Radius | Where |
|---|---|---|
| **Pill** | `9999px` (`rounded-full`) | All buttons, badges, filters — signature shape. Primary CTA `px-5 py-2.5` |
| **Card Large** | `24px` (`rounded-[24px]`) | Hero preview, PRISMA, main sections |
| **Card** | `20px` (`rounded-[20px]`) | Feature grid, empty states |
| **Inner Card** | `16px` (`rounded-2xl`) | Nested white cards inside tinted |
| **Input** | `12px` (`rounded-xl`) | Signup/login `px-4 py-3` |
| **Icon Tile** | `8–12px` (`rounded-lg` → `rounded-xl`) | `h-8 w-8` logo, `h-12 w-12` empty |

**Border:** `1px solid #FFC2D4 / #FFE4EC / #FFF0F6` — never heavier. Dashed `2px` only for upload drop.

---

## 4. Spacing & Layout

- **Max width:** `1080px` (homepage, dashboard), `1400px` removed — tighter editorial column.
- **Page padding:** `px-6 lg:px-8` + `py-8`, sections `py-12 lg:py-16` (`48–64px`).
- **Grid:** Homepage 3-col features `gap-6`, dashboard `grid-cols-[1.05fr_0.95fr]` hero, internal `lg:grid-cols-[1.4fr_0.8fr]`.
- **Card padding:** `p-6 lg:p-7` (24–28px) — generous, not cramped AI dashboard.
- **Sticky nav:** `h-[64px]`, `bg-white/80 backdrop-blur-xl border-b border-pink-50`.

---

## 5. Shadows (Subtle, Not AI Glow)

```css
shadow-card: 0 4px 20px -4px rgb(255 45 120 / 0.08), 0 1px 3px 0 rgb(0 0 0 / 0.06)
shadow-pink: 0 8px 32px -8px rgb(255 45 120 / 0.35) // only primary button
card-hover: translateY(-4px) + 0 16px 48px -12px rgb(255 45 120 / 0.18)
```
No `shadow-2xl` everywhere. White cards sit flat; hover lifts 4px max.

---

## 6. Components

**Button Primary:** `bg-ink-900 → hover:bg-moni-600`, `rounded-full px-7 py-3.5`, `font-bold text-sm`, `shadow-lg shadow-ink-900/10`, icon `ArrowRight 3.5-4w`.
**Button Secondary:** `border-pink-100 bg-white hover:bg-moni-50`, same pill.
**Input:** `border-pink-100 bg-white px-4 py-3 text-sm`, `focus:border-moni-300 focus:ring-4 focus:ring-moni-50` — pink ring, not blue.
**Badge:** `rounded-full border-moni-100 bg-moni-50 px-2.5 py-1 text-[11px] font-bold text-moni-600`.
**Empty State:** `border-dashed border-pink-200 bg-[#FFFEFE] p-8 lg:p-10 text-center`, `h-12 w-12 bg-moni-50 border-moni-100` icon, honest copy.

---

## 7. Motion (Restrained)

- **Hero:** `opacity+ y 10, 0.5s` — once.
- **Cards:** `hover:translateY(-4px) 0.35s cubic-bezier(0.16,1,0.3,1)` — only on hover, not auto.
- **Progress:** none (removed fake 62% bar). No pulse/ping loops.
- `framer-motion` kept but used once per page max — not AI “everything floats”.

---

## 8. Page-by-Page Verdict

| Page | Shapes | Text | Status |
|---|---|---|---|
| **`/` Homepage** | 24px hero preview, 20px feature cards, pill CTAs | 52px hero, 28px H2, 17px body | ✅ Editorial, no stats |
| **`/signup` `/login`** | Centered 380px card, 12px inputs | 22-26px H1, 14px labels | ✅ Calm, trustworthy |
| **`/dashboard`** | 24px empty, 20px helpers | 22px H1, 11px eyebrow | ✅ Honest `—` no fake |
| **`/literature`** | 24px search, 20px empty collection | 11px uppercase label, 14px input | ✅ Example toggle only |
| **`/systematic`** | 24px PRISMA with `—` | 11px tracking for K | ✅ No 2,847 |
| **`/gaps`** | 20px dashed empty | 14px honest copy | ✅ No 92/89 |
| **`/writing`** | 20px manuscript empty | 18px H2 | ✅ No fake manuscript |
| **Global** | Pill > Rounded > Sharp hierarchy consistent | Scale 11→52, weight 500→900 consistent | ✅ No AI generic |

---

## 9. What Makes It *Not* AI Generic

1. **One accent:** AI tools use 3 gradients + glass. We use one pink, mostly white.
2. **Real empty:** AI shows 6 fake metrics. We show “No projects yet” with 3 plain entry points.
3. **Typography-first:** Hero uses `font-light italic` for poetry, not `gradient text` everywhere.
4. **No dashboard neon:** No `94/100` speedometer, no `2,284 screened in 8 min` badge.
5. **Shapes calm:** `rounded-full` pills + `20-24px` cards = editorial, not `3xl` bubbly AI.

---

## 10. Recommendations (Optional Polish)

- Keep `Geist Sans` but consider `Geist` → `Inter` for body if you want even quieter.
- Add one serif italic (e.g., `Newsreader`) for the hero second line only — currently `font-light italic` is enough.
- Keep `h-12 w-12` icon tiles at `12px` radius — don’t enlarge.
- When you add real data, show counts as `14` not `14.0` — integer honesty.

**Verdict: Clean, editorial, human. Ready to ship.**
