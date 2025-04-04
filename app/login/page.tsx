'use client';
import Cookies from 'js-cookie'; // Ensure you have this installed
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    setLoading(true);
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Login failed.');
        setLoading(false);
        return;
      }
  
      const data = await response.json();
      console.log('Login API Response:', data);
  
      if (data.token) {
        // Store the token in a cookie
        Cookies.set('authToken', data.token, { expires: 1 }); // Expires in 1 day
  
        // Store the token in localStorage as a fallback
        localStorage.setItem('jwt', data.token);
  
        console.log('Token saved to cookie and localStorage:', data.token);

        // After login/logout
        window.dispatchEvent(new Event('authChanged'));     
  
        // Redirect to the dashboard
        router.push('/dashboard');
      } else {
        setError('Login response missing token.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
      <Box sx={{ width: 300 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Log In'}
        </Button>
      </Box>
    </Box>
  );
}
