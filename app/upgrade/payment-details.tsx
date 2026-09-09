'use client';

import { useState } from 'react';
import CopyAddress from './copy-address';

export default function PaymentDetails() {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <div className="bg-panel border border-panel-border rounded p-6 text-center">
        <button
          onClick={() => setRevealed(true)}
          className="border border-panel-border rounded px-4 py-2 text-sm text-primary hover:bg-background"
        >
          $ show payment details
        </button>
      </div>
    );
  }

  return (
    <div className="bg-panel border border-panel-border rounded p-6 space-y-4">
      <div className="text-muted text-sm">$ payment --methods</div>

      <div>
        <div className="text-foreground font-bold text-sm mb-1">BTC</div>
        <CopyAddress address="bc1q49ll8d8nr9q2ymzj0fm9qey2c583c5amsd7jxw" />
      </div>

      <div>
        <div className="text-foreground font-bold text-sm mb-1">ETH</div>
        <CopyAddress address="0x13f8796d4EE1F10554727D41052bB7acd6Ffc3D9" />
      </div>

      <div>
        <div className="text-foreground font-bold text-sm mb-1">Solana</div>
        <CopyAddress address="6216YTnYkR8suBnPK134fr3fasVqnHaCy1EtqQuED68g" />
      </div>

      <div>
        <div className="text-foreground font-bold text-sm mb-1">UPI (India)</div>
        <CopyAddress address="profever@kotak" />
      </div>
    </div>
  );
}