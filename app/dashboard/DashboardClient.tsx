'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Pet {
  id: number;
  name: string;
  type: string;
  breed?: string;
  specialNeeds?: string;
}

interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  pets: Pet[];
}

interface PetForm {
    name: string;
    type: string;
    breed: string;
    specialNeeds: string;
  }

export default function DashboardClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const [formData, setFormData] = useState<PetForm>({
    name: '',
    type: '',
    breed: '',
    specialNeeds: '',
  });


  const now = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) throw new Error('No authentication token found');

        const headers = { Authorization: `Bearer ${token}` };

        const userRes = await fetch('/api/auth/me', { headers });
        if (!userRes.ok) throw new Error('Failed to fetch user');
        setUser(await userRes.json());

        const petsRes = await fetch('/api/pets/me', { headers });
        if (petsRes.ok) setPets(await petsRes.json());

        const resvRes = await fetch('/api/reservations', { headers });
        if (resvRes.ok) {
          const data: Reservation[] = await resvRes.json();
          const sorted = data.sort(
            (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
          setReservations(sorted);
        }
      } catch (err) {
        console.error(err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    if (searchParams!.get('canceled')) {
        setToastVisible(true);
        const timer = setTimeout(() => setToastVisible(false), 5000);
        return () => clearTimeout(timer);
      }
      
  }, [searchParams]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  const handleAddPet = async () => {
    if (!formData.name || !formData.type) {
      setError('Name and type are required.');
      return;
    }

    const token = localStorage.getItem('jwt');
    if (!token) return;

    const res = await fetch('/api/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...formData, userId: user?.id }),
    });

    if (res.ok) {
      const newPet = await res.json();
      setPets([...pets, newPet]);
      setFormData({ name: '', type: '', breed: '', specialNeeds: '' });
      setError('');
      setShowModal(false);
    } else {
      const errorData = await res.json();
      setError(errorData.message || 'Failed to add pet.');
    }
  };

  const handleRemovePet = async (id: number) => {
    const token = localStorage.getItem('jwt');
    if (!token) return;

    const res = await fetch(`/api/pets/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setPets(pets.filter((p) => p.id !== id));
    } else {
      const errData = await res.json();
      setError(errData.message || 'Failed to delete pet.');
    }
  };

  const upcomingReservations = reservations.filter((r) => new Date(r.startDate) > now);
  const pastReservations = reservations.filter((r) => new Date(r.endDate) < now);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Toast */}
      {toastVisible && (
        <div
          className="toast show position-fixed bottom-0 end-0 m-4"
          role="alert"
          style={{ zIndex: 9999 }}
        >
          <div className="toast-header bg-warning text-dark">
            <strong className="me-auto">Payment Canceled</strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => setToastVisible(false)}
            ></button>
          </div>
          <div className="toast-body">
            Your Stripe payment was canceled. You can try again anytime.
          </div>
        </div>
      )}

      <h2 className="mb-4">Welcome, {user?.firstName} {user?.lastName}!</h2>

      {/* Pets */}
      <div className="mb-5">
        <h4>Your Pets</h4>
        {pets.length === 0 ? (
          <p className="text-muted">No pets added yet.</p>
        ) : (
          <div className="row g-3">
            {pets.map((pet) => (
              <div className="col-md-6" key={pet.id}>
                <div className="card">
                  <div className="card-body">
                    <h5>{pet.name}</h5>
                    <p><strong>Type:</strong> {pet.type}{pet.breed && ` - ${pet.breed}`}</p>
                    <p><strong>Special Needs:</strong> {pet.specialNeeds || 'None'}</p>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemovePet(pet.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>
          Add New Pet
        </button>
      </div>

      <hr />

      <a href="/calendar" className="btn btn-success mb-4">Add New Reservation</a>

      {/* Reservations */}
      <div className="row">
        <div className="col-lg-6">
          <h5 className="text-success">Upcoming Reservations</h5>
          {upcomingReservations.length === 0 ? (
            <p>No upcoming reservations.</p>
          ) : (
            upcomingReservations.map((res) => (
              <div key={res.id} className="card mb-3">
                <div className="card-body">
                  <h6>{new Date(res.startDate).toLocaleDateString()}</h6>
                  <p><strong>Status:</strong> {res.status}</p>
                  <p><strong>Total:</strong> ${res.totalPrice.toFixed(2)}</p>
                  <div><strong>Pets:</strong>
                    <ul>
                      {res.pets.map((p) => (
                        <li key={p.id}>{p.name} ({p.type})</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="col-lg-6">
          <h5 className="text-muted">Past Reservations</h5>
          {pastReservations.length === 0 ? (
            <p>No past reservations.</p>
          ) : (
            pastReservations.map((res) => (
              <div key={res.id} className="card mb-3 border-secondary">
                <div className="card-body">
                  <h6>{new Date(res.startDate).toLocaleDateString()}</h6>
                  <p><strong>Status:</strong> {res.status}</p>
                  <p><strong>Total:</strong> ${res.totalPrice.toFixed(2)}</p>
                  <div><strong>Pets:</strong>
                    <ul>
                      {res.pets.map((p) => (
                        <li key={p.id}>{p.name} ({p.type})</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add a New Pet</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                {(['name', 'type', 'breed', 'specialNeeds'] as (keyof PetForm)[]).map((field) => (
  <div className="mb-3" key={field}>
    <label className="form-label text-capitalize">{field}</label>
    <input
      name={field}
      className="form-control"
      value={formData[field]}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }))
      }
    />
  </div>
))}

              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddPet}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
