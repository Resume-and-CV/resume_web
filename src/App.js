import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import HomePage from './components/HomePage/homePage'
import LoginPage from './components/LoginPage/LoginPage'
import PrivateRoute from './middleWare/PrivateRoute2' // Adjust the path as necessary
import LinkLoginPage from './components/LinkLoginPage/LinkLoginPage'
import SchoolGradesPage from './components/SchoolGradesPage/schoolGradesPage'
import AdminRoute from './middleWare/AdminRoute' // Adjust the path as necessary
import AdminMenu from './components/AdminMenu/AdminMenu'

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
        <Route
          path="/schoolGradesPage"
          element={
            <PrivateRoute>
              <SchoolGradesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-menu"
          element={
            <AdminRoute>
              <AdminMenu />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
