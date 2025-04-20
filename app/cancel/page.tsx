'use client';

import { useRouter } from 'next/navigation';

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="container py-5 text-center">
      <div className="alert alert-warning" role="alert">
        <h1 className="display-5">⚠️ Payment Canceled</h1>
        <p className="lead mt-3">It looks like you canceled your payment. Your reservation has not been saved.</p>
      </div>
      <div className="mt-4">
        <button className="btn btn-outline-primary me-3" onClick={() => router.push('/calendar')}>
          Back to Calendar
        </button>
        <button className="btn btn-primary" onClick={() => router.push('/checkout')}>
          Retry Checkout
        </button>
      </div>
    </div>
  );
}
