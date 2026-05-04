# ARCS Field Scan — Design System Spec

**Stack:** Tailwind CSS 3.4 · TypeScript · Next.js App Router

---

## 1. Color Tokens

All tokens are defined in `tailwind.config.ts` under `theme.extend.colors`.

| Token | Hex | Usage |
|---|---|---|
| `void` | `#050505` | Page background |
| `panel` | `#111111` | Card backgrounds |
| `signal` | `#00F0FF` | Active data, score ≥90, dominant wave, active depth selector |
| `amber` | `#FFD700` | Warnings, Coherence score, Kairos badge, Golden Thread |
| `vermillion` | `#FF4500` | Dissonance vectors, Volatility score, interference wave |
| `gold` | `#C9A84C` | Golden Thread, Kintsugi map, RNA tags, leverage arcs |
| `thread` | `#FF0055` | Red Thread card accent |
| `dim` | `#888888` | Secondary text, labels, placeholders |

### Body background
```css
body {
  background: #050505;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

---

## 2. Typography

| Role | Class | Notes |
|---|---|---|
| Page title | `text-2xl font-semibold` | White |
| Section label | `text-xs uppercase tracking-[0.25em] text-dim` | All-caps micro-label |
| Score (large) | `font-mono text-4xl` | Colored by score band |
| Score (masthead) | `font-mono text-4xl` | Side-by-side in Heavy header |
| Body copy | `text-sm leading-6 text-zinc-100` | Card prose |
| Meta / notes | `text-sm text-zinc-300` | Lists, notes |
| Decision receipt | `font-mono text-xs text-dim` | Monospace stamp |
| DNA tags | `font-mono text-sm text-signal` | Short uppercase codes |
| ARCS system label | `text-xs uppercase tracking-[0.3em] text-signal` | Top-left brand mark |

Font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`  
Mono stack: `'SF Mono', 'Courier New', monospace`

---

## 3. Spacing & Layout

| Context | Value |
|---|---|
| Page max-width | `max-w-7xl` (1280px) |
| Page padding | `px-6 py-8` |
| Component gap | `gap-6` |
| Card padding | `p-5` (small), `p-6` (standard) |
| Border radius | `rounded-2xl` (cards), `rounded-3xl` (sections), `rounded-full` (pills/tags) |

---

## 4. Border System

| Component | Border |
|---|---|
| Default card | `border border-white/10` |
| Red Thread card | `border border-thread` |
| Golden Thread card | `border border-gold` |
| Needle / Signal card | `border border-signal` |
| Dissonance section | `border border-vermillion/30` |
| Leverage section | `border border-gold/30` |
| Kintsugi section | `border border-gold/20` |
| Active depth selector | `border-signal bg-signal/10` |
| Inactive depth selector | `border-white/10 bg-panel` |

---

## 5. Component Anatomy

### Score Module (`Metric` component)
```
┌──────────────────────────────────┐
│  LABEL (xs, tracking, dim)       │
│  96 (mono, 4xl, colored)         │
│  ░░░░░░░░░░░░░░░░ (fill bar 1.5h)│
└──────────────────────────────────┘
```
Fill bar: `h-1.5 rounded-full bg-white/10` container, inner div width = `${value}%`

### Thread Card
```
┌──────────────────────────────────┐  ← border-{color}
│  LABEL (xs, tracking, dim)       │
│                                  │
│  Body text (sm, leading-6,       │
│  zinc-100)                       │
└──────────────────────────────────┘
```

### DNA Tag
```
[ AG ]   ← rounded-full border border-signal/30 px-4 py-2 font-mono text-sm text-signal
```
Heavy mode: wraps in `group relative` div with absolute tooltip on hover.

### RNA Tag
```
[ Narrative synthesis ]  ← rounded-full border border-gold/30 px-4 py-2 text-sm text-gold
```

### Golden Inchworm Path
```
[Red Thread] → [Golden Thread] → [Needle]
```
Each node: `rounded-full border px-3 py-1` with matching accent color.
Arrows: plain `→` in `text-dim`.

---

## 6. Wave Core SVG

**ViewBox:** `0 0 462 100` (Light/Medium) · `0 0 462 100` (Heavy)  
**Points:** 42 data points, `x = i * 11`, `y` = sinusoidal with seed offset

| Layer | Stroke | Width | Opacity |
|---|---|---|---|
| Dominant (cyan) | `#00F0FF` | `2.5` | `1` |
| Harmonic 2 (gold) | `#FFD700` | `1` | `0.4` — Heavy only |
| Dissonance (red) | `#FF4500` | `1.2` | `0.5` |

---

## 7. Scan Line Animation

Applied via `.scan-line` class on the Wave Core container.

```css
.scan-line::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateY(-100%);
  background: linear-gradient(180deg, transparent, rgba(0,240,255,0.12), transparent);
  animation: scan 4s linear infinite;
}
@keyframes scan {
  to { transform: translateY(100%); }
}
```

---

## 8. Depth Selector States

```tsx
// Active
'border-signal bg-signal/10 text-signal'

// Inactive
'border-white/10 bg-panel text-dim hover:border-white/20 hover:text-white'
```

---

## 9. Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| Default (mobile) | Single column, full-width cards |
| `sm` (640px) | Thread + Needle cards go side-by-side in Light |
| `md` (768px) | Input row goes horizontal; DNA/RNA grid 2-col |
| `lg` (1024px) | 3-col layout for Medium + Heavy wave section |

---

## 10. Shadow / Glow

```js
// tailwind.config.ts
boxShadow: {
  glow: '0 0 0 1px rgba(0,240,255,0.3), 0 0 24px rgba(0,240,255,0.12)',
}
```
Applied to Score modules in Light template.
