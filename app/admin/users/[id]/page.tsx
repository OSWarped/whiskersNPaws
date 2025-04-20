'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  CircularProgress,
} from '@mui/material';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  isAdmin: boolean;
  isActive: boolean;
}

export default function AdminUserDetailPage() {
  const params = useParams();
  const userId = params?.id;
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) return;

      const res = await fetch(`/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        console.error('Failed to fetch user');
      }
      setLoading(false);
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleToggleAdmin = async () => {
    if (!user) return;
    setSaving(true);

    const token = localStorage.getItem('jwt');
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isAdmin: !user.isAdmin }),
    });

    if (res.ok) {
      const updated = await res.json();
      setUser(updated);
    }
    setSaving(false);
  };

  const handleToggleActive = async () => {
    if (!user) return;
    setSaving(true);

    const token = localStorage.getItem('jwt');
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isActive: !user.isActive }),
    });

    if (res.ok) {
      const updated = await res.json();
      setUser(updated);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>User not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Details
      </Typography>

      <TextField label="First Name" value={user.firstName} fullWidth margin="normal" disabled />
      <TextField label="Last Name" value={user.lastName} fullWidth margin="normal" disabled />
      <TextField label="Email" value={user.email} fullWidth margin="normal" disabled />
      <TextField label="Phone" value={user.phone ?? ''} fullWidth margin="normal" disabled />

      <FormControlLabel
        control={<Switch checked={user.isAdmin} onChange={handleToggleAdmin} disabled={saving} />}
        label="Is Admin"
        sx={{ mt: 2 }}
      />

      <FormControlLabel
        control={<Switch checked={user.isActive} onChange={handleToggleActive} disabled={saving} />}
        label="Active Account"
        sx={{ mt: 2 }}
      />

      <Button onClick={() => router.push('/admin/users')} sx={{ mt: 3 }} variant="outlined">
        Back to Users
      </Button>
    </Box>
  );
}
