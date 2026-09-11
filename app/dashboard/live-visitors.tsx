'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LiveVisitors({ siteId }: { siteId: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function checkRecent() {
      const sixtySecondsAgo = new Date(Date.now() - 60 * 1000).toISOString();
      const { count: recentCount, error } = await supabase
        .from('events')
        .select('visitor_hash', { count: 'exact', head: true })
        .eq('site_id', siteId)
        .gte('created_at', sixtySecondsAgo);
      console.log('LiveVisitors check:', { recentCount, error, siteId, sixtySecondsAgo });
      setCount(recentCount || 0);
    }

    checkRecent();

    const channel = supabase
      .channel('live-events')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'events', filter: `site_id=eq.${siteId}` },
        () => {
          checkRecent();
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    const interval = setInterval(checkRecent, 15000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [siteId]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`w-2 h-2 rounded-full ${count > 0 ? 'bg-primary' : 'bg-muted'}`} />
      <span className="text-foreground">{count} visitor{count === 1 ? '' : 's'} online now</span>
    </div>
  );
}