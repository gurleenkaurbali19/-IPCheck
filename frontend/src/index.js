// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // keep or delete this based on whether index.css exists
import UploadPage from './pages/uploadpage.jsx'; // adjust path if different


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UploadPage />);

