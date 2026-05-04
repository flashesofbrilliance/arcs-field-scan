import type { ScanResult } from './types';

const DNA_POOL = [
  { code: 'AG', label: 'Agency' },
  { code: 'PM', label: 'Pattern Match' },
  { code: 'SY', label: 'Synthesis' },
  { code: 'EX', label: 'Execution' },
  { code: 'NA', label: 'Narrative' },
  { code: 'GTM', label: 'Go-to-Market' },
  { code: 'OP', label: 'Operations' },
  { code: 'DS', label: 'Dissent' },
];

const RNA_POOL = [
  'Narrative synthesis',
  '0→1 systems',
  'Cross-functional gravity',
  'Adaptive translation',
  'Strategic patience',
  'Dense-signal communication',
  'Pattern-forward operator',
  'Recursive learner',
];

const DISSONANCE_POOL = [
  'May over-index on systems before relationship capital is established.',
  'Risk of perfectionism creating shipping friction.',
  'Narrative clarity can mask unresolved ambiguity at lower layers.',
  'High-agency instinct can run ahead of stakeholder alignment.',
];

const LEVERAGE_POOL = [
  'Strongest at inflection-point roles where signal extraction is scarce.',
  'Most effective when given narrative ownership early.',
  'Compound advantage builds fastest in regulated or complex domains.',
  'Network leverage multiplies when positioned as translator, not executor.',
];

const KINTSUGI_POOL = [
  'Career pivots are proof of adaptive range, not indecision.',
  'Early-stage exits encode pattern density unavailable at scale.',
  'Cross-domain fluency is the fracture that became the gold seam.',
];

const ARCHETYPES = ['Pattern Matcher', 'Executor', 'Soul Guide', 'Dissenter', 'Pragmatist'];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, count: number): T[] {
  const out: T[] = [];
  for (let i = 0; i < count; i++) out.push(arr[(seed + i * 7) % arr.length]);
  return out;
}

export function deriveScan(input: string, fileName?: string): ScanResult {
  const source = `${input} ${fileName ?? ''}`.trim();
  const seed = hash(source || 'default');
  const words = source.split(/\s+/).filter(Boolean);

  const signal = Math.min(96, 58 + (seed % 38));
  const coherence = Math.min(94, 52 + ((seed * 3) % 42));
  const volatility = Math.max(18, 72 - ((seed * 5) % 37));

  const nameMatch = source.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/);
  const roleHints = ['founder', 'product', 'design', 'strategy', 'operator', 'growth', 'regtech', 'engineer', 'counsel'];
  const matchedRole = roleHints.find((r) => source.toLowerCase().includes(r)) || 'operator';
  const role = matchedRole.charAt(0).toUpperCase() + matchedRole.slice(1);

  const orgMatch = source.match(/(?:at|@)\s+([A-Z][A-Za-z0-9\s]+)/);

  const wavePoints = Array.from({ length: 42 }, (_, i) => {
    const y = 44 + Math.sin(i / 3.2 + seed % 6) * 22 + Math.sin(i / 1.5) * 8;
    return `${i * 11},${Math.round(y)}`;
  }).join(' ');

  return {
    name: nameMatch?.[0] || fileName?.replace('.pdf', '') || 'Unknown Profile',
    role,
    org: orgMatch?.[1]?.trim() || 'Independent',
    signal,
    coherence,
    volatility,
    redThread: 'High-agency builder with recursive pattern recognition across complex systems.',
    goldenThread: 'Translates ambiguity into navigable systems, narratives, and execution vectors.',
    needle: 'Position as the operator who turns dense, unstructured signal into decisive movement.',
    archetype: ARCHETYPES[seed % ARCHETYPES.length],
    zone: 'Strategy × Product × Communication',
    dna: pick(DNA_POOL, seed, 5),
    rna: pick(RNA_POOL, seed, 4),
    dissonance: pick(DISSONANCE_POOL, seed, 2),
    leverage: pick(LEVERAGE_POOL, seed, 2),
    kintsugi: pick(KINTSUGI_POOL, seed, 2),
    decisionReceipt: `Scan initiated · ${words.length} tokens · Signal fidelity confirmed · ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
    notes: [
      'Profile suggests strong taste plus operating instinct.',
      'Best surface area is strategy × product × communication.',
      'Report should bias toward dense signal, not generic personality language.',
    ],
    wavePoints,
  };
}
