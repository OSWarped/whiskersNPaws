'use client';

import { useEffect } from 'react';

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Clear temporary bookings from localStorage
    localStorage.removeItem('bookings');
  }, []);

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="text-center">
        <div className="display-1 text-success mb-4">🎉</div>
        <h2 className="text-success fw-bold mb-3">Payment Successful!</h2>
        <p className="lead text-muted mb-4">
          Thank you for your reservation. Your payment has been processed and a confirmation will follow.
        </p>
        <a href="/dashboard" className="btn btn-primary btn-lg">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
