'use client';
import type { ScanResult } from '../types';

export default function ReportLight({ r }: { r: ScanResult }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="col-span-full rounded-3xl border border-white/10 bg-panel p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-dim">Field Signal · Light</div>
            <h2 className="mt-2 text-3xl font-semibold">{r.name}</h2>
            <p className="mt-1 text-sm text-dim">{r.role} · {r.org}</p>
          </div>
          <div className="text-right">
            <div className="font-mono text-6xl text-signal">{r.signal}</div>
            <div className="mt-1 text-xs text-dim">Signal Score</div>
          </div>
        </div>
      </div>

      {[
        { label: 'Red Thread', body: r.redThread, accent: 'border-thread text-thread' },
        { label: 'Needle', body: r.needle, accent: 'border-signal text-signal' },
      ].map(({ label, body, accent }) => (
        <div key={label} className={`col-span-full rounded-2xl border bg-panel p-5 sm:col-span-1 ${accent.split(' ')[0]}`}>
          <div className={`text-xs uppercase tracking-[0.25em] ${accent.split(' ')[1]}`}>{label}</div>
          <p className="mt-3 text-sm leading-6 text-zinc-100">{body}</p>
        </div>
      ))}

      <div className="rounded-2xl border border-white/10 bg-panel p-5">
        <div className="text-xs uppercase tracking-[0.25em] text-dim">Archetype</div>
        <div className="mt-3 text-xl font-semibold text-amber">{r.archetype}</div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-panel p-5">
        <div className="text-xs uppercase tracking-[0.25em] text-dim">Zone of Genius</div>
        <div className="mt-3 text-sm text-zinc-200">{r.zone}</div>
      </div>

      <div className="col-span-full rounded-2xl border border-white/10 bg-panel p-5">
        <div className="text-xs uppercase tracking-[0.25em] text-dim">DNA Traits</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {r.dna.map((d) => (
            <span key={d.code} className="rounded-full border border-signal/30 px-3 py-1 font-mono text-sm text-signal">{d.code}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
