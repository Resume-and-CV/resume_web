import { useState, useEffect } from 'react'

// Custom hook for checking login status
function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token) // Convert to boolean: true if token exists, false otherwise
  }, [])

  return isLoggedIn
}

export default useAuthStatus
