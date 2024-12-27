'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, Divider, Button, Alert } from '@mui/material';
import moment from 'moment';

interface Booking {
  title: string;
  start: Date;
  totalCost: number;
  petIds?: number[];
}

interface Pet {
  id: number;
  name: string;
  type: string;
}

export default function CheckoutPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings);

    // Fetch pets associated with the user
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          console.error('No JWT found. Please log in.');
          return;
        }

        const response = await fetch('/api/pets/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const petData = await response.json();
          setPets(petData);
        } else {
          console.error('Failed to fetch pets:', await response.json());
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  const findPetNames = (petIds?: number[]) => {
    if (!petIds) return 'No pets selected';
    return petIds
      .map((id) => pets.find((pet) => pet.id === id)?.name || `Pet ID: ${id}`)
      .join(', ');
  };

  const handleMockPayment = async () => {
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        setErrorMessage('User is not logged in.');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookings }),
      });

      if (response.ok) {
        setSuccessMessage('Reservations successfully created!');
        localStorage.removeItem('bookings'); // Clear the bookings
        setBookings([]); // Clear the UI
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to create reservations.');
      }
    } catch (error) {
      console.error('Error creating reservations:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <List>
        {bookings.map((booking, index) => (
          <Box key={index}>
            <ListItem>
              <Typography variant="body1">
                <strong>{booking.title}</strong>
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                Date: {moment(booking.start).format('MM/DD/YYYY')}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                Pets: {findPetNames(booking.petIds)}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                Total Cost: ${booking.totalCost.toFixed(2)}
              </Typography>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleMockPayment}
        disabled={loading || bookings.length === 0}
      >
        {loading ? 'Processing...' : 'Mock Payment'}
      </Button>
    </Box>
  );
}
