'use client';
import type { ScanResult } from '../types';

function Metric({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-panel p-4">
      <div className="text-xs uppercase tracking-[0.24em] text-dim">{label}</div>
      <div className={`mt-2 font-mono text-4xl ${color}`}>{value}</div>
      <div className="mt-3 h-1.5 rounded-full bg-white/10">
        <div className={`h-1.5 rounded-full ${color.replace('text-', 'bg-')}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function ReportHeavy({ r }: { r: ScanResult }) {
  return (
    <div className="space-y-6">
      {/* Masthead */}
      <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-panel p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-signal">Field Profile · Heavy Scan</div>
          <h2 className="mt-2 text-3xl font-semibold">{r.name}</h2>
          <p className="mt-1 text-sm text-dim">{r.role} · {r.org}</p>
        </div>
        <div className="flex gap-6">
          {[['Signal', r.signal, 'text-signal'], ['Coherence', r.coherence, 'text-amber'], ['Volatility', r.volatility, 'text-vermillion']].map(([l, v, c]) => (
            <div key={l as string} className="text-center">
              <div className={`font-mono text-4xl ${c}`}>{v}</div>
              <div className="mt-1 text-xs text-dim">{l}</div>
            </div>
          ))}
        </div>
      </header>

      {/* 3-col thread + wave + scores */}
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.2fr_0.9fr]">
        <aside className="space-y-4">
          {([
            ['Red Thread', r.redThread, 'border-thread'],
            ['Golden Thread', r.goldenThread, 'border-gold'],
            ['Needle', r.needle, 'border-signal'],
          ] as const).map(([title, body, border]) => (
            <div key={title} className={`rounded-3xl border ${border} bg-panel p-5`}>
              <div className="text-xs uppercase tracking-[0.25em] text-dim">{title}</div>
              <p className="mt-3 text-sm leading-6 text-zinc-100">{body}</p>
            </div>
          ))}
        </aside>

        <div className="scan-line rounded-3xl border border-white/10 bg-panel p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-dim">Wave Core</div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <svg viewBox="0 460 100" className="h-44 w-full">
              <polyline fill="none" stroke="#00F0FF" strokeWidth="2.5" points={r.wavePoints} />
              <polyline fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.4"
                points={r.wavePoints.split(' ').map((p, i) => {
                  const [x, y] = p.split(',').map(Number);
                  return `${x},${y - 14 + i * 0.3}`;
                }).join(' ')} />
              <polyline fill="none" stroke="#FF4500" strokeWidth="1.2" opacity="0.5"
                points={r.wavePoints.split(' ').map((p, i) => {
                  const [x, y] = p.split(',').map(Number);
                  return `${x},${y + (i % 5 === 0 ? -18 : 9)}`;
                }).join(' ')} />
            </svg>
          </div>
          <div className="mt-5 rounded-2xl border border-gold/20 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.25em] text-dim">Golden Inchworm</div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full border border-thread/40 px-3 py-1 text-thread">Red Thread</span>
              <span className="text-dim">→</span>
              <span className="rounded-full border border-gold/40 px-3 py-1 text-gold">Golden Thread</span>
              <span className="text-dim">→</span>
              <span className="rounded-full border border-signal/40 px-3 py-1 text-signal">Needle</span>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-signal/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.25em] text-dim">Decision Receipt</div>
            <p className="mt-2 font-mono text-xs text-dim">{r.decisionReceipt}</p>
          </div>
        </div>

        <aside className="space-y-4">
          <Metric label="Signal" value={r.signal} color="text-signal" />
          <Metric label="Coherence" value={r.coherence} color="text-amber" />
          <Metric label="Volatility" value={r.volatility} color="text-vermillion" />
          <div className="rounded-2xl border border-amber/30 bg-panel p-4">
            <div className="text-xs uppercase tracking-[0.25em] text-dim">Archetype</div>
            <div className="mt-2 text-lg font-semibold text-amber">{r.archetype}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-panel p-4">
            <div className="text-xs uppercase tracking-[0.25em] text-dim">Zone of Genius</div>
            <div className="mt-2 text-sm text-zinc-200">{r.zone}</div>
          </div>
        </aside>
      </section>

      {/* Dissonance + Leverage 2-col */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-vermillion/30 bg-panel p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-vermillion">Dissonance Vectors</div>
          <ul className="mt-4 space-y-3">
            {r.dissonance.map((d) => (
              <li key={d} className="flex gap-3 text-sm text-zinc-300">
                <span className="mt-0.5 text-vermillion">▲</span>{d}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-gold/30 bg-panel p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-gold">Leverage Arcs</div>
          <ul className="mt-4 space-y-3">
            {r.leverage.map((l) => (
              <li key={l} className="flex gap-3 text-sm text-zinc-300">
                <span className="mt-0.5 text-gold">◆</span>{l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kintsugi */}
      <section className="rounded-3xl border border-gold/20 bg-panel p-6">
        <div className="text-xs uppercase tracking-[0.25em] text-gold">Kintsugi Map · Fractures as Gold Seams</div>
        <ul className="mt-4 space-y-3">
          {r.kintsugi.map((k) => (
            <li key={k} className="flex gap-3 text-sm text-zinc-300">
              <span className="mt-0.5 text-gold">◎</span>{k}
            </li>
          ))}
        </ul>
      </section>

      {/* DNA → RNA full rail */}
      <section className="rounded-3xl border border-white/10 bg-black/50 p-6">
        <div className="text-xs uppercase tracking-[0.25em] text-dim">DNA → RNA Expression Rail</div>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-3 text-sm text-dim">Stable Traits (DNA)</div>
            <div className="flex flex-wrap gap-3">
              {r.dna.map((d) => (
                <div key={d.code} className="group relative">
                  <div className="rounded-full border border-signal/30 px-4 py-2 font-mono text-sm text-signal">{d.code}</div>
                  <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-panel px-2 py-1 text-xs text-white group-hover:block">
                    {d.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-3 text-sm text-dim">Expressed Phenotypes (RNA)</div>
            <div className="flex flex-wrap gap-3">
              {r.rna.map((item) => (
                <div key={item} className="rounded-full border border-gold/30 px-4 py-2 text-sm text-gold">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Signal Notes */}
      <section className="rounded-3xl border border-white/10 bg-panel p-6">
        <div className="text-xs uppercase tracking-[0.25em] text-dim">Signal Notes</div>
        <ul className="mt-4 space-y-2">
          {r.notes.map((n) => <li key={n} className="flex gap-3 text-sm text-zinc-300"><span className="text-signal">·</span>{n}</li>)}
        </ul>
      </section>
    </div>
  );
}
