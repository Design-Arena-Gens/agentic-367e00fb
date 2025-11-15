import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amazon KDP Research Hub',
  description:
    'اكتشف أحدث الموارد والمقالات حول برنامج Amazon Kindle Direct Publishing مع إمكانية البحث المباشر.'
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
