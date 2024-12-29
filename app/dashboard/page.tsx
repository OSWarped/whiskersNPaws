'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  Divider,
  CircularProgress,
  TextField,
  Alert,
} from '@mui/material';
import Cookies from 'js-cookie';

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

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    specialNeeds: '',
  });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('authToken') || localStorage.getItem('jwt') || undefined;

        if (!token) {
          throw new Error('No authentication token found');
        }

        // Fetch user info
        const userResponse = await fetch('/api/auth/me', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user');
        }

        const userData = await userResponse.json();
        setUser(userData);

        // Fetch pets
        const petsResponse = await fetch('/api/pets/me', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (petsResponse.ok) {
          const petsData = await petsResponse.json();
          setPets(petsData);
        } else {
          console.error('Failed to fetch pets:', await petsResponse.json());
        }

        // Fetch reservations
        const reservationsResponse = await fetch('/api/reservations', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (reservationsResponse.ok) {
          const reservationsData = await reservationsResponse.json();
          setReservations(reservationsData);
        } else {
          console.error('Failed to fetch reservations:', await reservationsResponse.json());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPet = async () => {
    if (!formData.name || !formData.type) {
      setError('Name and type are required.');
      return;
    }

    try {
      const token = Cookies.get('authToken') || localStorage.getItem('jwt');
      if (!token) {
        setError('User not authenticated.');
        return;
      }

      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, userId: user?.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add pet.');
        return;
      }

      const newPet = await response.json();
      setPets((prevPets) => [...prevPets, newPet]);
      setFormData({ name: '', type: '', breed: '', specialNeeds: '' });
    } catch (error) {
      console.error('Error adding pet:', error);
      setError('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.firstName} {user?.lastName}!
      </Typography>

      <Grid container spacing={4}>
        {/* Pets Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Your Pets
            </Typography>
            {pets.length === 0 ? (
              <Typography>No pets added yet.</Typography>
            ) : (
              <List>
                {pets.map((pet) => (
                  <Box key={pet.id}>
                    <ListItem>
                      <Typography>
                        <strong>Name:</strong> {pet.name} | <strong>Type:</strong> {pet.type}{' '}
                        {pet.breed ? `| Breed: ${pet.breed}` : ''}{' '}
                        {pet.specialNeeds ? `| Special Needs: ${pet.specialNeeds}` : ''}
                      </Typography>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            )}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Add a Pet
              </Typography>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <TextField
                label="Pet Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Pet Type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Breed (Optional)"
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Special Needs (Optional)"
                name="specialNeeds"
                value={formData.specialNeeds}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleAddPet}>
                Add Pet
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Reservations Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Your Reservations
            </Typography>
            {reservations.length === 0 ? (
              <Typography>No Reservations.</Typography>
            ) : (
              <List>
                {reservations.map((reservation) => (
                  <Box key={reservation.id}>
                    <ListItem>
                      <Typography>
                        <strong>Dates:</strong>{' '}
                        {new Date(reservation.startDate).toLocaleDateString()} -{' '}
                        {new Date(reservation.endDate).toLocaleDateString()} |{' '}
                        <strong>Status:</strong> {reservation.status} | <strong>Total Price:</strong>{' '}
                        ${reservation.totalPrice.toFixed(2)}
                      </Typography>
                    </ListItem>
                    {reservation.pets && (
                      <ListItem>
                        <Typography>
                          <strong>Pets:</strong>{' '}
                          {reservation.pets.map((pet) => `${pet.name} (${pet.type})`).join(', ')}
                        </Typography>
                      </ListItem>
                    )}
                    <Divider />
                  </Box>
                ))}
              </List>
            )}
            <Button
              variant="contained"
              color="primary"
              href="/calendar"
              sx={{ mt: 2 }}
            >
              Add New Reservation
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
