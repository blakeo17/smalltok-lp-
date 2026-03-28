import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Small Tok — Speak with confidence and clarity',
  description:
    'Small Tok gives you a 60-second speaking challenge every day — and AI feedback that actually helps.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
