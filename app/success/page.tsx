'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('bookings'); // clear bookings after successful payment
  }, []);

  return (
    <div className="container py-5 text-center">
      <div className="alert alert-success" role="alert">
        <h1 className="display-5">🎉 Payment Successful!</h1>
        <p className="lead mt-3">Your reservation has been confirmed. Thank you!</p>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </button>
    </div>
  );
}
