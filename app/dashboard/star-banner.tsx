export default function StarBanner() {
  return (
    <a
      href="https://github.com/yazhnar/PlumaMetrics"
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-panel-border rounded p-3 hover:bg-panel transition-colors"
    >
      <div className="text-primary text-sm font-bold">⭐ Star on GitHub</div>
      <div className="text-muted text-xs mt-1">
        Got an idea? Suggest it — the most-upvoted ones ship next.
      </div>
    </a>
  );
}