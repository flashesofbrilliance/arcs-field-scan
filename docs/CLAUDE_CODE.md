# ARCS Field Scan — Claude Code Prompt

Use this prompt to hand off the full implementation to Claude Code in one shot.

---

## Prompt

```
You are implementing ARCS Field Scan — a Next.js 14 + TypeScript + Tailwind CSS 
single-page application. The full product spec, design system, and implementation 
guide are in /docs/. Read them before writing any code.

Your task:

1. VERIFY all files in /app/ match the spec in docs/PRD.md and docs/DESIGN_SYSTEM.md.
   Fix any mismatches silently.

2. IMPLEMENT the test suite:
   a. __tests__/scan.test.ts — Jest unit tests for app/scan.ts
   b. __tests__/components.test.tsx — React Testing Library tests for all three report
      components (ReportLight, ReportMedium, ReportHeavy) and DepthSelector
   c. __tests__/e2e/scan.e2e.ts — Puppeteer e2e tests for the full user flow

3. INSTALL required dev dependencies:
   jest, @testing-library/react, @testing-library/jest-dom, @types/jest,
   jest-environment-jsdom, ts-jest, puppeteer

4. ADD test scripts to package.json:
   "test": "jest"
   "test:e2e": "jest --testPathPattern=e2e"

5. ADD jest.config.ts at project root.

6. DO NOT modify app/types.ts, app/scan.ts, or any component logic.
   Tests should validate existing behavior, not change it.

7. All tests must pass on `npm run test`.

Constraints:
- Zero `any` types
- All Tailwind classes must exist in tailwind.config.ts token set
- No external HTTP calls in tests (mock fetch)
- Puppeteer tests assume dev server at http://localhost:3000
```

---

## Checklist for Claude Code

- [ ] Read docs/PRD.md
- [ ] Read docs/DESIGN_SYSTEM.md
- [ ] Read docs/IMPLEMENTATION.md
- [ ] Read app/types.ts
- [ ] Read app/scan.ts
- [ ] Read app/components/*.tsx
- [ ] Write __tests__/scan.test.ts
- [ ] Write __tests__/components.test.tsx
- [ ] Write __tests__/e2e/scan.e2e.ts
- [ ] Write jest.config.ts
- [ ] Update package.json with test deps + scripts
- [ ] Run npm run test → all green
