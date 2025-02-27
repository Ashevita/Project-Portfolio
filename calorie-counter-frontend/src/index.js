// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';  // Importation de 'react-dom/client' pour React 18
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Utilisation de createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
