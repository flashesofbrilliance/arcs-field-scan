# ARCS Field Scan — Product Requirements Document

**Version:** 0.2  
**Status:** Active  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Jest · Puppeteer

---

## 1. Purpose

ARCS Field Scan is a single-page web application that accepts a LinkedIn profile (pasted text) or a PDF upload and returns an adaptive, depth-selectable field profile — a structured scan of a person's signal, coherence, archetype, threads, and expression traits.

The product surface proves the **adaptive lossless translation** concept: the same underlying scan schema renders at three fidelity levels (Light / Medium / Heavy) without re-processing.

---

## 2. Users

| User | Job To Be Done |
|---|---|
| Talent / recruiter | Fast signal triage on a candidate |
| Executive coach | Deep profile before an engagement |
| Operator / founder | Self-scan for positioning clarity |
| ARCS power user | Export scan JSON for downstream use |

---

## 3. Core User Flow

```
Land on page
  → Paste LinkedIn text OR upload PDF
  → Select depth: Light / Medium / Heavy
  → Click "Run Scan"
  → 900ms simulated processing state
  → Report renders in selected depth template
  → User can toggle depth without re-scanning
  → (Future) Export JSON / PDF
```

---

## 4. Feature Requirements

### 4.1 Input Surface
- **F-01** Textarea accepts freeform text (LinkedIn About, full profile paste, resume text)
- **F-02** PDF file input (`accept=".pdf"`) — filename displayed on selection
- **F-03** Run Scan button disabled when both inputs are empty
- **F-04** 900ms artificial delay with `Scanning…` label during processing
- **F-05** Scan can be re-triggered with new input without page reload

### 4.2 Depth Selector
- **F-06** Three options: Light · Medium · Heavy
- **F-07** Active state: `border-signal bg-signal/10 text-signal`
- **F-08** Switching depth re-renders report instantly, no re-scan
- **F-09** Default depth: `medium`
- **F-10** Each option shows label + subtitle descriptor

### 4.3 Report Templates

#### Light
- **F-11** Name, role, org, signal score (large monospace)
- **F-12** Red Thread card
- **F-13** Needle card
- **F-14** Archetype pill
- **F-15** Zone of Genius
- **F-16** DNA trait tags (monospace, signal color)

#### Medium (all of Light plus:)
- **F-17** Golden Thread card
- **F-18** Wave Core SVG (2 harmonics: cyan + red)
- **F-19** Golden Inchworm path: Red Thread → Golden Thread → Needle
- **F-20** Score modules: Signal · Coherence · Volatility with fill bars
- **F-21** Dissonance vectors (▲ prefix)
- **F-22** Leverage arcs (◆ prefix)
- **F-23** RNA expression tags (gold color)

#### Heavy (all of Medium plus:)
- **F-24** Masthead bar with all three scores inline
- **F-25** Wave Core SVG (3 harmonics: cyan + gold + red)
- **F-26** Decision Receipt (monospace, token count, date)
- **F-27** Kintsugi Map section
- **F-28** Full DNA → RNA expression rail with hover tooltips on DNA codes
- **F-29** Signal Notes list

### 4.4 Scan Logic (Mock — `app/scan.ts`)
- **F-30** Deterministic: same input always produces same output (hash-based seed)
- **F-31** Extracts name via regex `([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)`
- **F-32** Detects role hint from keyword list
- **F-33** Detects org hint via `(?:at|@)\s+([A-Z][A-Za-z0-9\s]+)`
- **F-34** Signal: `min(96, 58 + seed % 38)`
- **F-35** Coherence: `min(94, 52 + (seed*3) % 42)`
- **F-36** Volatility: `max(18, 72 - (seed*5) % 37)`
- **F-37** DNA/RNA/Dissonance/Leverage/Kintsugi drawn from deterministic pools
- **F-38** Waveform: 42 SVG points, sinusoidal with seed offset

---

## 5. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NF-01 | First Contentful Paint < 1.5s on localhost |
| NF-02 | No external API calls in mock mode |
| NF-03 | All three templates render without horizontal scroll on 375px viewport |
| NF-04 | Scan toggle (depth change) re-render < 16ms (single frame) |
| NF-05 | Zero TypeScript `any` types in production code |
| NF-06 | All Tailwind classes from defined config tokens only |

---

## 6. Out of Scope (v0)

- Real PDF text extraction (pdfjs / backend)
- LinkedIn API or scraper integration
- LLM-based scan (OpenAI / Anthropic)
- Authentication / saved scans
- Export to PDF
- Share link generation

---

## 7. Success Metrics (v0)

- All Jest unit tests pass
- All Puppeteer e2e tests pass
- Report renders correctly at all three depths on desktop + mobile
- Zero console errors in production build
