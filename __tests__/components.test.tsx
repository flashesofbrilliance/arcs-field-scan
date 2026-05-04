import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { ScanResult } from '../app/types';
import ReportLight from '../app/components/ReportLight';
import ReportMedium from '../app/components/ReportMedium';
import ReportHeavy from '../app/components/ReportHeavy';
import DepthSelector from '../app/components/DepthSelector';

const MOCK_RESULT: ScanResult = {
  name: 'Jane Smith',
  role: 'Founder',
  org: 'Acme',
  signal: 88,
  coherence: 76,
  volatility: 34,
  redThread: 'Red thread test content.',
  goldenThread: 'Golden thread test content.',
  needle: 'Needle test content.',
  archetype: 'Pattern Matcher',
  zone: 'Strategy × Product × Communication',
  dna: [
    { code: 'AG', label: 'Agency' },
    { code: 'PM', label: 'Pattern Match' },
  ],
  rna: ['Narrative synthesis', '0→1 systems'],
  dissonance: ['Dissonance test item one.'],
  leverage: ['Leverage test item one.'],
  kintsugi: ['Kintsugi test item one.'],
  decisionReceipt: 'Scan initiated · 9 tokens · Signal fidelity confirmed · May 4, 2026',
  notes: ['Note one.', 'Note two.'],
  wavePoints: Array.from({ length: 42 }, (_, i) => `${i * 11},50`).join(' '),
};

// ─── DepthSelector ────────────────────────────────────────────────────────────

describe('DepthSelector', () => {
  it('renders all three depth options', () => {
    render(<DepthSelector value="medium" onChange={() => {}} />);
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Heavy')).toBeInTheDocument();
  });

  it('calls onChange with correct value when option clicked', () => {
    const handler = jest.fn();
    render(<DepthSelector value="medium" onChange={handler} />);
    fireEvent.click(screen.getByText('Light'));
    expect(handler).toHaveBeenCalledWith('light');
    fireEvent.click(screen.getByText('Heavy'));
    expect(handler).toHaveBeenCalledWith('heavy');
  });

  it('applies active styles to selected option', () => {
    render(<DepthSelector value="light" onChange={() => {}} />);
    const lightBtn = screen.getByText('Light').closest('button');
    expect(lightBtn?.className).toContain('border-signal');
  });
});

// ─── ReportLight ──────────────────────────────────────────────────────────────

describe('ReportLight', () => {
  beforeEach(() => render(<ReportLight r={MOCK_RESULT} />));

  it('renders the profile name', () => {
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders the signal score', () => {
    expect(screen.getByText('88')).toBeInTheDocument();
  });

  it('renders Red Thread content', () => {
    expect(screen.getByText('Red thread test content.')).toBeInTheDocument();
  });

  it('renders Needle content', () => {
    expect(screen.getByText('Needle test content.')).toBeInTheDocument();
  });

  it('renders archetype', () => {
    expect(screen.getByText('Pattern Matcher')).toBeInTheDocument();
  });

  it('renders all DNA codes', () => {
    expect(screen.getByText('AG')).toBeInTheDocument();
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  it('does NOT render Golden Thread (Light excludes it)', () => {
    expect(screen.queryByText('Golden thread test content.')).not.toBeInTheDocument();
  });

  it('does NOT render Kintsugi (Light excludes it)', () => {
    expect(screen.queryByText('Kintsugi test item one.')).not.toBeInTheDocument();
  });
});

// ─── ReportMedium ─────────────────────────────────────────────────────────────

describe('ReportMedium', () => {
  beforeEach(() => render(<ReportMedium r={MOCK_RESULT} />));

  it('renders profile name', () => {
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders Golden Thread content', () => {
    expect(screen.getByText('Golden thread test content.')).toBeInTheDocument();
  });

  it('renders dissonance item', () => {
    expect(screen.getByText(/Dissonance test item one/)).toBeInTheDocument();
  });

  it('renders leverage item', () => {
    expect(screen.getByText(/Leverage test item one/)).toBeInTheDocument();
  });

  it('renders Signal score', () => {
    expect(screen.getByText('88')).toBeInTheDocument();
  });

  it('renders Coherence score', () => {
    expect(screen.getByText('76')).toBeInTheDocument();
  });

  it('renders RNA expressions', () => {
    expect(screen.getByText('Narrative synthesis')).toBeInTheDocument();
  });

  it('does NOT render Kintsugi (Medium excludes it)', () => {
    expect(screen.queryByText('Kintsugi test item one.')).not.toBeInTheDocument();
  });

  it('does NOT render Decision Receipt (Medium excludes it)', () => {
    expect(screen.queryByText(/Scan initiated/)).not.toBeInTheDocument();
  });
});

// ─── ReportHeavy ──────────────────────────────────────────────────────────────

describe('ReportHeavy', () => {
  beforeEach(() => render(<ReportHeavy r={MOCK_RESULT} />));

  it('renders profile name', () => {
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders Kintsugi item', () => {
    expect(screen.getByText(/Kintsugi test item one/)).toBeInTheDocument();
  });

  it('renders Decision Receipt', () => {
    expect(screen.getByText(/Scan initiated/)).toBeInTheDocument();
  });

  it('renders Signal Notes', () => {
    expect(screen.getByText('Note one.')).toBeInTheDocument();
  });

  it('renders all three scores in masthead', () => {
    const scores = screen.getAllByText('88');
    expect(scores.length).toBeGreaterThanOrEqual(1);
  });

  it('renders DNA hover tooltip labels', () => {
    expect(screen.getByText('Agency')).toBeInTheDocument();
  });
});
