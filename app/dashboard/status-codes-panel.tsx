type StatusCodeData = {
  hasData: boolean;
  codes: { code: string; count: number }[];
};

const FAKE_PREVIEW_DATA = [
  { code: '500', count: 42 },
  { code: '403', count: 28 },
  { code: '503', count: 15 },
];

export default function StatusCodesPanel({ data }: { data: StatusCodeData }) {
  if (data.hasData) {
    const maxCount = data.codes[0]?.count || 1;
    return (
      <div className="mt-10">
        <div className="text-muted text-sm mb-4">status_codes --last-24h</div>
        <div className="flex flex-col gap-2">
          {data.codes.map((c) => (
            <div key={c.code} className="bg-panel border border-panel-border rounded p-4">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-foreground font-bold">{c.code}</span>
                <span className="text-error font-bold">{c.count}</span>
              </div>
              <div className="h-1 bg-background rounded overflow-hidden">
                <div
                  className="h-full bg-error"
                  style={{ width: `${(c.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // No opted-in data yet — show a blurred preview with an unlock message
  const maxFakeCount = FAKE_PREVIEW_DATA[0].count;
  return (
    <div className="mt-10">
      <div className="text-muted text-sm mb-4">status_codes --last-24h</div>
      <div className="relative">
        <div className="flex flex-col gap-2 blur-sm select-none pointer-events-none">
          {FAKE_PREVIEW_DATA.map((c) => (
            <div key={c.code} className="bg-panel border border-panel-border rounded p-4">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-foreground font-bold">{c.code}</span>
                <span className="text-error font-bold">{c.count}</span>
              </div>
              <div className="h-1 bg-background rounded overflow-hidden">
                <div
                  className="h-full bg-error"
                  style={{ width: `${(c.count / maxFakeCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6">
          <div className="text-foreground font-bold">
            Unlock detailed error codes
          </div>
          <div className="text-muted text-sm max-w-sm">
            Add one line to your site to see 403s, 500s, and more.
          </div>
          <a
            href="https://github.com/yazhnar/PlumaMetrics#status-code-tracking-optional"
            className="text-sm border border-panel-border rounded px-4 py-2 text-primary hover:bg-panel"
          >
            $ view setup instructions
          </a>
        </div>
      </div>
    </div>
  );
}