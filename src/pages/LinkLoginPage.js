import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const LinkLoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [statusMessage, setStatusMessage] = useState(
    'Processing your request...',
  )

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const token = query.get('token')

    if (token) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/login/login-with-link`, {
          token,
        })
        .then((response) => {
          // Handle successful validation
          localStorage.setItem('token', response.data.token)

          //setLoginInfo(response.data); // Assuming the server sends back login information
          setStatusMessage(
            `Login succesfull! Redirecting to my resume in 5s...`,
          )
          // Set a timeout to delay redirection so the user can read the message
          setTimeout(() => navigate('/home'), 5000)
        })
        .catch((error) => {
          // Handle validation failure
          setStatusMessage(
            'Failed to login. Invalid or expired token. Redirecting to login page in 5s...',
          )
          setTimeout(() => navigate('/'), 5000) // Redirect after showing the message
        })
    } else {
      setStatusMessage('No token provided. Redirecting to login page in5s...')
      setTimeout(() => navigate('/'), 5000)
    }
  }, [navigate, location.search])

  return (
    <div>
      <h2>Login via Link</h2>
      <p>{statusMessage}</p>
    </div>
  )
}

export default LinkLoginPage
