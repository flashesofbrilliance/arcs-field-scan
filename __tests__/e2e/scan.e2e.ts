import puppeteer, { Browser, Page } from 'puppeteer';

const BASE_URL = 'http://localhost:3000';
const SAMPLE_INPUT = 'Jane Smith is a product founder at Heliotrope building 01 systems in regtech.';

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
});

// ─── Page Load ────────────────────────────────────────────────────────────────

describe('Page load', () => {
  it('renders the ARCS brand label', async () => {
    const text = await page.$eval('main', (el) => el.textContent ?? '');
    expect(text).toContain('ARCS');
  });

  it('renders the depth selector with three options', async () => {
    const buttons = await page.$$eval('button', (els) => els.map((el) => el.textContent?.trim()));
    expect(buttons).toContain('Light');
    expect(buttons).toContain('Medium');
    expect(buttons).toContain('Heavy');
  });

  it('Run Scan button is disabled when textarea is empty', async () => {
    const disabled = await page.$eval(
      'button[disabled]',
      (el) => el.textContent?.trim()
    ).catch(() => null);
    expect(disabled).toBe('Run Scan');
  });
});

// ─── Input ────────────────────────────────────────────────────────────────────

describe('Input surface', () => {
  it('enables Run Scan after typing in textarea', async () => {
    await page.type('textarea', SAMPLE_INPUT);
    const disabled = await page.$('button[disabled]');
    expect(disabled).toBeNull();
  });
});

// ─── Scan Flow: Medium (default) ─────────────────────────────────────────────

describe('Scan flow — Medium (default)', () => {
  beforeEach(async () => {
    await page.type('textarea', SAMPLE_INPUT);
    await page.click('button:not([disabled])');
    await page.waitForSelector('svg', { timeout: 5000 });
  });

  it('renders an SVG waveform after scan', async () => {
    const svg = await page.$('svg');
    expect(svg).not.toBeNull();
  });

  it('renders a score number', async () => {
    const text = await page.$eval('main', (el) => el.textContent ?? '');
    expect(text).toMatch(/\d{2}/);
  });

  it('renders Red Thread label', async () => {
    const text = await page.$eval('main', (el) => el.textContent ?? '');
    expect(text.toUpperCase()).toContain('RED THREAD');
  });

  it('renders Golden Inchworm section', async () => {
    const text = await page.$eval('main', (el) => el.textContent ?? '');
    expect(text.toUpperCase()).toContain('GOLDEN');
  });
});

// ─── Depth Toggle ─────────────────────────────────────────────────────────────

describe('Depth toggle', () => {
  beforeEach(async () => {
    await page.type('textarea', SAMPLE_INPUT);
    await page.click('button:not([disabled])');
    await page.waitForSelector('svg', { timeout: 5000 });
  });

  it('Light mode does not render Kintsugi section', async () => {
    await page.click('button:has-text("Light")');
    await page.waitForTimeout(300);
    const text = await page.$eval('main', (el) => el.textContent ?? '');
    expect(text.toUpperCase()).not.toContain('KINTSUGI');
  });

  it('Heavy mode renders Kintsugi section', async () => {
    await page.click('button:has-text("Heavy")');
    await page.waitForTimeout(300);
    const text = await page.$eval('main', (el) => el.textContent ?? '');
    expect(text.toUpperCase()).toContain('KINTSUGI');
  });

  it('Heavy mode renders Decision Receipt', async () => {
    await page.click('button:has-text("Heavy")');
    await page.waitForTimeout(300);
    const text = await page.$eval('main', (el) => el.textContent ?? '');
    expect(text).toContain('Scan initiated');
  });

  it('switching depth does not show Scanning state', async () => {
    await page.click('button:has-text("Light")');
    const scanningText = await page.$eval('main', (el) =>
      el.textContent?.includes('Scanning…') ?? false
    );
    expect(scanningText).toBe(false);
  });
});

// ─── Mobile Viewport ──────────────────────────────────────────────────────────

describe('Mobile viewport (375px)', () => {
  beforeEach(async () => {
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  });

  afterEach(async () => {
    await page.setViewport({ width: 1280, height: 900 });
  });

  it('page renders without horizontal scroll', async () => {
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
  });

  it('Run Scan button is visible on mobile', async () => {
    const btn = await page.$('button:not([disabled])');
    expect(btn).not.toBeNull();
  });
});
