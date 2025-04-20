'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Pet {
  id: number;
  name: string;
  type: string;
  breed?: string;
  specialNeeds?: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function AdminPetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPets = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) return;

      const res = await fetch('/api/admin/pets', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setPets(data);
      } else {
        console.error('Failed to fetch pets');
      }

      setLoading(false);
    };

    fetchPets();
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-3">
        <button className="btn btn-outline-secondary" onClick={() => router.push('/admin')}>
          ← Back to Admin Panel
        </button>
      </div>

      <h2 className="mb-4">All Pets</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Breed</th>
                <th>Special Needs</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet.id}>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>{pet.breed || '—'}</td>
                  <td>{pet.specialNeeds || '—'}</td>
                  <td>
                    {pet.user.firstName} {pet.user.lastName} <br />
                    <small className="text-muted">{pet.user.email}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
