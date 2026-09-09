export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 border-r border-panel-border p-6 flex flex-col gap-1">
        <div className="text-primary font-bold mb-6">PlumaMetrics</div>
        <nav className="flex flex-col gap-1 text-sm">
          <a href="/dashboard" className="text-muted py-1 hover:text-foreground">
            &gt; overview
          </a>
          <a href="/dashboard/pages" className="text-muted py-1 hover:text-foreground">
            &gt; pages
          </a>
          <a href="/dashboard/referrers" className="text-muted py-1 hover:text-foreground">
            &gt; referrers
          </a>
          <a href="/dashboard/devices" className="text-muted py-1 hover:text-foreground">
            &gt; devices
          </a>
        </nav>
      </aside>

      {/* Page content gets injected here */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}