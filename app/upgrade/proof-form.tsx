'use client';

import { useState } from 'react';

// Replace with your actual email address
const SUPPORT_EMAIL = '[YOUR_EMAIL_ADDRESS]';

export default function ProofForm() {
  const [siteId, setSiteId] = useState('');
  const [method, setMethod] = useState('BTC');
  const [txRef, setTxRef] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!siteId || !txRef || !email) {
      setError('Please fill in all fields');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Enter a valid email address');
      return;
    }
    setError('');

    const subject = `Metrics Pro payment proof — ${siteId}`;
    const body = `Site ID: ${siteId}\nPayment method: ${method}\nTransaction reference: ${txRef}\nReply-to email: ${email}`;

    const mailtoLink = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-panel border border-panel-border rounded p-6 space-y-3">
      <div className="text-muted text-sm mb-2">$ submit proof</div>
      <p className="text-muted text-xs mb-2">
        This opens your email app with the details below pre-filled — just hit send.
      </p>

      <input
        type="text"
        placeholder="Your site ID (e.g. my-blog)"
        value={siteId}
        onChange={(e) => setSiteId(e.target.value)}
        className="w-full bg-background border border-panel-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
      />

            <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="w-full bg-background border border-panel-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
      >
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        <option value="Solana">Solana</option>
        <option value="UPI">UPI</option>
      </select>

      <input
        type="text"
        placeholder="Transaction hash or UPI reference"
        value={txRef}
        onChange={(e) => setTxRef(e.target.value)}
        className="w-full bg-background border border-panel-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
      />

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-background border border-panel-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary"
      />

      {error && <p className="text-error text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full border border-panel-border rounded px-4 py-2 text-sm text-primary hover:bg-panel"
      >
        open email to submit proof
      </button>
    </form>
  );
}