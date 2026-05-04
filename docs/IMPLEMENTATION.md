# ARCS Field Scan — Implementation Guide

## 1. Project Structure

```
arcs-field-scan/
├── app/
│   ├── layout.tsx          # Root layout, imports globals.css
│   ├── page.tsx            # Main page: input surface + depth selector + report router
│   ├── globals.css         # Tailwind directives + scan-line animation + body bg
│   ├── types.ts            # Shared TypeScript types: DepthMode, ScanResult
│   ├── scan.ts             # Deterministic mock scan engine
│   └── components/
│       ├── DepthSelector.tsx
│       ├── ReportLight.tsx
│       ├── ReportMedium.tsx
│       └── ReportHeavy.tsx
├── docs/
│   ├── PRD.md
│   ├── DESIGN_SYSTEM.md
│   ├── IMPLEMENTATION.md   ← this file
│   └── CLAUDE_CODE.md
├── __tests__/
│   ├── scan.test.ts        # Jest unit tests for scan.ts
│   ├── components.test.tsx # Jest + React Testing Library component tests
│   └── e2e/
│       └── scan.e2e.ts     # Puppeteer end-to-end tests
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.js
```

---

## 2. Data Flow

```
User input (textarea / file)
  │
  ▼
page.tsx: runScan()
  │  900ms delay (UX)
  ▼
scan.ts: deriveScan(input, fileName)
  │  hash(input) → seed
  │  seed → deterministic ScanResult
  ▼
ScanResult stored in useState
  │
  ▼
Depth toggle (Light / Medium / Heavy)
  │
  ▼
ReportLight | ReportMedium | ReportHeavy
  │  receives ScanResult as prop `r`
  ▼
Rendered report
```

---

## 3. ScanResult Schema

```typescript
type ScanResult = {
  // Identity
  name: string;
  role: string;
  org: string;

  // Scores (0–100)
  signal: number;
  coherence: number;
  volatility: number;

  // Threads
  redThread: string;
  goldenThread: string;
  needle: string;

  // Classification
  archetype: string;   // 'Pattern Matcher' | 'Executor' | etc.
  zone: string;        // e.g. 'Strategy × Product × Communication'

  // Expression
  dna: { code: string; label: string }[];  // e.g. { code: 'AG', label: 'Agency' }
  rna: string[];                           // e.g. 'Narrative synthesis'

  // Depth: Medium+
  dissonance: string[];
  leverage: string[];

  // Depth: Heavy only
  kintsugi: string[];
  decisionReceipt: string;
  notes: string[];

  // Visualization
  wavePoints: string;  // SVG polyline points string
};
```

---

## 4. Hash Function

The scan engine uses a deterministic integer hash so identical inputs always produce identical outputs:

```typescript
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
```

---

## 5. Adding a New Report Template

1. Add new value to `DepthMode` union in `types.ts`
2. Create `app/components/ReportYourName.tsx` — accepts `{ r: ScanResult }`
3. Add option to `DepthSelector.tsx` OPTIONS array
4. Add conditional render in `page.tsx`:
   ```tsx
   {result && depth === 'yourname' && <ReportYourName r={result} />}
   ```
5. Add unit test in `__tests__/components.test.tsx`
6. Add e2e selector assertion in `__tests__/e2e/scan.e2e.ts`

---

## 6. Replacing Mock Scan with Real LLM

Swap out `deriveScan()` in `scan.ts`:

```typescript
// Before (mock)
export function deriveScan(input: string, fileName?: string): ScanResult { ... }

// After (real)
export async function deriveScan(input: string, fileName?: string): Promise<ScanResult> {
  const response = await fetch('/api/scan', {
    method: 'POST',
    body: JSON.stringify({ input, fileName }),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json() as Promise<ScanResult>;
}
```

Create `app/api/scan/route.ts` as a Next.js Route Handler:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: NextRequest) {
  const { input } = await req.json();
  const client = new Anthropic();
  // Build structured extraction prompt → return ScanResult JSON
}
```

---

## 7. PDF Text Extraction (Future)

Install: `npm install pdfjs-dist`

```typescript
import * as pdfjsLib from 'pdfjs-dist';

export async function extractPDFText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages = await Promise.all(
    Array.from({ length: pdf.numPages }, (_, i) =>
      pdf.getPage(i + 1).then((p) => p.getTextContent())
    )
  );
  return pages
    .flatMap((p) => p.items)
    .map((item: unknown) => (item as { str: string }).str)
    .join(' ');
}
```

---

## 8. Environment Variables

```bash
# .env.local (not committed)
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_MOCK_MODE=true   # disables real API calls in dev
```

---

## 9. Running Tests

```bash
# Unit + component tests
npm run test

# E2e (requires dev server running on :3000)
npm run dev &
npm run test:e2e
```
