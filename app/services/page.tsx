'use client';

import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

export default function ServicesPage() {
  const services = [
    {
      title: 'Home Visits',
      description: 'We feed, water, and clean for your pets in the comfort of your home.',
      price: '$25/day',
      image: '/images/visit-home.webp', // Add appropriate images or placeholders
    },
    {
      title: 'Housing',
      description: 'A safe and comfortable space for your pet while you’re away.',
      price: '$40/day',
      image: '/images/pet-housing.webp',
    },
    {
      title: 'In-Home Care',
      description: 'We stay with your pet at your home and provide full-time care.',
      price: '$75/day',
      image: '/images/in-home.webp',
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Header Section */}
      <Typography variant="h3" gutterBottom align="center">
        Our Services
      </Typography>

      {/* Services Grid */}
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={service.image}
                alt={service.title}
              />
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
  );
}
