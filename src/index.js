import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
    <AuthProvider>
      <App />
      <Home />
    </AuthProvider>
  </React.StrictMode>
);
