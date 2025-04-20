'use client';

export default function CheckoutCancelPage() {
  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="text-center">
        <div className="display-1 text-danger mb-4">❌</div>
        <h2 className="text-danger fw-bold mb-3">Payment Canceled</h2>
        <p className="lead text-muted mb-4">
          It looks like you canceled your payment. You can return to your dashboard or try again.
        </p>
        <a href="/dashboard" className="btn btn-outline-secondary me-2">
          Back to Dashboard
        </a>
        <a href="/calendar" className="btn btn-primary">
          Try Again
        </a>
      </div>
    </div>
  );
}
