'use client';
import type { DepthMode } from '../types';

const OPTIONS: { value: DepthMode; label: string; sub: string }[] = [
  { value: 'light', label: 'Light', sub: 'Signal card · 30 sec read' },
  { value: 'medium', label: 'Medium', sub: 'Thread map + wave · 2 min read' },
  { value: 'heavy', label: 'Heavy', sub: 'Full HUD · analyst depth' },
];

export default function DepthSelector({
  value,
  onChange,
}: {
  value: DepthMode;
  onChange: (v: DepthMode) => void;
}) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`flex flex-col rounded-2xl border px-4 py-3 text-left transition ${
            value === o.value
              ? 'border-signal bg-signal/10 text-signal'
              : 'border-white/10 bg-panel text-dim hover:border-white/20 hover:text-white'
          }`}
        >
          <span className="text-sm font-medium">{o.label}</span>
          <span className="mt-0.5 text-xs opacity-60">{o.sub}</span>
        </button>
      ))}
    </div>
  );
}
