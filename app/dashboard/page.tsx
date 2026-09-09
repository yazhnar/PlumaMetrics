import { supabaseAdmin } from '@/lib/supabase-admin';
import TrafficChart from './traffic-chart';
import StatusCodesPanel from './status-codes-panel';

async function getDashboardData(siteId: string) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: events, error } = await supabaseAdmin
    .from('events')
    .select('path, is_404, visitor_hash, created_at')
    .eq('site_id', siteId)
    .gte('created_at', twentyFourHoursAgo);

  if (error || !events) {
    return { totalVisitors: 0, uniqueVisitors: 0, topPage: '—', errorCount: 0, hourlyData: [] };
  }

  const totalVisitors = events.length;
  const uniqueVisitors = new Set(events.map((e) => e.visitor_hash)).size;

  const pathCounts: Record<string, number> = {};
  events.forEach((e) => {
    pathCounts[e.path] = (pathCounts[e.path] || 0) + 1;
  });
  const topPage =
    Object.entries(pathCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  const errorCount = events.filter((e) => e.is_404).length;

  const hourlyBuckets: Record<string, number> = {};
  for (let i = 23; i >= 0; i--) {
    const hourLabel = new Date(Date.now() - i * 60 * 60 * 1000).getHours();
    hourlyBuckets[`${hourLabel}:00`] = 0;
  }
  events.forEach((e) => {
    const hourLabel = `${new Date(e.created_at).getHours()}:00`;
    if (hourLabel in hourlyBuckets) {
      hourlyBuckets[hourLabel] += 1;
    }
  });
  const hourlyData = Object.entries(hourlyBuckets).map(([hour, count]) => ({
    hour,
    visitors: count,
  }));

  return { totalVisitors, uniqueVisitors, topPage, errorCount, hourlyData };
}
async function getStatusCodeData(siteId: string) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: events, error } = await supabaseAdmin
    .from('events')
    .select('status_code')
    .eq('site_id', siteId)
    .gte('created_at', twentyFourHoursAgo)
    .not('status_code', 'is', null);

  if (error || !events || events.length === 0) {
    return { hasData: false, codes: [] };
  }

  const codeCounts: Record<string, number> = {};
  events.forEach((e) => {
    const key = String(e.status_code);
    codeCounts[key] = (codeCounts[key] || 0) + 1;
  });

  const codes = Object.entries(codeCounts)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count);

  return { hasData: true, codes };
}

export default async function OverviewPage() {
  const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default-site';
  const { totalVisitors, uniqueVisitors, topPage, errorCount, hourlyData } =
    await getDashboardData(SITE_ID);
      const statusCodeData = await getStatusCodeData(SITE_ID);

  return (
    <>
      <div className="text-muted text-sm mb-8">$ site: {SITE_ID}</div>

      <div className="mb-10">
        <div className="text-muted text-sm mb-2">total_visitors --last-24h</div>
        <div className="text-7xl font-bold text-primary tracking-tight">
          {totalVisitors.toLocaleString()}
        </div>
      </div>

      <TrafficChart data={hourlyData} />

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-panel border border-panel-border rounded p-4">
          <div className="text-muted text-sm mb-1">unique_today</div>
          <div className="text-2xl font-bold text-foreground">
            {uniqueVisitors.toLocaleString()}
          </div>
        </div>
        <div className="bg-panel border border-panel-border rounded p-4">
          <div className="text-muted text-sm mb-1">top_page</div>
          <div className="text-2xl font-bold text-foreground">{topPage}</div>
        </div>
        <div className="bg-panel border border-panel-border rounded p-4">
          <div className="text-muted text-sm mb-1">error_404s</div>
          <div className="text-2xl font-bold text-error">{errorCount}</div>
        </div>
      </div>
            <StatusCodesPanel data={statusCodeData} />
    </>
  );
}