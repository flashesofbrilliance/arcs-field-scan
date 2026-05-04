'use client';

import { useMemo, useState } from 'react';

type ScanResult = {
  name: string;
  role: string;
  signal: number;
  coherence: number;
  volatility: number;
  redThread: string;
  goldenThread: string;
  needle: string;
  dna: string[];
  rna: string[];
  notes: string[];
};

function deriveScan(input: string, fileName?: string): ScanResult {
  const source = `${input} ${fileName ?? ''}`.trim();
  const words = source.split(/\s+/).filter(Boolean);
  const signal = Math.min(96, 58 + Math.floor(source.length % 38));
  const coherence = Math.min(94, 52 + (words.length % 42));
  const volatility = Math.max(18, 72 - (words.length % 37));
  const nameMatch = source.match(/([A-Z][a-z]+\s+[A-Z][a-z]+)/);
  const roleHints = ['founder', 'product', 'design', 'strategy', 'operator', 'growth', 'regtech'];
  const role = roleHints.find((r) => source.toLowerCase().includes(r)) || 'Multi-disciplinary operator';

  return {
    name: nameMatch?.[0] || fileName || 'Unknown Profile',
    role: role.charAt(0).toUpperCase() + role.slice(1),
    signal,
    coherence,
    volatility,
    redThread: 'High-agency builder with recursive pattern recognition.',
    goldenThread: 'Translates ambiguity into systems, narratives, and execution paths.',
    needle: 'Position as the operator who turns dense signal into decisive movement.',
    dna: ['AG', 'PM', 'SY', 'GTM', 'OP'],
    rna: ['Narrative synthesis', '0→1 systems', 'Cross-functional gravity', 'Adaptive translation'],
    notes: [
      'Profile suggests strong taste plus operating instinct.',
      'Best surface area is strategy × product × communication.',
      'Report should bias toward dense signal, not generic personality language.',
    ],
  };
}

