import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

try {
  root.render(
    process.env.NODE_ENV === 'production' ? (
      <App />
    ) : (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  );
} catch (error) {
  console.error('Error rendering the app:', error);
}