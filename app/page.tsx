import Link from 'next/link';
import { fetchSearchResults } from '@/lib/search';
import type { SearchResult } from '@/lib/search';
import SearchClient from '@/components/search-client';

const HERO_TITLE = 'ابحث عن موارد Amazon KDP';
const HERO_DESCRIPTION =
  'استكشف الأدلة، المقالات، والدروس المتخصصة حول النشر عبر Kindle Direct Publishing من خلال محرك البحث الذكي لدينا.';

export default async function HomePage() {
  const initialQuery = 'Amazon KDP';
  let initialResults: SearchResult[] = [];

  try {
    initialResults = await fetchSearchResults(initialQuery);
  } catch (error) {
    console.error('Failed to fetch initial results', error);
  }

  return (
    <main>
      <div className="container">
        <div className="card">
          <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>{HERO_TITLE}</h1>
            <p style={{ margin: 0, color: '#475569', lineHeight: 1.6 }}>{HERO_DESCRIPTION}</p>
          </header>

          <SearchClient initialQuery={initialQuery} initialResults={initialResults} />

          <section style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>موارد موصى بها</h2>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.75rem' }}>
              <li>
                <Link href="https://kdp.amazon.com/" target="_blank">
                  البوابة الرسمية لـ Amazon Kindle Direct Publishing
                </Link>
              </li>
              <li>
                <Link href="https://kdp.amazon.com/en_US/help/topic/G201014420" target="_blank">
                  دليل البدء السريع للناشرين
                </Link>
              </li>
              <li>
                <Link href="https://kdp.amazon.com/en_US/help/topic/G200635650" target="_blank">
                  الأسئلة الشائعة حول حقوق النشر والمحتوى
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
