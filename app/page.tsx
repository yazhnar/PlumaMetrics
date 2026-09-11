import WaitlistForm from './waitlist-form';

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
        <div className="pt-4 flex gap-3 justify-center">

          <a href="/dashboard" 
             className="inline-block px-4 py-2 border border-panel-border rounded text-sm text-primary hover:bg-panel transition-colors">
             $ view dashboard
          </a>
          <a href="/support"
             className="inline-block px-4 py-2 border border-panel-border rounded text-sm text-muted hover:text-foreground hover:bg-panel transition-colors">
             $ support this project
          </a>
        </div>
        <div className="pt-6">
          <p className="text-muted text-sm mb-3">
            Want zero-setup hosting instead? Join the waitlist:
          </p>
          <WaitlistForm />
        </div>
      </div>
    </main>
  );
}