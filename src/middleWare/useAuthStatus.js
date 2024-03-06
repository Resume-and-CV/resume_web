// useAuthStatus.js
import { useState, useEffect } from 'react'
import axios from 'axios' // or use fetch if you prefer

// Custom hook for checking login status
function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token && typeof token === 'string') {
      // Make a request to your server to verify the token
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/verify-token`, {
          // replace '/verify-token' with your actual endpoint
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // If the server responds with a success status, the token is valid
          setIsLoggedIn(true)
          console.log('User is logged in')
        })
        .catch((error) => {
          // If the server responds with an error status, the token is invalid or expired
          setIsLoggedIn(false)
          localStorage.removeItem('token') // remove the expired token from local storage
        })
        .finally(() => {
          // Once the request completes, set loading to false
          setLoading(false)
        })
    } else {
      setIsLoggedIn(false)
      setLoading(false)
    }
  }, [])

  return { isLoggedIn, loading }
}

export default useAuthStatus
