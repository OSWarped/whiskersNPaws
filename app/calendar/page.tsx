'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Box,
  Typography,
  Button,
  Modal,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';

// Set up the localizer with moment.js
const localizer = momentLocalizer(moment);

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  service?: string;
  addOns?: Record<string, string[]>; // { "2024-12-26": ["Add-On 1", "Add-On 2"] }
  petIds?: number[];
}

interface Service {
  id: string;
  name: string;
  description: string;
  basePricePerDay: number;
}

interface Pet {
  id: number;
  name: string;
  type: string;
}

const addOns = [
  { id: 'bathing', name: 'Bathing', cost: 5 },
  { id: 'grooming', name: 'Grooming', cost: 10 },
];

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [addOnsPerDay, setAddOnsPerDay] = useState<Record<string, string[]>>(
    {}
  );
  const [selectedPetIds, setSelectedPetIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingEventIndex, setEditingEventIndex] = useState<number | null>(
    null
  );

  const router = useRouter();

  // Fetch services and pets from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          console.error('No JWT found. Please log in.');
          return;
        }

        const [servicesResponse, petsResponse] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/pets/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }),
        ]);

        if (!servicesResponse.ok) {
          console.error('Failed to fetch services:', await servicesResponse.json());
          return;
        }

        if (!petsResponse.ok) {
          console.error('Failed to fetch pets:', await petsResponse.json());
          return;
        }

        const [servicesData, petsData] = await Promise.all([
          servicesResponse.json(),
          petsResponse.json(),
        ]);

        setServices(servicesData);
        setPets(petsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const selectedDate = moment(slotInfo.start).startOf('day').toDate();
    setSelectedSlot({
      start: selectedDate,
      end: selectedDate,
      slots: [selectedDate],
      action: 'click',
    });
    setSelectedService(null);
    setAddOnsPerDay({});
    setSelectedPetIds([]);
    setEditingEventIndex(null);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event: CalendarEvent, index: number) => {
    setSelectedSlot({
      start: event.start,
      end: event.end,
      slots: [event.start],
      action: 'click',
    });
    setSelectedService(event.service || null);
    setAddOnsPerDay(event.addOns || {});
    setSelectedPetIds(event.petIds || []);
    setEditingEventIndex(index);
    setIsModalOpen(true);
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleAddOnChange = (addOnId: string) => {
    setAddOnsPerDay((prev) => {
      const currentAddOns = prev[selectedSlot?.start.toISOString() || ''] || [];
      return {
        ...prev,
        [selectedSlot?.start.toISOString() || '']: currentAddOns.includes(addOnId)
          ? currentAddOns.filter((id) => id !== addOnId)
          : [...currentAddOns, addOnId],
      };
    });
  };

  const handlePetSelection = (petId: number) => {
    setSelectedPetIds((prev) =>
      prev.includes(petId)
        ? prev.filter((id) => id !== petId)
        : [...prev, petId]
    );
  };

  const calculateTotal = () => {
    let total = 0;

    events.forEach((event) => {
      const service = services.find((s) => s.id === event.service);
      if (!service) return;

      const days =
        Math.ceil(
          (new Date(event.end).getTime() - new Date(event.start).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;

      const addOnCosts = Object.entries(event.addOns || {}).reduce(
        (sum, [, addOnIds]) => {
          return (
            sum +
            addOnIds.reduce((addOnSum, addOnId) => {
              const addOn = addOns.find((a) => a.id === addOnId);
              return addOn ? addOnSum + addOn.cost : addOnSum;
            }, 0)
          );
        },
        0
      );

      total += service.basePricePerDay * days + addOnCosts;
    });

    return total.toFixed(2);
  };

  const handleSaveEvent = () => {
    if (!selectedSlot || !selectedService || selectedPetIds.length === 0) return;

    const updatedEvent: CalendarEvent = {
      title: `Booking (${services.find((s) => s.id === selectedService)?.name})`,
      start: selectedSlot.start,
      end: selectedSlot.end,
      allDay: true,
      service: selectedService,
      petIds: selectedPetIds,
      addOns: {
        [moment(selectedSlot.start).format('YYYY-MM-DD')]:
          addOnsPerDay[moment(selectedSlot.start).format('YYYY-MM-DD')] || [],
      },
    };

    if (editingEventIndex !== null) {
      setEvents((prev) =>
        prev.map((event, index) =>
          index === editingEventIndex ? updatedEvent : event
        )
      );
    } else {
      setEvents((prev) => [...prev, updatedEvent]);
    }

    setIsModalOpen(false);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        Book Your Pet Sitting Dates
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Total: ${calculateTotal()}
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        defaultView="month"
        views={['month']}
        style={{ height: 500, margin: '20px 0' }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) =>
          handleSelectEvent(event as CalendarEvent, events.indexOf(event))
        }
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => {
          const enrichedBookings = events.map((event) => {
            const service = services.find((s) => s.id === event.service);
            const serviceCost = service ? service.basePricePerDay : 0;

            const addOnCost = Object.entries(event.addOns || {}).reduce(
              (sum, [, addOnIds]) =>
                sum +
                addOnIds.reduce((subSum, addOnId) => {
                  const addOn = addOns.find((a) => a.id === addOnId);
                  return addOn ? subSum + addOn.cost : subSum;
                }, 0),
              0
            );

            const totalCost = serviceCost + addOnCost;

            return {
              ...event,
              serviceBasePricePerDay: serviceCost,
              totalCost,
            };
          });

          localStorage.setItem('bookings', JSON.stringify(enrichedBookings));
          router.push('/checkout');
        }}
      >
        Go to Checkout
      </Button>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="service-selection-modal"
        aria-describedby="service-selection-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editingEventIndex !== null
              ? `Edit Booking (${moment(selectedSlot?.start).format(
                  'YYYY-MM-DD'
                )})`
              : `New Booking (${moment(selectedSlot?.start).format(
                  'YYYY-MM-DD'
                )})`}
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {services.map((service) => (
                <FormControlLabel
                  key={service.id}
                  control={
                    <Checkbox
                      checked={selectedService === service.id}
                      onChange={() => handleServiceChange(service.id)}
                    />
                  }
                  label={`${service.name} ($${service.basePricePerDay}/day)`}
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
                      checked={selectedPetIds.includes(pet.id)}
                      onChange={() => handlePetSelection(pet.id)}
                    />
                  }
                  label={`${pet.name} (${pet.type})`}
                />
              ))}
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Add-Ons
              </Typography>
              {addOns.map((addOn) => (
                <FormControlLabel
                  key={addOn.id}
                  control={
                    <Checkbox
                      checked={
                        addOnsPerDay[
                          moment(selectedSlot?.start).format('YYYY-MM-DD') || ''
                        ]?.includes(addOn.id) || false
                      }
                      onChange={() =>
                        handleAddOnChange(addOn.id)
                      }
                    />
                  }
                  label={`${addOn.name} ($${addOn.cost})`}
                />
              ))}
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveEvent}
            sx={{ mt: 2 }}
          >
            Save Booking
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
