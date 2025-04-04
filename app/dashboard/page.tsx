'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  CircularProgress,
  IconButton,
  Chip,
  Divider,
  Modal,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwt') || undefined;

        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log('JWT token in dashboard page:', localStorage.getItem('jwt'));


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

          // Sort reservations by start date (newest first)
          const sortedReservations = reservationsData.sort(
            (a: Reservation, b: Reservation) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );

          setReservations(sortedReservations);
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
      setError('');
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error adding pet:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleRemovePet = async (petId: number) => {
    try {
      const token = Cookies.get('authToken') || localStorage.getItem('jwt');
      if (!token) {
        setError('User not authenticated.');
        return;
      }

      const response = await fetch(`/api/pets/${petId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to remove pet.');
        return;
      }

      setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
    } catch (error) {
      console.error('Error removing pet:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const renderReservations = (reservations: Reservation[], title: string, color: string) => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color }}>
        {title}
      </Typography>
      {reservations.length === 0 ? (
        <Typography>No {title.toLowerCase()}.</Typography>
      ) : (
        <Grid container spacing={2}>
          {reservations.map((reservation) => (
            <Grid item xs={12} md={6} key={reservation.id}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {new Date(reservation.startDate).toLocaleDateString()}
                </Typography>
                <Typography><strong>Status:</strong> {reservation.status}</Typography>
                <Typography><strong>Total Price:</strong> ${reservation.totalPrice.toFixed(2)}</Typography>
                <Typography>
                  <strong>Pets:</strong>
                </Typography>
                {reservation.pets.map((pet) => (
                  <Typography key={pet.id} sx={{ ml: 2 }}>
                    - <strong>Name:</strong> {pet.name}
                    <br />
                    - <strong>Type:</strong> {pet.type}{pet.breed ? ` - ${pet.breed}` : ''}
                    <br />
                    - <strong>Special Needs:</strong> {pet.specialNeeds || 'None'}
                  </Typography>
                ))}
                <Chip
                  label={reservation.status}
                  color={reservation.status === 'Completed' ? 'success' : 'primary'}
                  sx={{ mt: 2 }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  const now = new Date();
  const upcomingReservations = reservations.filter((res) => new Date(res.startDate) > now);
  const pastReservations = reservations.filter((res) => new Date(res.endDate) < now);

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

      {/* Pet Listing */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Your Pets
        </Typography>
        {pets.length === 0 ? (
          <Typography>No pets added yet.</Typography>
        ) : (
          pets.map((pet) => (
            <Paper key={pet.id} sx={{ p: 2, mb: 2 }}>
              <Typography>
                <strong>Name:</strong> {pet.name}
              </Typography>
              <Typography>
                <strong>Type:</strong> {pet.type}{pet.breed ? ` - ${pet.breed}` : ''}
              </Typography>
              <Typography>
                <strong>Special Needs:</strong> {pet.specialNeeds || 'None'}
              </Typography>
              <IconButton
                onClick={() => handleRemovePet(pet.id)}
                color="error"
                sx={{ mt: 1 }}
              >
                <Delete />
              </IconButton>
            </Paper>
          ))
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
          sx={{ mt: 2 }}
        >
          Add New Pet
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Add Reservation Button */}
      <Button
        variant="contained"
        color="primary"
        href="/calendar"
        sx={{ mb: 4 }}
      >
        Add New Reservation
      </Button>

      {/* Add Pet Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add a New Pet
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Type"
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPet}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* Upcoming Reservations */}
      {renderReservations(upcomingReservations, 'Upcoming Reservations', '#28a745')}

      {/* Past Reservations */}
      {renderReservations(pastReservations, 'Past Reservations', '#dc3545')}
    </Box>
  );
}
