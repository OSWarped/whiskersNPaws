'use client';

import React, { ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createEmotionCache from '@/lib/createEmotionCache';
import theme from '@/lib/theme';
import Header from './components/Header';
import './globals.css';
// app/layout.tsx or pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Create a client-side emotion cache
const clientSideEmotionCache = createEmotionCache();

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        {/* Preload fonts */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        {/* Ensure Emotion styles are inserted */}
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body>
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <main>{children}</main>
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
