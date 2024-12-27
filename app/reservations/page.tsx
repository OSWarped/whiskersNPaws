'use client';

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Calendar from 'react-calendar'; // Install react-calendar
import 'react-calendar/dist/Calendar.css';

export default function ReservationPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleReserve = () => {
    console.log('Selected Dates:', selectedDates);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create a Reservation
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Select Dates:
        </Typography>
        <Calendar
          selectRange
          onChange={(dates) => setSelectedDates(dates as Date[])}
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleReserve}
        >
          Reserve Now
        </Button>
      </Box>
    </Box>
  );
}
