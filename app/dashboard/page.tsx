export default function Dashboard() {
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
        <div className="text-muted text-sm mb-8">$ site: my-test-blog</div>

        {/* Hero number */}
        <div className="mb-10">
          <div className="text-muted text-sm mb-2">total_visitors --last-24h</div>
          <div className="text-7xl font-bold text-primary tracking-tight">1,284</div>
        </div>

        {/* Stat panels */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-panel border border-panel-border rounded p-4">
            <div className="text-muted text-sm mb-1">unique_today</div>
            <div className="text-2xl font-bold text-foreground">342</div>
          </div>
          <div className="bg-panel border border-panel-border rounded p-4">
            <div className="text-muted text-sm mb-1">top_page</div>
            <div className="text-2xl font-bold text-foreground">/blog</div>
          </div>
          <div className="bg-panel border border-panel-border rounded p-4">
            <div className="text-muted text-sm mb-1">error_404s</div>
            <div className="text-2xl font-bold text-error">7</div>
          </div>
        </div>
      </main>
    </div>
  );
}