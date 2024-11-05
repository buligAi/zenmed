import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import '@mantine/core/styles.css';
import './index.css';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Roboto, sans-serif'
});

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const rootInstance = ReactDOM.createRoot(root);

// Show loading screen while the app initializes
rootInstance.render(
  <MantineProvider theme={theme}>
    <LoadingScreen message="Starting application..." />
  </MantineProvider>
);

// Initialize the app with a slight delay to ensure proper loading screen display
setTimeout(() => {
  rootInstance.render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <MantineProvider theme={theme}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </MantineProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
}, 100);