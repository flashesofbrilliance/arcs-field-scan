import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ARCS Field Scan',
  description: 'Paste a LinkedIn profile or upload a PDF to generate an adaptive ARCS-style field scan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
