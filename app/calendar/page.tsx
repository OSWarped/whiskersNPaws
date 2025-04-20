'use client';

import React, { useEffect, useState } from 'react';
import '@fullcalendar/common/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { useRouter } from 'next/navigation';

interface Booking {
  startDate: string;
  service: string | null;
  addOns: string[];
  pets: Pet[];
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
  breed?: string;
  specialNeeds?: string;
}

interface Detail {
  serviceId?: number;
  addOnId?: number;
  price: number;
  quantity: number;
}

interface Reservation {
  startDate: string;
  details: Detail[];
  pets: Pet[];
  totalCost: number;
}

export default function CalendarPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedPets, setSelectedPets] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const headers = { Authorization: `Bearer ${token}` };

        const [servicesRes, addOnsRes, petsRes, resvRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/addons'),
          fetch('/api/pets/me', { headers }),
          fetch('/api/reservations', { headers }),
        ]);

        const [servicesData, addOnsData, petsData, reservationsData] = await Promise.all([
          servicesRes.json(),
          addOnsRes.json(),
          petsRes.json(),
          resvRes.json(),
        ]);

        setServices(servicesData);
        setAddOns(addOnsData);
        setPets(petsData);

        const formatted: Booking[] = (reservationsData as Reservation[]).map((res): Booking => ({
          startDate: res.startDate,
          service: res.details.find((d) => d.serviceId !== undefined)?.serviceId?.toString() ?? null,
          addOns: res.details
            .filter((d) => d.addOnId !== undefined)
            .map((d) => d.addOnId!.toString()),
          pets: res.pets,
          totalCost: res.totalCost || 0,
        }));

        setConfirmedBookings(formatted);
        setBookings(formatted);
      } catch (err) {
        console.error(err);
        setError('Failed to load resources.');
      }
    };

    fetchAll();
  }, []);

  const handleDateClick = (arg: DateClickArg) => {
    const date = arg.date;
    setSelectedDate(date);

    const existing = bookings.find(
      (b) => new Date(b.startDate).toDateString() === date.toDateString()
    );

    if (existing) {
      setSelectedService(existing.service);
      setSelectedAddOns(existing.addOns);
      setSelectedPets(existing.pets.map((p) => p.id));
    } else {
      setSelectedService(null);
      setSelectedAddOns([]);
      setSelectedPets([]);
    }

    setError(null);
    setShowModal(true);
  };

  const handleAddBooking = () => {
    if (!selectedDate || !selectedService || selectedPets.length === 0) {
      setError('Please select a service and at least one pet.');
      return;
    }

    const service = services.find((s) => s.id === selectedService);
    const addOnTotal = selectedAddOns.reduce((sum, id) => {
      const a = addOns.find((a) => a.id === id);
      return sum + (a?.price || 0);
    }, 0);

    const newBooking: Booking = {
      startDate: selectedDate.toISOString(),
      service: selectedService,
      addOns: selectedAddOns,
      pets: pets.filter((p) => selectedPets.includes(p.id)),
      totalCost: (service?.basePricePerDay || 0) + addOnTotal,
    };

    const existingIndex = bookings.findIndex(
      (b) => new Date(b.startDate).toDateString() === selectedDate.toDateString()
    );

    if (existingIndex >= 0) {
      const updated = [...bookings];
      updated[existingIndex] = newBooking;
      setBookings(updated);
    } else {
      setBookings((prev) => [...prev, newBooking]);
    }

    setShowModal(false);
  };

  const handleCheckout = () => {
    const newBookings = bookings.filter(
      (b) =>
        !confirmedBookings.some(
          (c) =>
            c.startDate === b.startDate &&
            c.service === b.service &&
            JSON.stringify(c.addOns) === JSON.stringify(b.addOns) &&
            JSON.stringify(c.pets) === JSON.stringify(b.pets)
        )
    );

    if (newBookings.length === 0) {
      setError('No new bookings to checkout.');
      return;
    }

    localStorage.setItem('bookings', JSON.stringify(newBookings));
    router.push('/checkout');
  };

  const isPastDate = selectedDate ? selectedDate < new Date() : false;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Book Your Pet Sitting Dates</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <FullCalendar
        plugins={[dayGridPlugin, bootstrap5Plugin, interactionPlugin]}
        themeSystem="bootstrap5"
        initialView="dayGridMonth"
        events={bookings.map((b) => ({
          title: `${b.pets.map((p) => p.name).join(', ')} - $${b.totalCost.toFixed(2)}`,
          start: b.startDate,
          backgroundColor: '#0d6efd',
          borderColor: '#0d6efd',
        }))}
        dateClick={handleDateClick}
      />

      <div className="text-center mt-4">
        <button
          className="btn btn-success"
          onClick={handleCheckout}
          disabled={
            bookings.filter(
              (b) =>
                !confirmedBookings.some(
                  (c) =>
                    c.startDate === b.startDate &&
                    c.service === b.service &&
                    JSON.stringify(c.addOns) === JSON.stringify(b.addOns) &&
                    JSON.stringify(c.pets) === JSON.stringify(b.pets)
                )
            ).length === 0
          }
        >
          {`Checkout (${bookings.filter(
            (b) =>
              !confirmedBookings.some(
                (c) =>
                  c.startDate === b.startDate &&
                  c.service === b.service &&
                  JSON.stringify(c.addOns) === JSON.stringify(b.addOns) &&
                  JSON.stringify(c.pets) === JSON.stringify(b.pets)
              )
          ).length} new)`}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reservation for {selectedDate?.toDateString()}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <h6 className="mb-2">Service</h6>
                {services.map((s) => (
                  <div className="form-check" key={s.id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="service"
                      id={`service-${s.id}`}
                      checked={selectedService === s.id}
                      disabled={isPastDate}
                      onChange={() => setSelectedService(s.id)}
                    />
                    <label className="form-check-label" htmlFor={`service-${s.id}`}>
                      {s.name} (${s.basePricePerDay.toFixed(2)})
                    </label>
                  </div>
                ))}

                <h6 className="mt-4">Add-Ons</h6>
                {addOns.map((a) => (
                  <div className="form-check" key={a.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`addon-${a.id}`}
                      checked={selectedAddOns.includes(a.id)}
                      disabled={isPastDate}
                      onChange={() =>
                        setSelectedAddOns((prev) =>
                          prev.includes(a.id) ? prev.filter((id) => id !== a.id) : [...prev, a.id]
                        )
                      }
                    />
                    <label className="form-check-label" htmlFor={`addon-${a.id}`}>
                      {a.name} (${a.price.toFixed(2)})
                    </label>
                  </div>
                ))}

                <h6 className="mt-4">Select Pets</h6>
                {pets.map((p) => (
                  <div className="form-check" key={p.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`pet-${p.id}`}
                      checked={selectedPets.includes(p.id)}
                      disabled={isPastDate}
                      onChange={() =>
                        setSelectedPets((prev) =>
                          prev.includes(p.id) ? prev.filter((id) => id !== p.id) : [...prev, p.id]
                        )
                      }
                    />
                    <label className="form-check-label" htmlFor={`pet-${p.id}`}>
                      {p.name} ({p.type})
                    </label>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                {!isPastDate && (
                  <button className="btn btn-primary" onClick={handleAddBooking}>
                    Save Reservation
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
