import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { GlobalPropsProvider } from './components/GlobalPropsProvider';

const container = document.getElementById('root')!;

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalPropsProvider>
         <App />
      </GlobalPropsProvider>
    </BrowserRouter>
  </StrictMode>
);







// ✅ Create OAuth 2.0 Client ID
// Go to the left menu in Google Cloud Console:

// Click on “Credentials” under APIs & Services.

// At the top, click the “+ CREATE CREDENTIALS” button.

// Choose “OAuth client ID”

// For Application type, choose Web application

// Fill in:

// Name: e.g. PTGK App Google Login

// Creation date
// 5 June 2025 at 13:37:00 GMT+2
// Status
// Enabled