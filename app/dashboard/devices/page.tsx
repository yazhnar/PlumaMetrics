import { supabaseAdmin } from '@/lib/supabase-admin';

async function getDevicesData(siteId: string) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: events, error } = await supabaseAdmin
    .from('events')
    .select('device_type, browser')
    .eq('site_id', siteId)
    .gte('created_at', twentyFourHoursAgo);

  if (error || !events) return { devices: [], browsers: [] };

  const deviceCounts: Record<string, number> = {};
  const browserCounts: Record<string, number> = {};

  events.forEach((e) => {
    deviceCounts[e.device_type] = (deviceCounts[e.device_type] || 0) + 1;
    browserCounts[e.browser] = (browserCounts[e.browser] || 0) + 1;
  });

  const devices = Object.entries(deviceCounts)
    .map(([device_type, count]) => ({ device_type, count }))
    .sort((a, b) => b.count - a.count);

  const browsers = Object.entries(browserCounts)
    .map(([browser, count]) => ({ browser, count }))
    .sort((a, b) => b.count - a.count);

  return { devices, browsers };
}

export default async function DevicesPage() {
  const SITE_ID = 'my-test-blog';
  const { devices, browsers } = await getDevicesData(SITE_ID);
  const maxDeviceCount = devices[0]?.count || 1;
  const maxBrowserCount = browsers[0]?.count || 1;

  return (
    <>
      <div className="text-muted text-sm mb-8">
        $ devices --site {SITE_ID} --last-24h
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="text-muted text-sm mb-4">device_type</div>
          <div className="flex flex-col gap-2">
            {devices.map((d) => (
              <div key={d.device_type} className="bg-panel border border-panel-border rounded p-4">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-foreground font-bold">{d.device_type}</span>
                  <span className="text-primary font-bold">{d.count}</span>
                </div>
                <div className="h-1 bg-background rounded overflow-hidden">
                  <div
                    className="h-full bg-primary-dim"
                    style={{ width: `${(d.count / maxDeviceCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-muted text-sm mb-4">browser</div>
          <div className="flex flex-col gap-2">
            {browsers.map((b) => (
              <div key={b.browser} className="bg-panel border border-panel-border rounded p-4">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-foreground font-bold">{b.browser}</span>
                  <span className="text-primary font-bold">{b.count}</span>
                </div>
                <div className="h-1 bg-background rounded overflow-hidden">
                  <div
                    className="h-full bg-primary-dim"
                    style={{ width: `${(b.count / maxBrowserCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}