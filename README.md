# Page It Forward — Re-engagement Popup

A warm, non-pushy popup shown when a prospective member reaches Stripe checkout
but steps away without completing payment. Instead of letting them quietly
disappear, it gently surfaces the value they might have missed, lets them
self-identify what gave them pause, and offers a soft path back to checkout.

The tone is *a friend reminding you what you'd be missing* — never a salesperson.
No urgency tactics, no guilt, no emoji.

This repo contains **three independent design directions** as static HTML/CSS/JS
mockups. Each is self-contained and runnable on its own.

---

## Variations

| Folder | Name | Character |
| ------ | ---- | --------- |
| [`variation-1/`](variation-1/index.html) | **Cozy Card** | Centered, single-column, book-club intimate. Stacked option rows that unfold a response inline. |
| [`variation-2/`](variation-2/index.html) | **Editorial Split** | Two-column and roomy. Warmth + illustration on the left, a 2×2 grid of option cards and actions on the right. |
| [`variation-3/`](variation-3/index.html) | **Quiet Note** | The most understated. Soft pill chips, a single corner flamingo, the shortest copy. |

All three share the same interaction: tap a **"What gave you pause?"** option and
its tailored response expands smoothly beneath it (tap again to collapse). The
**"Something else"** option opens a free-text field that swaps to a warm
thank-you on send.

---

## How to view locally

These are plain static files — no build step.

**Option A — open directly**
Double-click any variation's `index.html`, or open it in your browser:

```
variation-1/index.html
```

**Option B — run a tiny local server** (recommended; avoids any file:// quirks):

```bash
# Python 3 (built in on macOS)
cd variation-1
python3 -m http.server 4000
# then visit http://localhost:4000

# …or with Node
npx serve variation-1
```

Repeat for `variation-2` / `variation-3`.

> The brand fonts (Fraunces + Nunito Sans) load from Google Fonts, so an internet
> connection gives the intended look. Offline, the CSS falls back to Georgia /
> system sans gracefully.

---

## Folder structure

```
pif-reengagement-popup/
├── README.md                  # this file
├── .gitignore
├── docs/
│   └── design-notes.md        # design decisions, tokens, typography
├── variation-1/               # "Cozy Card"
│   ├── index.html
│   ├── styles/main.css
│   ├── scripts/main.js
│   └── assets/
│       ├── icons/book-stack.svg
│       └── images/            # reserved for raster assets (og image, logo)
├── variation-2/               # "Editorial Split"
│   ├── index.html
│   ├── styles/main.css
│   ├── scripts/main.js
│   └── assets/
│       ├── icons/shelf-flamingo.svg
│       └── images/
└── variation-3/               # "Quiet Note"
    ├── index.html
    ├── styles/main.css
    ├── scripts/main.js
    └── assets/
        ├── icons/flamingo.svg
        └── images/
```

Each variation duplicates `scripts/main.js` and its own tokens so it can be
lifted out and run on its own.

---

## Design tokens (summary)

Full details in [`docs/design-notes.md`](docs/design-notes.md). Defined as CSS
custom properties at the top of every `styles/main.css`.

**Colours**

| Token | Hex | Use |
| ----- | --- | --- |
| `--color-navy` | `#1a2942` | App background |
| `--color-cream` | `#faf3e8` | Card background |
| `--color-navy-soft` | `#233651` | Headlines & primary text / primary CTA |
| `--color-coral` | `#e8866d` | Accent, selected option (v1 / v2) |
| `--color-pink` | `#f2b9ac` | Illustration / flamingo |
| `--color-teal` | `#4f9a94` | Reassurance chip, feedback send |
| `--color-gold` | `#c98a3a` | "Credit" icon accent |

**Typography**

- Headlines: **Fraunces** (serif) — `var(--font-serif)`
- Body / UI: **Nunito Sans** (sans-serif) — `var(--font-sans)`

---

## Implementing in Bubble

These mockups demonstrate the layout, copy, and interaction. To rebuild natively
in Bubble:

- **Option select / expand** → drive a "selected option" custom state; show the
  matching response Group (Bubble's reveal animation works fine).
- **"Something else" send** → a workflow that saves the text to your feedback
  thing, then shows the thank-you Group. (Marked in `scripts/main.js` comments.)
- **"Try checkout again"** → trigger your Stripe checkout action.
- **"Maybe later"** → close the popup but **leave the "bailed at checkout" flag
  set**, so a re-engagement email can follow up later.

---

## Copy placeholders to confirm

- **"first 14 days are free"** — assumes a trial exists. Remove or adjust if not.
- **"about one paperback a month"** — adjust to your actual price anchor.
