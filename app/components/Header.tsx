'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          setIsLoggedIn(false);
          return;
        }
  
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });
  
        setIsLoggedIn(response.ok);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      }
    };
  
    checkAuthStatus();
  
    // Listen for custom login/logout events
    const handleAuthChange = () => checkAuthStatus();
    window.addEventListener('authChanged', handleAuthChange);
  
    return () => window.removeEventListener('authChanged', handleAuthChange);
  }, []);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Remove JWT from localStorage
    setIsLoggedIn(false); // Immediately update state
    // After login/logout
    window.dispatchEvent(new Event('authChanged'));
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#1976d2' }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          WhiskersNPaws
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/services">Services</Button>
          <Button color="inherit" href="/contact">Contact Us</Button>
          {isLoggedIn ? (
            <>
              <Button color="inherit" href="/dashboard">Dashboard</Button>
              <Button color="inherit" onClick={handleLogout}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" href="/login">Log In</Button>
              <Button variant="outlined" color="inherit" href="/register" sx={{ ml: 1 }}>
                Register
              </Button>
            </>
          )}
        </Box>

        {/* Hamburger Menu for Mobile */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer for Mobile Menu */}
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItemButton component="a" href="/">
                <ListItemText primary="Home" />
              </ListItemButton>
              <ListItemButton component="a" href="/services">
                <ListItemText primary="Services" />
              </ListItemButton>
              <ListItemButton component="a" href="/contact">
                <ListItemText primary="Contact Us" />
              </ListItemButton>
              {isLoggedIn ? (
                <>
                  <ListItemButton component="a" href="/dashboard">
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText primary="Log Out" />
                  </ListItemButton>
                </>
              ) : (
                <>
                  <ListItemButton component="a" href="/login">
                    <ListItemText primary="Log In" />
                  </ListItemButton>
                  <ListItemButton component="a" href="/register">
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
