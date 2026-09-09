export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-primary tracking-tight">
          PlumaMetrics
        </h1>
        <p className="text-muted max-w-md">
          Traffic stats without the surveillance.
          <br />
          No cookies, no fingerprinting, no IP storage.
        </p>
        <div className="pt-4">
          <span className="inline-block px-4 py-2 border border-panel-border rounded text-sm text-muted">
            $ dashboard coming next
          </span>
        </div>
      </div>
    </main>
  );
}