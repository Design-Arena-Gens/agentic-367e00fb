import { NextResponse } from 'next/server';
import { fetchSearchResults } from '@/lib/search';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') ?? '';

  try {
    const results = await fetchSearchResults(query);
    return NextResponse.json({ query, results });
  } catch (error) {
    console.error('Search API error', error);
    return NextResponse.json({ error: 'Failed to fetch search results.' }, { status: 502 });
  }
}
