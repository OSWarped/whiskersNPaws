'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          setIsLoggedIn(false);
          setIsAdmin(false);
          return;
        }

        const response = await fetch('/api/auth/me', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const user = await response.json();
          setIsLoggedIn(true);
          setIsAdmin(user.isAdmin === true);
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    checkAuthStatus();
    window.addEventListener('authChanged', checkAuthStatus);
    return () => window.removeEventListener('authChanged', checkAuthStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.dispatchEvent(new Event('authChanged'));
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">WhiskersNPaws</Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contact">Contact Us</Link>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/dashboard">Dashboard</Link>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link" href="/admin">Admin</Link>
                  </li>
                )}
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-white" onClick={handleLogout}>
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">Log In</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light ms-2" href="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
