import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import LoginBox from './LoginBox'
import Header from '../header/Header'
import ContactForm from './ContactForm'

import mainboxStyles from '../css/mainBoxStyles.module.css'
import buttonStyles from '../css/button.module.css'
const LoginPage = () => {
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false)
  const [isLoginBoxVisible, setIsLoginBoxVisible] = useState(true)
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleLogin = async (username, password) => {
    //console.log(process.env.REACT_APP_SERVER_URL);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          username,
          password,
        },
      )

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        navigate('/home')
        console.log('Authentication successful user: ', username)
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Set the error message from the server response
        setErrorMessage(error.response.data.message)
      } else {
        console.error('Login error:', error)
        setErrorMessage('An error occurred while trying to log in.')
      }
    }
  }

  const toggleVisibility = () => {
    setIsEmailFormVisible(!isEmailFormVisible)
    setIsLoginBoxVisible(!isLoginBoxVisible)
  }

  const handleAccountRequest = (from, subject, text) => {
    // Clear messages at the start of a new request
    setSuccessMessage('')
    setErrorMessage('')
    setIsLoading(true)

    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/email/send-request`
    axios
      .post(apiUrl, { from, subject, text })
      .then((response) => {
        setIsLoading(false)
        if (response.status === 200 && response.data.status === 'success') {
          setSuccessMessage(response.data.message)
        } else {
          // Consider handling non-success status codes that are not errors (e.g., 4xx codes from your server)
          setErrorMessage('Received non-success response from the server.')
        }
      })
      .catch((error) => {
        setIsLoading(false)
        setErrorMessage('An error occurred while trying to send the email.')
      })
  }
  return (
    <div>
      <Header />
      <div className={mainboxStyles.mainBox} style={{ alignItems: 'center' }}>
        {isLoginBoxVisible && (
          <LoginBox onLogin={handleLogin} errorMessage={errorMessage} />
        )}
        {isEmailFormVisible && (
          <ContactForm
            isVisible={isEmailFormVisible}
            requestErrorMessage={errorMessage}
            requestSuccessMessage={successMessage}
            isLoading={isLoading}
            onAccountRequest={handleAccountRequest}
            onSubmit={(formData) => {
              console.log(formData) // Form submission logic...
            }}
          />
        )}
        {/* This section is always visible, provides a way to toggle between the login form and contact form */}
        <div style={{ textAlign: 'center', maxWidth: '700px' }}>
          {!isEmailFormVisible ? (
            <>
              <p>{t('Contact here text')}</p>

              {/* Vhen contact form is working, apply this */}
              <button
                onClick={toggleVisibility}
                className={buttonStyles.button2}
              >
                {t('contactForm')}
              </button>
            </>
          ) : (
            <button onClick={toggleVisibility} className={buttonStyles.button2}>
              {t('back')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
