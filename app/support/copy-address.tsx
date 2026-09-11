'use client';

import { useState } from 'react';

export default function CopyAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-primary text-sm break-all font-mono">{address}</span>
      <button
        onClick={handleCopy}
        className="shrink-0 text-muted hover:text-primary text-xs border border-panel-border rounded px-2 py-1"
      >
        {copied ? 'copied' : 'copy'}
      </button>
    </div>
  );
}