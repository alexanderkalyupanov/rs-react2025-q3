import { createRoot } from 'react-dom/client';
import './style.css';
import App from './components/App/App.tsx';
import { BrowserRouter } from 'react-router';
import React from 'react';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
