import { Suspense } from 'react';
import DashboardClient from './DashboardClient';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="container py-5 text-center">Loading dashboard...</div>}>
      <DashboardClient />
    </Suspense>
  );
}
