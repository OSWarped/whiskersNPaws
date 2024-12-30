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
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';

interface Booking {
  startDate: string;
  service: string;
  addOns: string[];
  pets: Pet[];
  totalCost: number;
  details: {
    id: number;
    reservationId: number;
    serviceId: string;
    addOnId: string | null;
    price: number;
    quantity: number;
  }[];
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
  breed?: string;
  specialNeeds?: string;
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
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);

  const router = useRouter();

  // Fetch resources
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) throw new Error('Authorization token not found');

        const [servicesRes, addOnsRes, petsRes, reservationsRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/addons'),
          fetch('/api/pets/me', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('/api/reservations', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!servicesRes.ok || !addOnsRes.ok || !petsRes.ok || !reservationsRes.ok) {
          throw new Error('Failed to fetch one or more resources');
        }

        const [servicesData, addOnsData, petsData, reservationsData] = await Promise.all([
          servicesRes.json(),
          addOnsRes.json(),
          petsRes.json(),
          reservationsRes.json(),
        ]);

        setServices(servicesData as Service[]);
        setAddOns(addOnsData as AddOn[]);
        setPets(petsData as Pet[]);

        const formattedBookings: Booking[] = (reservationsData as Booking[]).map((res) => {
          const serviceDetail = res.details.find((detail) => detail.serviceId);
          const addOnDetails = res.details.filter((detail) => detail.addOnId);

          return {
            startDate: res.startDate,
            service: serviceDetail?.serviceId || '',
            addOns: addOnDetails.map((detail) => detail.addOnId || ''),
            pets: res.pets.map((pet) => ({
              id: pet.id,
              name: pet.name,
              type: pet.type,
              breed: pet.breed || '',
              specialNeeds: pet.specialNeeds || '',
            })),
            totalCost: res.totalCost || 0,
            details: res.details.map((detail) => ({
              id: detail.id,
              reservationId: detail.reservationId,
              serviceId: detail.serviceId,
              addOnId: detail.addOnId,
              price: detail.price,
              quantity: detail.quantity,
            })),
          };
        });

        setExistingBookings(formattedBookings);
        setBookings(formattedBookings);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setError('Unable to load resources. Please try again.');
      }
    };

    fetchResources();
  }, []);
  

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  
    // Find a booking for the selected date
    const booking = bookings.find(
      (b) => new Date(b.startDate).toDateString() === date.toDateString()
    );
  
    if (booking) {
      // Extract service and add-ons from details
      const service = booking.details.find((detail) => detail.serviceId)?.serviceId || null;
      const addOns = booking.details
        .filter((detail) => detail.addOnId)
        .map((detail) => detail.addOnId!);
  
      // Populate modal with booking details
      setSelectedService(service);
      setSelectedAddOns(addOns);
      setSelectedPets(booking.pets.map((pet) => pet.id));
    } else {
      // Clear modal fields for a new reservation
      setSelectedService(null);
      setSelectedAddOns([]);
      setSelectedPets([]);
    }
  
    // Determine if the reservation is editable (only future dates are editable)
    const isEditable = date >= new Date();
    setError(!isEditable ? 'Past reservations cannot be edited.' : null);
  
    // Open the modal
    setIsModalOpen(true);
  };
  
  

  const handleSaveBooking = () => {
    if (!selectedDate || !selectedService || selectedPets.length === 0) {
      setError('Please select a service and at least one pet.');
      return;
    }

    const service = services.find((s) => s.id === selectedService);
    const addOnsCost = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      return sum + (addOn?.price || 0);
    }, 0);

    const totalCost = (service?.basePricePerDay || 0) + addOnsCost;

    const details = [
      {
        id: Math.random(),
        reservationId: 0,
        serviceId: selectedService,
        addOnId: null,
        price: service?.basePricePerDay || 0,
        quantity: 1,
      },
      ...selectedAddOns.map((addOnId) => {
        const addOn = addOns.find((a) => a.id === addOnId);
        return {
          id: Math.random(),
          reservationId: 0,
          serviceId: '',
          addOnId,
          price: addOn?.price || 0,
          quantity: 1,
        };
      }),
    ];

    const newBooking: Booking = {
      startDate: selectedDate.toISOString(),
      service: selectedService,
      addOns: selectedAddOns,
      pets: selectedPets.map((id) => pets.find((pet) => pet.id === id)!),
      totalCost,
      details,
    };

    setBookings((prev) => {
      const existingBookingIndex = prev.findIndex(
        (b) => new Date(b.startDate).toISOString() === newBooking.startDate
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
    const newBookings = bookings.filter(
      (booking) =>
        !existingBookings.some(
          (existing) =>
            existing.startDate === booking.startDate &&
            existing.service === booking.service &&
            JSON.stringify(existing.addOns) === JSON.stringify(booking.addOns) &&
            JSON.stringify(existing.pets) === JSON.stringify(booking.pets)
        )
    );

    if (newBookings.length === 0) {
      setError('No new reservations to check out.');
      return;
    }

    localStorage.setItem('bookings', JSON.stringify(newBookings));
    router.push('/checkout');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Book Your Pet Sitting Dates
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Calendar
        onClickDay={handleDateClick}
        tileClassName={({ date }) => {
          const booking = bookings.find((b) => new Date(b.startDate).toDateString() === date.toDateString());
          if (booking) {
            return date < new Date() ? 'past-reservation' : 'future-reservation';
          }
          return '';
        }}
        calendarType="gregory"
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
      Reservation Details for {selectedDate?.toDateString()}
    </Typography>

    {/* Services */}
    <Typography variant="h6" gutterBottom>
      Selected Service
    </Typography>
    {services.map((service) => (
      <FormControlLabel
        key={service.id}
        control={
          <Checkbox
            checked={selectedService === service.id}
            onChange={() => setSelectedService(service.id)}
            disabled={!!(selectedDate && selectedDate < new Date())}
          />
        }
        label={`${service.name} ($${service.basePricePerDay.toFixed(2)})`}
      />
    ))}

    {/* Add-Ons */}
    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
      Selected Add-Ons
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
            disabled={!!(selectedDate && selectedDate < new Date())}
          />
        }
        label={`${addOn.name} ($${addOn.price.toFixed(2)})`}
      />
    ))}

    {/* Pets */}
    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
      Selected Pets
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
            disabled={!!(selectedDate && selectedDate < new Date())}
          />
        }
        label={pet.name}
      />
    ))}

    {/* Save Button */}
    {selectedDate && selectedDate >= new Date() && (
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSaveBooking}
      >
        Save Changes
      </Button>
    )}
  </Box>
</Modal>

    </Box>

    
  );
}
