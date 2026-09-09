import { supabaseAdmin } from '@/lib/supabase-admin';

async function getReferrersData(siteId: string) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: events, error } = await supabaseAdmin
    .from('events')
    .select('referrer')
    .eq('site_id', siteId)
    .gte('created_at', twentyFourHoursAgo);

  if (error || !events) return [];

  const referrerCounts: Record<string, number> = {};
  events.forEach((e) => {
    const key = e.referrer || 'Direct / None';
    referrerCounts[key] = (referrerCounts[key] || 0) + 1;
  });

  return Object.entries(referrerCounts)
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count);
}

export default async function ReferrersPage() {
  const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default-site';
  const referrers = await getReferrersData(SITE_ID);
  const maxCount = referrers[0]?.count || 1;

  return (
    <>
      <div className="text-muted text-sm mb-8">
        $ referrers --site {SITE_ID} --last-24h
      </div>

      <div className="flex flex-col gap-2">
        {referrers.map((r) => (
          <div key={r.referrer} className="bg-panel border border-panel-border rounded p-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-foreground font-bold">{r.referrer}</span>
              <span className="text-primary font-bold">{r.count}</span>
            </div>
            <div className="h-1 bg-background rounded overflow-hidden">
              <div
                className="h-full bg-primary-dim"
                style={{ width: `${(r.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}