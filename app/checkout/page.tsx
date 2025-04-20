'use client';

import { useState, useEffect } from 'react';
import moment from 'moment';

interface Pet {
  id: number;
  name: string;
  type: string;
  breed?: string;
  specialNeeds?: string;
}

interface Booking {
  date: string;
  service: string;
  addOns: string[];
  pets: Pet[];
  totalCost: number;
  details: {
    id: number;
    reservationId: number;
    addOnId: string | null;
    price: number;
    quantity: number;
  }[];
}

export default function CheckoutPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings);
  }, []);

  const handleStripeCheckout = async () => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
  
    try {
      const token = localStorage.getItem('jwt');
  
      if (!token) {
        setErrorMessage('You must be logged in to continue.');
        setLoading(false);
        return;
      }
  
      // 🔐 Fetch user details to get user ID
      const userRes = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!userRes.ok) {
        setErrorMessage('Unable to retrieve user info.');
        setLoading(false);
        return;
      }
  
      const user = await userRes.json();
  
      // 🚀 Start Stripe Checkout with bookings and userId
      const res = await fetch('/api/checkout-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookings, userId: user.id }),
      });
  
      if (!res.ok) {
        setErrorMessage('Failed to initiate payment. Please try again.');
        setLoading(false);
        return;
      }
  
      const data = await res.json();
  
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErrorMessage('Stripe Checkout URL was not returned.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong while creating the checkout session.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Checkout</h2>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {errorMessage && (
        <div className="alert alert-danger">{errorMessage}</div>
      )}

      {bookings.length === 0 ? (
        <p className="text-center">No bookings to display.</p>
      ) : (
        bookings.map((booking, index) => (
          <div className="card mb-4 shadow-sm" key={index}>
            <div className="card-body">
              <h5 className="card-title">
                Reservation Date: {moment(booking.date).format('MMMM Do, YYYY')}
              </h5>
              <p><strong>Service:</strong> {booking.service}</p>
              <p><strong>Add-Ons:</strong> {booking.addOns.length > 0 ? booking.addOns.join(', ') : 'None'}</p>
              <p><strong>Total:</strong> ${booking.totalCost.toFixed(2)}</p>

              <h6 className="mt-4">Pets</h6>
              {booking.pets.length === 0 ? (
                <p>No pets selected</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {booking.pets.map((pet) => (
                    <li className="list-group-item" key={pet.id}>
                      <strong>{pet.name}</strong> — {pet.type}
                      {pet.breed && <> ({pet.breed})</>}
                      {pet.specialNeeds && (
                        <div className="text-muted small">
                          Special Needs: {pet.specialNeeds}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))
      )}

      <div className="text-center mt-4">
        <button
          className="btn btn-primary w-100"
          onClick={handleStripeCheckout}
          disabled={loading || bookings.length === 0}
        >
          {loading ? 'Redirecting to Stripe...' : 'Confirm and Pay'}
        </button>
      </div>
    </div>
  );
}
