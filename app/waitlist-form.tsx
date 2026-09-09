'use client';

import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'waitlist', email }).toString(),
    });

    setStatus('done');
  }

  if (status === 'done') {
    return (
      <p className="text-primary text-sm">
        $ you're on the list — we'll email you when hosting launches
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-panel border border-panel-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="border border-panel-border rounded px-4 py-2 text-sm text-primary hover:bg-panel disabled:opacity-50"
      >
        {status === 'submitting' ? 'joining...' : 'join waitlist'}
      </button>
    </form>
  );
}