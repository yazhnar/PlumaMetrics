import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');

  if (apiKey !== process.env.PLUMA_API_KEY) {
    return NextResponse.json({ success: false, error: 'Invalid API key' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get('site_id');

  if (!siteId) {
    return NextResponse.json({ success: false, error: 'site_id is required' }, { status: 400 });
  }

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: events, error } = await supabaseAdmin
    .from('events')
    .select('path, is_404, visitor_hash')
    .eq('site_id', siteId)
    .gte('created_at', twentyFourHoursAgo);

  if (error || !events) {
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
  }

  const totalVisitors = events.length;
  const uniqueVisitors = new Set(events.map((e) => e.visitor_hash)).size;
  const errorCount = events.filter((e) => e.is_404).length;

  const pathCounts: Record<string, number> = {};
  events.forEach((e) => {
    pathCounts[e.path] = (pathCounts[e.path] || 0) + 1;
  });
  const topPage = Object.entries(pathCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  return NextResponse.json({
    success: true,
    site_id: siteId,
    period: 'last_24h',
    total_visitors: totalVisitors,
    unique_visitors: uniqueVisitors,
    error_404s: errorCount,
    top_page: topPage,
  });
}