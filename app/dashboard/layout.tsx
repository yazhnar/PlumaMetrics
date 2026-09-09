import NavLinks from './nav-links';export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 border-r border-panel-border p-6 flex flex-col gap-1">
        <div className="text-primary font-bold mb-6">PlumaMetrics</div>
        <NavLinks />
      </aside>

      {/* Page content gets injected here */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}