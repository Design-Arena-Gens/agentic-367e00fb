'use client';

import { useCallback, useState } from 'react';
import type { SearchResult } from '@/lib/search';

interface SearchClientProps {
  initialQuery: string;
  initialResults: SearchResult[];
}

export default function SearchClient({ initialQuery, initialResults }: SearchClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>(initialResults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!query.trim()) {
        setError('يرجى إدخال عبارة بحث.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query.trim())}`);

        if (!response.ok) {
          throw new Error('تعذر جلب البيانات من محرك البحث.');
        }

        const payload = (await response.json()) as { results: SearchResult[] };
        setResults(payload.results);
      } catch (fetchError) {
        console.error(fetchError);
        setResults([]);
        setError('حدث خطأ أثناء تنفيذ البحث. حاول مرة أخرى لاحقاً.');
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  return (
    <section>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          inputMode="search"
          placeholder="ابحث عن كل ما يتعلق بـ Amazon KDP"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="search-button" type="submit" disabled={loading}>
          {loading ? 'جارٍ البحث...' : 'ابدأ البحث'}
        </button>
      </form>

      <p className="helper-text">
        على سبيل المثال: &quot;Amazon KDP keywords&quot; أو &quot;طرق التسويق للكتب الإلكترونية&quot;
      </p>

      {error ? (
        <p className="status error">{error}</p>
      ) : (
        <p className="status">{results.length ? `عدد النتائج: ${results.length}` : 'لم يتم العثور على نتائج.'}</p>
      )}

      <div className="results">
        {results.map((result) => (
          <article key={result.url} className="result-item">
            <h3 className="result-title">
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
            </h3>
            {result.description ? <p className="result-description">{result.description}</p> : null}
            <span className="helper-text" style={{ direction: 'ltr' }}>
              {result.url}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
