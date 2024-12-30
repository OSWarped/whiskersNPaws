'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  Alert,
  Paper,
  Grid,
} from '@mui/material';
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
    // Fetch bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings);
  }, []);

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

      const payload = { bookings };

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccessMessage('Reservations successfully created!');
        localStorage.removeItem('bookings');
        setBookings([]);
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
      <Typography variant="h4" gutterBottom align="center">
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
      {bookings.length === 0 ? (
        <Typography variant="body1" align="center">
          No bookings to display.
        </Typography>
      ) : (
        bookings.map((booking, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              backgroundColor: '#f9f9f9',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Date
                </Typography>
                <Typography variant="body1">
                  {moment(booking.date).format('MMMM Do, YYYY')}
                </Typography>
              </Grid>
               
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Pets
                </Typography>
                <List disablePadding sx={{ pl: 2 }}>
                  {booking.pets.length > 0 ? (
                    booking.pets.map((pet) => (
                      <ListItem
                        key={pet.id}
                        sx={{
                          display: 'block',
                          pl: 0,
                          pb: 2,
                        }}
                      >
                        <Typography variant="body2">
                          <strong>Name:</strong> {pet.name}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Type:</strong> {pet.type}
                          {pet.breed ? ` - ${pet.breed}` : ''}
                        </Typography>
                        {pet.specialNeeds && (
                          <Typography variant="body2">
                            <strong>Special Needs:</strong> {pet.specialNeeds}
                          </Typography>
                        )}
                      </ListItem>
                    ))
                  ) : (
                    <ListItem sx={{ display: 'block', pl: 0 }}>
                      <Typography variant="body2">No pets selected</Typography>
                    </ListItem>
                  )}
                </List>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Add-Ons
                </Typography>
                <Typography variant="body1">
                  {booking.addOns.length > 0 ? booking.addOns.join(', ') : 'No Add-Ons'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Total Cost
                </Typography>
                <Typography variant="body1">
                  ${booking.totalCost.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 4, py: 2 }}
        onClick={handleMockPayment}
        disabled={loading || bookings.length === 0}
      >
        {loading ? 'Processing...' : 'Confirm and Pay'}
      </Button>
    </Box>
  );
}
