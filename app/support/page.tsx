import PaymentDetails from './payment-details';

export default function SupportPage() {
  return (
    <main className="flex-1 flex flex-col items-center p-8">
      <div className="max-w-lg w-full space-y-8 py-12">
        <div className="text-center space-y-2">
                    <a href="/" className="text-muted text-sm hover:text-foreground transition-colors">← back to home</a>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Support PlumaMetrics
          </h1>
          <p className="text-info text-sm">
            I'm a non technical founder building a vertical AI SaaS by day, but deeply passionate
            about privacy first, open source software. My mission is to ship at least one
            high utility, privacy first - open source product every month, to democratize technology
            for everyone, especially the non technical community. PlumaMetrics is free and open
            source, forever. If it's useful to you, a small tip helps keep the mission going.
          </p>
        </div>

        <PaymentDetails />

        <div className="bg-panel border border-panel-border rounded p-6 space-y-2">
          <div className="text-muted text-sm">$ other ways to help</div>
          <ul className="text-sm text-foreground space-y-2 list-disc list-inside">
            <li>Star the repo on GitHub</li>
            <li>Suggest a feature in Discussions — upvoted ideas ship first</li>
            <li>Tell another dev who's tired of cookie banners</li>
          </ul>
        </div>
      </div>
    </main>
  );
}