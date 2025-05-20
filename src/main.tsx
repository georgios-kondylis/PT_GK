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


//  npm i axios
//  npm i framer motion