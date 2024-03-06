// Code for PrivateRoute2.js

import React from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuthStatus from './useAuthStatus'

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuthStatus()

  if (loading) {
    return null
  }

  if (!isLoggedIn) {
    toast.warn('You must log in first!')
    return <Navigate to="/" replace />
  }

  return children
}

export default PrivateRoute
