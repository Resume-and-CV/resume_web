import { Navigate } from 'react-router-dom'
import useAuthStatus from './useAuthStatus'

const AdminRoute = ({ children }) => {
  const { role, loading } = useAuthStatus() // Get loading state from useAuthStatus
  console.log('role', role)
  if (loading) {
    return <div>Loading...</div> // Or your loading component
  }

  return role === 'admin' ? children : <Navigate to="/home" />
}

export default AdminRoute
