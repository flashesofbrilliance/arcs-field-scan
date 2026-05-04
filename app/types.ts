export type DepthMode = 'light' | 'medium' | 'heavy';

export type ScanResult = {
  name: string;
  role: string;
  org: string;
  // Scores
  signal: number;
  coherence: number;
  volatility: number;
  // Threads
  redThread: string;
  goldenThread: string;
  needle: string;
  // Identity layer
  archetype: string;
  zone: string;
  // DNA / RNA
  dna: { code: string; label: string }[];
  rna: string[];
  // Medium+
  dissonance: string[];
  leverage: string[];
  // Heavy only
  kintsugi: string[];
  decisionReceipt: string;
  notes: string[];
  wavePoints: string;
};
