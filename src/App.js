// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Use 'element' instead of 'component' for rendering components */}
        <Route path="/" element={<HomePage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
