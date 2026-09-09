import ProofForm from './proof-form';
import PaymentDetails from './payment-details';

export default function UpgradePage() {
  return (
    <main className="flex-1 flex flex-col items-center p-8">
      <div className="max-w-lg w-full space-y-8 py-12">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Metrics Pro
          </h1>
          <p className="text-muted text-sm">
            Get access within 24h | $5/mo | unlocks precise status codes, outbound link tracking, and OS-level device breakdowns.
          </p>
        </div>

                <PaymentDetails />

        <div className="bg-panel border border-panel-border rounded p-6 space-y-3">
          <div className="text-muted text-sm">$ next steps</div>
          <ol className="text-sm text-foreground space-y-2 list-decimal list-inside">
            <li>Send $5 (or equivalent) to one of the addresses above</li>
            <li>Submit your payment proof using the form below</li>
            <li>We'll manually verify and email you once Metrics Pro is active — usually within 24 hours</li>
          </ol>
        </div>

        <ProofForm />
      </div>
    </main>
  );
}