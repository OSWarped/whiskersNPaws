'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Something went wrong.');
        return;
      }

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom align="center">
        Contact Us
      </Typography>

      {/* Contact Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1">Address: 123 Main St, Petville, USA</Typography>
        <Typography variant="body1">Phone: (555) 123-4567</Typography>
        <Typography variant="body1">Email: support@whiskersnpaws.com</Typography>
      </Box>

      {/* Feedback Messages */}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Message sent successfully!</Alert>}

      {/* Contact Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          name="message"
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
