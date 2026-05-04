import { deriveScan } from '../app/scan';

describe('deriveScan — determinism', () => {
  it('returns identical output for identical input', () => {
    const a = deriveScan('Jane Smith founder at Heliotrope');
    const b = deriveScan('Jane Smith founder at Heliotrope');
    expect(a).toEqual(b);
  });

  it('returns different output for different input', () => {
    const a = deriveScan('Alice Jones product');
    const b = deriveScan('Bob Williams strategy');
    expect(a.signal).not.toBe(b.signal);
  });

  it('handles empty string without throwing', () => {
    expect(() => deriveScan('')).not.toThrow();
  });

  it('handles fileName-only input without throwing', () => {
    expect(() => deriveScan('', 'resume.pdf')).not.toThrow();
  });
});

describe('deriveScan — score bounds', () => {
  const samples = [
    'Alice founder at Stripe',
    'Bob product operator growth',
    'Carol regtech strategy design',
    'David engineer counsel',
    'Eve multi-disciplinary operator at Manana',
  ];

  samples.forEach((input) => {
    it(`signal is in [58, 96] for: "${input}"`, () => {
      const r = deriveScan(input);
      expect(r.signal).toBeGreaterThanOrEqual(58);
      expect(r.signal).toBeLessThanOrEqual(96);
    });

    it(`coherence is in [52, 94] for: "${input}"`, () => {
      const r = deriveScan(input);
      expect(r.coherence).toBeGreaterThanOrEqual(52);
      expect(r.coherence).toBeLessThanOrEqual(94);
    });

    it(`volatility is in [18, 72] for: "${input}"`, () => {
      const r = deriveScan(input);
      expect(r.volatility).toBeGreaterThanOrEqual(18);
      expect(r.volatility).toBeLessThanOrEqual(72);
    });
  });
});

describe('deriveScan — schema completeness', () => {
  it('returns all required ScanResult fields', () => {
    const r = deriveScan('Test User product at Acme');
    expect(r).toHaveProperty('name');
    expect(r).toHaveProperty('role');
    expect(r).toHaveProperty('org');
    expect(r).toHaveProperty('signal');
    expect(r).toHaveProperty('coherence');
    expect(r).toHaveProperty('volatility');
    expect(r).toHaveProperty('redThread');
    expect(r).toHaveProperty('goldenThread');
    expect(r).toHaveProperty('needle');
    expect(r).toHaveProperty('archetype');
    expect(r).toHaveProperty('zone');
    expect(r).toHaveProperty('dna');
    expect(r).toHaveProperty('rna');
    expect(r).toHaveProperty('dissonance');
    expect(r).toHaveProperty('leverage');
    expect(r).toHaveProperty('kintsugi');
    expect(r).toHaveProperty('decisionReceipt');
    expect(r).toHaveProperty('notes');
    expect(r).toHaveProperty('wavePoints');
  });

  it('dna array has objects with code and label', () => {
    const r = deriveScan('Test User strategy');
    expect(r.dna.length).toBeGreaterThan(0);
    r.dna.forEach((d) => {
      expect(d).toHaveProperty('code');
      expect(d).toHaveProperty('label');
      expect(typeof d.code).toBe('string');
      expect(typeof d.label).toBe('string');
    });
  });

  it('wavePoints is a non-empty string of comma-separated coordinate pairs', () => {
    const r = deriveScan('Test User');
    expect(typeof r.wavePoints).toBe('string');
    expect(r.wavePoints.length).toBeGreaterThan(0);
    const pairs = r.wavePoints.trim().split(' ');
    expect(pairs.length).toBe(42);
    pairs.forEach((pair) => {
      const [x, y] = pair.split(',').map(Number);
      expect(isNaN(x)).toBe(false);
      expect(isNaN(y)).toBe(false);
    });
  });

  it('name extracted correctly from capitalized input', () => {
    const r = deriveScan('Jane Smith is a product lead at Acme Corp');
    expect(r.name).toMatch(/Jane Smith/);
  });

  it('role detected from keyword: founder', () => {
    const r = deriveScan('I am a founder of a startup');
    expect(r.role.toLowerCase()).toBe('founder');
  });

  it('role defaults to Operator when no keyword matches', () => {
    const r = deriveScan('xyzzy quux blorb norp');
    expect(r.role.toLowerCase()).toContain('operator');
  });

  it('decisionReceipt includes token count', () => {
    const input = 'Jane Smith product at Stripe building 01 systems';
    const r = deriveScan(input);
    const wordCount = input.split(/\s+/).filter(Boolean).length;
    expect(r.decisionReceipt).toContain(`${wordCount} tokens`);
  });
});
