import { supabaseAdmin } from '@/lib/supabase-admin';

async function getPagesData(siteId: string) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: events, error } = await supabaseAdmin
    .from('events')
    .select('path')
    .eq('site_id', siteId)
    .gte('created_at', twentyFourHoursAgo);

  if (error || !events) return [];

  const pathCounts: Record<string, number> = {};
  events.forEach((e) => {
    pathCounts[e.path] = (pathCounts[e.path] || 0) + 1;
  });

  return Object.entries(pathCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count);
}

export default async function PagesPage() {
  const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default-site';
  const pages = await getPagesData(SITE_ID);
  const maxCount = pages[0]?.count || 1;

  return (
    <>
      <div className="text-muted text-sm mb-8">
        $ pages --site {SITE_ID} --last-24h
      </div>

      <div className="flex flex-col gap-2">
        {pages.map((p) => (
          <div key={p.path} className="bg-panel border border-panel-border rounded p-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-foreground font-bold">{p.path}</span>
              <span className="text-primary font-bold">{p.count}</span>
            </div>
            <div className="h-1 bg-background rounded overflow-hidden">
              <div
                className="h-full bg-primary-dim"
                style={{ width: `${(p.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}