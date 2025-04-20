'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Service {
  id: number;
  name: string;
  description: string;
  basePricePerDay: number;
}

interface AddOn {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [error, ] = useState<string | null>(null);

  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [editingAddOn, setEditingAddOn] = useState<Partial<AddOn> | null>(null);

  const [newService, setNewService] = useState({ name: '', description: '', basePricePerDay: 0 });
  const [newAddOn, setNewAddOn] = useState({ name: '', description: '', price: 0 });

  useEffect(() => {
    fetchServices();
    fetchAddOns();
  }, []);

  const fetchServices = async () => {
    const res = await fetch('/api/admin/services');
    const data = await res.json();
    setServices(data);
  };

  const fetchAddOns = async () => {
    const res = await fetch('/api/admin/addons');
    const data = await res.json();
    setAddOns(data);
  };

  const handleAddService = async () => {
    const res = await fetch('/api/admin/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    });
    if (res.ok) {
      setNewService({ name: '', description: '', basePricePerDay: 0 });
      fetchServices();
    }
  };

  const handleAddAddOn = async () => {
    const res = await fetch('/api/admin/addons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAddOn),
    });
    if (res.ok) {
      setNewAddOn({ name: '', description: '', price: 0 });
      fetchAddOns();
    }
  };

  const saveEditedService = async () => {
    if (!editingService?.id) return;

    const res = await fetch(`/api/admin/services/${editingService.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingService),
    });

    if (res.ok) {
      setEditingService(null);
      fetchServices();
    }
  };

  const saveEditedAddOn = async () => {
    if (!editingAddOn?.id) return;

    const res = await fetch(`/api/admin/addons/${editingAddOn.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingAddOn),
    });

    if (res.ok) {
      setEditingAddOn(null);
      fetchAddOns();
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-3">
        <button className="btn btn-outline-secondary" onClick={() => router.push('/admin')}>
          ← Back to Admin Panel
        </button>
      </div>

      <h2 className="mb-4 text-center">Manage Services & Add-Ons</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {/* Services Section */}
        <div className="col-md-6">
          <h4>Services</h4>
          <ul className="list-group mb-3">
            {services.map((s) => (
              <li key={s.id} className="list-group-item">
                {editingService?.id === s.id ? (
                  <>
                    <input
                      className="form-control mb-2"
                      value={editingService.name || ''}
                      onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    />
                    <textarea
                      className="form-control mb-2"
                      value={editingService.description || ''}
                      onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      value={editingService.basePricePerDay || 0}
                      onChange={(e) => setEditingService({ ...editingService, basePricePerDay: parseFloat(e.target.value) })}
                    />
                    <button className="btn btn-success btn-sm me-2" onClick={saveEditedService}>
                      Save
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingService(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{s.name}</strong><br />
                      <small>{s.description}</small><br />
                      <span className="text-muted">${s.basePricePerDay.toFixed(2)}/day</span>
                    </div>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => setEditingService(s)}>
                      Edit
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <h5 className="mt-4">Add New Service</h5>
          <input
            className="form-control mb-2"
            placeholder="Service name"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Base price per day"
            value={newService.basePricePerDay}
            onChange={(e) => setNewService({ ...newService, basePricePerDay: parseFloat(e.target.value) })}
          />
          <button className="btn btn-primary" onClick={handleAddService}>
            Add Service
          </button>
        </div>

        {/* AddOns Section */}
        <div className="col-md-6">
          <h4>Add-Ons</h4>
          <ul className="list-group mb-3">
            {addOns.map((a) => (
              <li key={a.id} className="list-group-item">
                {editingAddOn?.id === a.id ? (
                  <>
                    <input
                      className="form-control mb-2"
                      value={editingAddOn.name || ''}
                      onChange={(e) => setEditingAddOn({ ...editingAddOn, name: e.target.value })}
                    />
                    <textarea
                      className="form-control mb-2"
                      value={editingAddOn.description || ''}
                      onChange={(e) => setEditingAddOn({ ...editingAddOn, description: e.target.value })}
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      value={editingAddOn.price || 0}
                      onChange={(e) => setEditingAddOn({ ...editingAddOn, price: parseFloat(e.target.value) })}
                    />
                    <button className="btn btn-success btn-sm me-2" onClick={saveEditedAddOn}>
                      Save
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingAddOn(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{a.name}</strong><br />
                      <small>{a.description}</small><br />
                      <span className="text-muted">${a.price.toFixed(2)}</span>
                    </div>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => setEditingAddOn(a)}>
                      Edit
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <h5 className="mt-4">Add New Add-On</h5>
          <input
            className="form-control mb-2"
            placeholder="Add-On name"
            value={newAddOn.name}
            onChange={(e) => setNewAddOn({ ...newAddOn, name: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={newAddOn.description}
            onChange={(e) => setNewAddOn({ ...newAddOn, description: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={newAddOn.price}
            onChange={(e) => setNewAddOn({ ...newAddOn, price: parseFloat(e.target.value) })}
          />
          <button className="btn btn-primary" onClick={handleAddAddOn}>
            Add Add-On
          </button>
        </div>
      </div>
    </div>
  );
}
