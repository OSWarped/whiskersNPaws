'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Service } from '@prisma/client';
import Link from 'next/link';

interface User {
  id: number;
  email: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/admin/services');
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        router.push('/login');
        return;
      }

      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        router.push('/unauthorized');
        return;
      }

      const data = await res.json();
      if (!data.isAdmin) {
        router.push('/unauthorized');
        return;
      }

      setUser(data);
      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading || !user) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Admin Dashboard</h1>
        <p className="text-muted">Welcome, <strong>{user.firstName} {user.lastName}</strong></p>
      </div>

      <div className="row g-4">
        {/* Users */}
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm h-100 hover-shadow">
            <div className="card-body d-flex flex-column">
              <div className="mb-3 text-primary fs-2">👥</div>
              <h5 className="card-title">User Management</h5>
              <p className="text-muted flex-grow-1">Manage all users, update profiles, and set permissions.</p>
              <Link href="/admin/users" className="btn btn-primary">
              Go to Users
              </Link>
            </div>
          </div>
        </div>

        {/* Pets */}
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 shadow-sm h-100 hover-shadow">
            <div className="card-body d-flex flex-column">
              <div className="mb-3 text-success fs-2">🐾</div>
              <h5 className="card-title">Pet Management</h5>
              <p className="text-muted flex-grow-1">Edit or remove pet profiles and view owner info.</p>
               <Link href="/admin/pets" className="btn btn-primary">
              Go to Pets
              </Link>
            </div>
          </div>
        </div>

        {/* Reservations - Coming Soon */}
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 bg-light text-muted shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <div className="mb-3 fs-2">📅</div>
              <h5 className="card-title">Reservations</h5>
              <p className="flex-grow-1">Monitor bookings and upcoming schedules.</p>
              <button className="btn btn-secondary mt-auto" disabled>Coming Soon</button>
            </div>
          </div>
        </div>

        {/* Services */}
<div className="col-md-6 col-lg-4">
  <div className="card border-0 shadow-sm h-100 hover-shadow">
    <div className="card-body d-flex flex-column">
      <div className="mb-3 text-warning fs-2">🛠️</div>
      <h5 className="card-title">Services & Add-Ons</h5>
      <p className="text-muted flex-grow-1">Manage pet care services and optional add-ons.</p>

      <ul className="list-group mb-3">
        {services.length === 0 ? (
          <li className="list-group-item text-muted fst-italic">No services yet.</li>
        ) : (
          services.slice(0, 2).map((s) => (
            <li key={s.id} className="list-group-item d-flex justify-content-between">
              <span>{s.name}</span>
              <span className="text-muted">${s.basePricePerDay.toFixed(2)}</span>
            </li>
          ))
        )}
        {services.length > 2 && (
          <li className="list-group-item text-center text-muted">+ {services.length - 2} more</li>
        )}
      </ul>

     
      <Link href="/admin/services" className="btn btn-primary">
              Manage Services
              </Link>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}
