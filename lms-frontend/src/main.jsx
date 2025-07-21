import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import { AuthProvider } from './AuthContext';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#388e3c', // MUI green[700]
      light: '#66bb6a',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    secondary: {
      main: '#43a047', // A lighter green
      light: '#76d275',
      dark: '#00701a',
      contrastText: '#fff',
    },
    background: {
      default: '#f1f8e9', // light green background
      paper: '#e8f5e9',
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
