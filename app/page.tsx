'use client';

import { useState } from 'react';
import type { DepthMode } from './types';
import { deriveScan } from './scan';
import DepthSelector from './components/DepthSelector';
import ReportLight from './components/ReportLight';
import ReportMedium from './components/ReportMedium';
import ReportHeavy from './components/ReportHeavy';

export default function Home() {
  const [profileText, setProfileText] = useState('');
  const [fileName, setFileName] = useState('');
  const [depth, setDepth] = useState<DepthMode>('medium');
  const [result, setResult] = useState<ReturnType<typeof deriveScan> | null>(null);
  const [scanning, setScanning] = useState(false);

  async function runScan() {
    if (!profileText.trim() && !fileName) return;
    setScanning(true);
    await new Promise((r) => setTimeout(r, 900));
    setResult(deriveScan(profileText, fileName));
    setScanning(false);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-8">
      <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-signal">ARCS v0.1 · Adaptive Lossless Translation</div>
          <h1 className="mt-2 text-2xl font-semibold">Paste a LinkedIn profile or upload a PDF</h1>
          <p className="mt-1 max-w-2xl text-sm text-dim">Generate a field scan: thread map, wave core, score modules, DNA→RNA rail.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-amber/40 px-3 py-1.5 text-xs text-amber">● Mock Mode</div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-black/50 p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-dim">Input Surface</div>
          <textarea
            value={profileText}
            onChange={(e) => setProfileText(e.target.value)}
            placeholder="Paste LinkedIn profile text, About section, resume text, or any profile artifact here..."
            className="mt-4 min-h-[220px] w-full rounded-2xl border border-white/10 bg-panel p-4 text-sm text-white outline-none placeholder:text-dim focus:border-signal/30"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-panel px-4 py-3 text-sm text-white transition hover:border-white/20">
              <span>📎</span> Upload PDF
              <input type="file" accept=".pdf" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
            </label>
            {fileName && <div className="flex items-center rounded-2xl border border-white/10 bg-panel px-4 py-3 text-sm text-dim">{fileName}</div>}
            <button
              onClick={runScan}
              disabled={scanning || (!profileText.trim() && !fileName)}
              className="ml-auto rounded-2xl bg-signal px-5 py-3 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-40"
            >
              {scanning ? 'Scanning…' : 'Run Scan'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/50 p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-dim">Report Depth</div>
          <DepthSelector value={depth} onChange={setDepth} />
          <div className="mt-2 rounded-2xl border border-white/10 bg-panel p-4 text-sm text-zinc-400">
            {depth === 'light' && 'Signal card only — name, archetype, score, threads, DNA tags. Best for fast triage or sharing a clean snapshot.'}
            {depth === 'medium' && 'Full thread map + wave core + score rail + dissonance/leverage. Standard operating view for most use cases.'}
            {depth === 'heavy' && 'Complete analyst HUD — all modules: masthead, wave (3 harmonics), kintsugi map, DNA→RNA rail, decision receipt, signal notes.'}
          </div>
        </div>
      </section>

      {result && depth === 'light' && <ReportLight r={result} />}
      {result && depth === 'medium' && <ReportMedium r={result} />}
      {result && depth === 'heavy' && <ReportHeavy r={result} />}
    </main>
  );
}
