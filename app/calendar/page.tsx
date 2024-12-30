'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Modal,
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Ensure this is included
import './CustomCalendar.css'; // Custom styles for booked-day

interface Booking {
  date: string; // Use string for date comparison
  service: string;
  addOns: string[];
  pets: number[];
  totalCost: number;
}

interface Service {
  id: string;
  name: string;
  basePricePerDay: number;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
}

interface Pet {
  id: number;
  name: string;
  type: string;
}

export default function CalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedPets, setSelectedPets] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch resources (services, add-ons, pets)
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) throw new Error('Authorization token not found');

        const [servicesRes, addOnsRes, petsRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/addons'),
          fetch('/api/pets/me', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!servicesRes.ok || !addOnsRes.ok || !petsRes.ok) {
          throw new Error('Failed to fetch one or more resources');
        }

        const [servicesData, addOnsData, petsData] = await Promise.all([
          servicesRes.json(),
          addOnsRes.json(),
          petsRes.json(),
        ]);

        setServices(servicesData);
        setAddOns(addOnsData);
        setPets(petsData);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setError('Unable to load resources. Please try again.');
      }
    };

    fetchResources();
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);

    const booking = bookings.find(
      (b) => b.date === date.toDateString()
    );
    if (booking) {
      setSelectedService(booking.service);
      setSelectedAddOns(booking.addOns);
      setSelectedPets(booking.pets);
    } else {
      setSelectedService(null);
      setSelectedAddOns([]);
      setSelectedPets([]);
    }

    setIsModalOpen(true);
  };

  const handleSaveBooking = () => {
    if (!selectedDate || !selectedService || selectedPets.length === 0) {
      setError('Please select a service and at least one pet.');
      return;
    }
  
    // Calculate total cost
    const service = services.find((s) => s.id === selectedService);
    const addOnsCost = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      return sum + (addOn?.price || 0);
    }, 0);
    const totalCost = (service?.basePricePerDay || 0) + addOnsCost;
  
    const newBooking: Booking = {
      date: selectedDate.toDateString(),
      service: selectedService,
      addOns: selectedAddOns,
      pets: selectedPets,
      totalCost, // Add the total cost to the booking
    };
  
    setBookings((prev) => {
      const existingBookingIndex = prev.findIndex(
        (b) => b.date === newBooking.date
      );
      if (existingBookingIndex !== -1) {
        const updatedBookings = [...prev];
        updatedBookings[existingBookingIndex] = newBooking;
        return updatedBookings;
      }
      return [...prev, newBooking];
    });
  
    setIsModalOpen(false);
    setError(null);
  };
  

  const handleCheckout = () => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
    router.push('/checkout');
  };

  const isDateBooked = (date: Date) =>
    bookings.some((booking) => booking.date === date.toDateString());

  const calculateTotalPrice = () => {
    return bookings.reduce((total, booking) => {
      const servicePrice = services.find((s) => s.id === booking.service)?.basePricePerDay || 0;
      const addOnsPrice = booking.addOns.reduce((sum, addOnId) => {
        const addOnCost = addOns.find((a) => a.id === addOnId)?.price || 0;
        return sum + addOnCost;
      }, 0);
      return total + servicePrice + addOnsPrice;
    }, 0).toFixed(2);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Book Your Pet Sitting Dates
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Total Price: ${calculateTotalPrice()}
      </Typography>

      <Calendar
        onClickDay={handleDateClick}
        tileClassName={({ date }) => (isDateBooked(date) ? 'booked-day' : '')}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleCheckout}
        disabled={bookings.length === 0}
      >
        Checkout
      </Button>

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
            width: 400,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Booking Details for {selectedDate?.toDateString()}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Select Service
          </Typography>
          {services.map((service) => (
            <FormControlLabel
              key={service.id}
              control={
                <Checkbox
                  checked={selectedService === service.id}
                  onChange={() => setSelectedService(service.id)}
                />
              }
              label={`${service.name} ($${service.basePricePerDay.toFixed(2)})`}
            />
          ))}

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Select Add-Ons
          </Typography>
          {addOns.map((addOn) => (
            <FormControlLabel
              key={addOn.id}
              control={
                <Checkbox
                  checked={selectedAddOns.includes(addOn.id)}
                  onChange={() =>
                    setSelectedAddOns((prev) =>
                      prev.includes(addOn.id)
                        ? prev.filter((id) => id !== addOn.id)
                        : [...prev, addOn.id]
                    )
                  }
                />
              }
              label={`${addOn.name} ($${addOn.price.toFixed(2)})`}
            />
          ))}

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Select Pets
          </Typography>
          {pets.map((pet) => (
            <FormControlLabel
              key={pet.id}
              control={
                <Checkbox
                  checked={selectedPets.includes(pet.id)}
                  onChange={() =>
                    setSelectedPets((prev) =>
                      prev.includes(pet.id)
                        ? prev.filter((id) => id !== pet.id)
                        : [...prev, pet.id]
                    )
                  }
                />
              }
              label={pet.name}
            />
          ))}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSaveBooking}
          >
            Save Booking
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
