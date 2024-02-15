import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/homePage/homePage'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './middleWare/PrivateRoute2' // Adjust the path as necessary
import LinkLoginPage from './pages/LinkLoginPage'

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/linkloginpage" element={<LinkLoginPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
