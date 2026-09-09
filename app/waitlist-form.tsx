'use client';

import { useState } from 'react';

const GOOGLE_FORM_ID = '1FAIpQLSfOhRifW9kDD0EfDxjpdQ3WHP310t9ZrtSLXuyNmo0PMOvQ0w';
const EMAIL_ENTRY_ID = 'entry.900713207';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Enter a valid email address');
      return;
    }
    setError('');
    setStatus('submitting');

    const formUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
    const body = new URLSearchParams();
    body.append(EMAIL_ENTRY_ID, email);

    await fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
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
      </div>
      {error && <p className="text-error text-sm">{error}</p>}
    </form>
  );
}