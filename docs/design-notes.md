# Design Notes

Brief rationale behind the Page It Forward re-engagement popup — the tokens, the
typography, and the choices that keep it warm rather than salesy.

---

## The brief, distilled

The popup appears when someone reached Stripe checkout and backed out. The job is
**not** to pressure them back. It's to:

1. Acknowledge stepping away without making them feel bad.
2. Quietly re-state the value they might have missed.
3. Let them tell us *why* they paused — and answer that specific worry.
4. Offer an easy way back, and an equally easy way to keep browsing.

Everything below serves that emotional arc.

---

## Colour tokens

Defined as CSS custom properties in each `styles/main.css` (`:root`). One source
of truth, easy to retheme.

| Token | Hex | Role |
| ----- | --- | ---- |
| `--color-navy` | `#1a2942` | Dimmed app background behind the modal |
| `--color-navy-deep` | `#141f33` | Primary CTA hover |
| `--color-navy-soft` | `#233651` | Headlines, body emphasis, primary CTA fill |
| `--color-cream` | `#faf3e8` | Card background |
| `--color-cream-2` | `#f4ead8` | Soft inner panels, value-icon chips |
| `--color-cream-3` | `#efe2cd` | Gradient base / hover |
| `--color-coral` | `#e8866d` | Selected option, accent stroke |
| `--color-coral-soft` | `#f0a99a` | Option hover border |
| `--color-pink` | `#f2b9ac` | Illustrations, flamingo |
| `--color-teal` | `#4f9a94` | Reassurance chip text, feedback "Send" |
| `--color-teal-soft` | `#cfe4e1` | Reassurance chip background |
| `--color-gold` | `#c98a3a` | "Earn a credit" icon |
| `--text-body` | `#6c7a8c` | Secondary / muted copy |
| `--border-soft` | `#e7d8c2` | Hairline borders on a cream surface |

**Why these:** the navy/cream pairing matches the existing onboarding screens.
Coral is reserved for the *one* thing we want a finger to land on (the selected
option), so it never competes with the navy primary CTA. Teal is the
"everything's fine" colour — used only on reassurance, never on a sell.

---

## Typography

| Role | Family | Token |
| ---- | ------ | ----- |
| Headlines | **Fraunces** (serif, optical size) | `--font-serif` |
| Body & UI | **Nunito Sans** (humanist sans) | `--font-sans` |

Fraunces has a soft, literary, slightly old-style feel that reads as "indie
bookstore" rather than "SaaS." Nunito Sans keeps the body warm and rounded.
Both load from Google Fonts with Georgia / system-sans fallbacks so the layout
never breaks offline.

Headline sizes step down per variation by density: 27px (Cozy Card) → 30px
(Editorial Split, more horizontal room) → 25px (Quiet Note, deliberately quieter).

---

## Spacing, radii, elevation

- **Spacing** is an 8-ish px scale (`--space-1`…`--space-7`) for rhythm.
- **Radii** are generous (`--radius-lg: 28px` on the card) to feel soft and
  approachable; pills use `999px`.
- **Elevation**: a single large, diffuse modal shadow (`--shadow-modal`) sells
  the "floating above a dimmed app" depth; the primary CTA gets its own smaller
  navy-tinted shadow so it reads as the one liftable surface.

---

## Interaction

- **One question, tap-to-expand.** Options are tappable cards/pills, never radio
  buttons — lower commitment, more inviting. Selecting one expands its response;
  selecting it again collapses it; opening another closes the first.
- **Smooth height animation** uses the CSS `grid-template-rows: 0fr → 1fr` trick,
  which animates real auto-height without measuring in JS.
- **`aria-expanded`** is kept in sync on each option, and the modal uses
  `role="dialog"` + `aria-modal` + `aria-labelledby` for assistive tech.
- **Reduced motion**: a `prefers-reduced-motion` block flattens animation for
  users who ask for it.

---

## Copy principles

- Open with permission, not pressure: *"Took a step back? Totally fair."*
- Benefits in plain language, in the reader's interest ("books mailed to you"),
  not feature lists.
- The price answer reframes rather than discounts: *"about the cost of one
  paperback a month."*
- No exclamation stacking, no "Don't miss out!", no countdowns, no emoji.
- The secondary action ("Maybe later") is understated — underlined text, muted
  colour — so it never visually competes with "Try checkout again," but is always
  available. Leaving is allowed.

---

## Assets

The design is fully vector. Decorative illustrations live as standalone SVGs in
each variation's `assets/icons/` (`book-stack.svg`, `shelf-flamingo.svg`,
`flamingo.svg`) and are referenced via `<img>` with relative paths.

Small functional glyphs (chevron, arrow, check, close) are kept **inline** in the
HTML on purpose: they inherit `currentColor` so they can recolour on state change
(e.g. the chevron flips to white inside the coral circle when an option is
active), which an external `<img>` can't do without extra files.

`assets/images/` is reserved for raster assets (an `og-cover.png` for social
sharing, a logo) — each `index.html` already points its `og:image` there.

---

## Open questions for the team

- Is there actually a **free trial**? Copy currently says "first 14 days are
  free." If not, that line should be cut or reworded.
- Confirm the **price anchor** ("one paperback a month") matches real pricing.
- Should "Maybe later" also trigger the follow-up **re-engagement email**, or only
  keep the flag for a scheduled job to pick up?
