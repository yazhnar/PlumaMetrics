import StarBanner from './star-banner';
import NavLinks from './nav-links';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r border-panel-border p-6 flex flex-col gap-1">
      <a href="/" className="text-primary font-bold mb-6 block hover:opacity-80 transition-opacity">PlumaMetrics</a>
        <NavLinks />
      </aside>
      <main className="flex-1 p-8">
        <div className="flex justify-end mb-6">
          <StarBanner />
        </div>
        {children}
      </main>
    </div>
  );
}