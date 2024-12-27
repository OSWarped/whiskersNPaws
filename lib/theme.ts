import { createTheme } from '@mui/material/styles';
//import { CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#ffffff', // Set your default background color
    },
    text: {
      primary: '#000000', // Set default text color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          backgroundColor: '#ffffff', // Ensure this matches your desired theme
          color: '#000000',
        },
      },
    },
  },
});

export default theme;