function Metric({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-panel p-4 shadow-glow">
      <div className="text-xs uppercase tracking-[0.24em] text-dim">{label}</div>
      <div className={`mt-2 font-mono text-4xl ${color}`}>{value}</div>
      <div className="mt-3 h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full" style={{ width: `${value}%`, background: 'currentColor' }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [profileText, setProfileText] = useState('');
  const [fileName, setFileName] = useState<string>('');
  const [result, setResult] = useState<ScanResult | null>(null);

  const waveform = useMemo(() => {
    const points = Array.from({ length: 36 }, (_, i) => {
      const y = 34 + Math.sin(i / 3) * 18 + (result ? result.signal / 12 : 0);
      return `${i * 12},${y}`;
    }).join(' ');
    return points;
  }, [result]);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-8">
      <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-signal">ARCS v0.1 · Adaptive Lossless Translation</div>
          <h1 className="mt-2 text-3xl font-semibold">Paste a LinkedIn profile or upload a PDF</h1>
          <p className="mt-2 max-w-3xl text-sm text-dim">Generate a simple ARCS-style field scan with thread map, wave core, score modules, and DNA→RNA expression rail.</p>
        </div>
        <div className="rounded-full border border-amber/40 px-4 py-2 text-sm text-amber">● Mock Scan Live</div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-black/50 p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-dim">Input Surface</div>
          <textarea
            value={profileText}
            onChange={(e) => setProfileText(e.target.value)}
            placeholder="Paste LinkedIn profile text, About section, resume text, or any profile artifact here..."
            className="mt-4 min-h-[240px] w-full rounded-2xl border border-white/10 bg-panel p-4 text-sm text-white outline-none placeholder:text-dim"
          />
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            <label className="inline-flex cursor-pointer items-center rounded-2xl border border-white/10 bg-panel px-4 py-3 text-sm text-white">
              Upload PDF
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              />
            </label>
            <div className="text-sm text-dim">{fileName ? `Loaded: ${fileName}` : 'No file selected'}</div>
            <button
              onClick={() => setResult(deriveScan(profileText, fileName))}
              className="md:ml-auto rounded-2xl bg-signal px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              Run Scan
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/50 p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-dim">How it works</div>
          <ol className="mt-4 space-y-4 text-sm text-zinc-300">
            <li>1. Paste profile text or upload a PDF artifact.</li>
            <li>2. The system extracts signal and maps it into a field profile.</li>
            <li>3. The UI renders thread, waveform, score modules, and expression rails.</li>
          </ol>
          <div className="mt-6 rounded-2xl border border-thread/30 bg-thread/10 p-4 text-sm text-zinc-200">
            This starter is intentionally simple: it proves the product surface first, then you can swap in real PDF parsing, LinkedIn enrichment, embeddings, and structured scan logic.
          </div>
        </div>
      </section>

      {result && (
        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.2fr_0.85fr]">
          <aside className="space-y-4">
            {[['Red Thread', result.redThread, 'border-thread'], ['Golden Thread', result.goldenThread, 'border-gold'], ['Needle', result.needle, 'border-vermillion']].map(([title, body, border]) => (
              <div key={title} className={`rounded-3xl border ${border} bg-panel p-5`}>
                <div className="text-xs uppercase tracking-[0.25em] text-dim">{title}</div>
                <p className="mt-3 text-sm leading-6 text-zinc-100">{body}</p>
              </div>
            ))}
          </aside>

          <div className="scan-line rounded-3xl border border-white/10 bg-panel p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-dim">Wave Core</div>
                <h2 className="mt-2 text-2xl font-semibold">{result.name}</h2>
                <p className="mt-1 text-sm text-dim">{result.role}</p>
              </div>
              <div className="rounded-full border border-signal/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-signal">Field Active</div>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-black/40 p-4">
              <svg viewBox="0 0 420 100" className="h-40 w-full">
                <polyline fill="none" stroke="#00F0FF" strokeWidth="3" points={waveform} />
                <polyline fill="none" stroke="#FF4500" strokeWidth="1.5" opacity="0.6" points={waveform.split(' ').map((p, i) => {
                  const [x, y] = p.split(',').map(Number);
                  return `${x},${y + (i % 5 === 0 ? -12 : 8)}`;
                }).join(' ')} />
              </svg>
            </div>

            <div className="mt-6 rounded-2xl border border-gold/30 bg-black/30 p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-dim">Golden Inchworm</div>
              <div className="mt-3 flex items-center gap-3 text-sm text-zinc-200">
                <span className="rounded-full border border-thread/40 px-3 py-1 text-thread">Red Thread</span>
                <span>→</span>
                <span className="rounded-full border border-gold/40 px-3 py-1 text-gold">Golden Thread</span>
                <span>→</span>
                <span className="rounded-full border border-signal/40 px-3 py-1 text-signal">Needle</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.25em] text-dim">Signal Notes</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                {result.notes.map((note) => <li key={note}>• {note}</li>)}
              </ul>
            </div>
          </div>

          <aside className="space-y-4">
            <Metric label="Signal" value={result.signal} color="text-signal" />
            <Metric label="Coherence" value={result.coherence} color="text-amber" />
            <Metric label="Volatility" value={result.volatility} color="text-vermillion" />
          </aside>
        </section>
      )}

      {result && (
        <section className="rounded-3xl border border-white/10 bg-black/50 p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-dim">DNA → RNA Expression Rail</div>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-3 text-sm text-dim">DNA Traits</div>
              <div className="flex flex-wrap gap-3">
                {result.dna.map((item) => (
                  <div key={item} className="rounded-full border border-signal/30 px-4 py-2 font-mono text-signal">{item}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 text-sm text-dim">RNA Expressions</div>
              <div className="flex flex-wrap gap-3">
                {result.rna.map((item) => (
                  <div key={item} className="rounded-full border border-gold/30 px-4 py-2 text-gold">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
