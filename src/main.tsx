import { createRoot } from 'react-dom/client';
import './style.css';
import App from './components/App/App.tsx';
import { BrowserRouter } from 'react-router';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
