'use client';

import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" gutterBottom>
          Loving Care for Your Furry Friends
        </Typography>
        <Typography variant="h6" gutterBottom>
          Trusted pet sitting made easy: book visits, housing, or in-home care now!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          href="/login"
        >
          Log In
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          href="/register"
        >
          Register
        </Button>
      </Box>

      {/* Services Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { title: 'Home Visits', description: 'We feed, water, and clean for your pets in the comfort of your home.', price: '$25/day' },
            { title: 'Housing', description: 'A safe and comfortable space for your pet while you\u2019re away.', price: '$40/day' },
            { title: 'In-Home Care', description: 'We stay with your pet at your home and provide full-time care.', price: '$75/day' },
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {service.description}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    {service.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { step: '1', description: 'Select Your Dates' },
            { step: '2', description: 'Choose Your Service' },
            { step: '3', description: 'Relax While We Care for Your Pets' },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="secondary">
                  {item.step}
                </Typography>
                <Typography variant="body1">{item.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 2, bgcolor: '#333', color: 'white' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} WhiskersNPaws. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
