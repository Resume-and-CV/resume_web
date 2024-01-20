// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n'
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
