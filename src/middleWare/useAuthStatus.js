// useAuthStatus.js
import { useState, useEffect } from 'react'
import axios from 'axios' // or use fetch if you prefer
import { jwtDecode } from 'jwt-decode' // Corrected import

// Custom hook for checking login status and role
function useAuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState(null) // Add state for role
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Declared function as async
      const token = localStorage.getItem('token')

      if (token && typeof token === 'string') {
        // Decode the token and extract the type field
        const decodedToken = jwtDecode(token) // Corrected usage
        setRole(decodedToken.type) // Set the role
        // Make a request to your server to verify the token
        try {
          // Await the axios request
          await axios.get(`${process.env.REACT_APP_SERVER_URL}/verify-token`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          setIsLoggedIn(true)
          console.log('User is logged in')
        } catch (error) {
          // Added catch block to handle errors
          if (error.response && error.response.status === 401) {
            // Unauthorized (invalid/expired token)
            setIsLoggedIn(false)
            localStorage.removeItem('token')
          } else {
            // Handle other errors
            console.error('Error verifying token:', error)
          }
        } finally {
          // Finally block will execute after try or catch
          setLoading(false)
        }
      } else {
        setIsLoggedIn(false)
        setLoading(false)
      }
    }

    checkAuthStatus() // Call the async function
  }, [])

  return { isLoggedIn, role, loading } // Return role
}

export default useAuthStatus
