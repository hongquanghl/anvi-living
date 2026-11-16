import { NextResponse } from 'next/server';
import { EVENTS } from '@/data/seed';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const city = searchParams.get('city');

  let filtered = [...EVENTS];

  if (category && category !== 'all') {
    filtered = filtered.filter((e) => e.category === category);
  }

  if (city && city !== 'all') {
    filtered = filtered.filter((e) => e.city.toLowerCase() === city.toLowerCase());
  }

  return NextResponse.json({
    total: filtered.length,
    events: filtered,
  });
}
