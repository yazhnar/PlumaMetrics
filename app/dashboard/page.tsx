import { supabaseAdmin } from '@/lib/supabase-admin';

async function getDashboardData(siteId: string) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: events, error } = await supabaseAdmin
    .from('events')
    .select('path, is_404, visitor_hash')
    .eq('site_id', siteId)
    .gte('created_at', twentyFourHoursAgo);

  if (error || !events) {
    return { totalVisitors: 0, uniqueVisitors: 0, topPage: '—', errorCount: 0 };
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

  return { totalVisitors, uniqueVisitors, topPage, errorCount };
}

export default async function Dashboard() {
  const SITE_ID = 'my-test-blog';
  const { totalVisitors, uniqueVisitors, topPage, errorCount } =
    await getDashboardData(SITE_ID);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 border-r border-panel-border p-6 flex flex-col gap-1">
        <div className="text-primary font-bold mb-6">PlumaMetrics</div>
        <nav className="flex flex-col gap-1 text-sm">
          <a href="#" className="text-primary py-1">
            &gt; overview
          </a>
          <a href="#" className="text-muted py-1 hover:text-foreground">
            &gt; pages
          </a>
          <a href="#" className="text-muted py-1 hover:text-foreground">
            &gt; referrers
          </a>
          <a href="#" className="text-muted py-1 hover:text-foreground">
            &gt; devices
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="text-muted text-sm mb-8">$ site: {SITE_ID}</div>

        {/* Hero number */}
        <div className="mb-10">
          <div className="text-muted text-sm mb-2">total_visitors --last-24h</div>
          <div className="text-7xl font-bold text-primary tracking-tight">
            {totalVisitors.toLocaleString()}
          </div>
        </div>

        {/* Stat panels */}
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
      </main>
    </div>
  );
}