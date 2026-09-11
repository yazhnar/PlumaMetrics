type StatusCodeData = {
  hasData: boolean;
  codes: { code: string; count: number }[];
};

export default function StatusCodesPanel({ data }: { data: StatusCodeData }) {
  if (!data.hasData) {
    return (
      <div className="mt-10">
        <div className="text-muted text-sm mb-4">status_codes --last-24h</div>
        <div className="bg-panel border border-panel-border rounded p-4 text-muted text-sm">
          No status code data yet. Add the status code snippet from the README to your error pages to start tracking.
        </div>
      </div>
    );
  }

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