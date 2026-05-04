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

export default function ReportMedium({ r }: { r: ScanResult }) {
  return (
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
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-dim">Wave Core · Medium</div>
            <h2 className="mt-2 text-2xl font-semibold">{r.name}</h2>
            <p className="mt-1 text-sm text-dim">{r.role} · {r.org}</p>
          </div>
          <span className="rounded-full border border-amber/40 px-3 py-1 text-xs text-amber">{r.archetype}</span>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <svg viewBox={`0 420 100`} className="h-36 w-full">
            <polyline fill="none" stroke="#00F0FF" strokeWidth="2.5" points={r.wavePoints} />
            <polyline fill="none" stroke="#FF4500" strokeWidth="1.2" opacity="0.5"
              points={r.wavePoints.split(' ').map((p, i) => {
                const [x, y] = p.split(',').map(Number);
                return `${x},${y + (i % 4 === 0 ? -10 : 6)}`;
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

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.25em] text-dim">Dissonance</div>
            {r.dissonance.map((d) => (
              <p key={d} className="mb-2 text-xs leading-5 text-zinc-400">▲ {d}</p>
            ))}
          </div>
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.25em] text-dim">Leverage</div>
            {r.leverage.map((l) => (
              <p key={l} className="mb-2 text-xs leading-5 text-zinc-400">◆ {l}</p>
            ))}
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <Metric label="Signal" value={r.signal} color="text-signal" />
        <Metric label="Coherence" value={r.coherence} color="text-amber" />
        <Metric label="Volatility" value={r.volatility} color="text-vermillion" />
        <div className="rounded-2xl border border-white/10 bg-panel p-4">
          <div className="text-xs uppercase tracking-[0.25em] text-dim">Zone</div>
          <div className="mt-2 text-sm text-zinc-200">{r.zone}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-panel p-4">
          <div className="text-xs uppercase tracking-[0.25em] text-dim">RNA</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {r.rna.map((item) => (
              <span key={item} className="rounded-full border border-gold/30 px-2 py-1 text-xs text-gold">{item}</span>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
