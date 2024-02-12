// EmailForm.js
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function EmailForm({
  onAccountRequest,
  isVisible,
  requestErrorMessage,
  requestSuccessMessage,
  isLoading,
}) {
  const { t } = useTranslation()
  const [from, setFrom] = useState('')
  const [subject, setSubject] = useState('')
  const [text, setText] = useState('')
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    // Clear form fields if there's a new success message
    if (requestSuccessMessage) {
      setFrom('')
      setSubject('')
      setText('')
      setValidationError('') // Also reset any validation errors
    }
  }, [requestSuccessMessage])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!from || !subject || !text) {
      setValidationError('All fields are required.')
      return
    }
    onAccountRequest(from, subject, text)
  }

  if (!isVisible) return null

  return (
    <div style={emailFormStyles.formBox}>
      <h2 style={emailFormStyles.formHeading}>{t('contactForm')}</h2>

      {validationError && (
        <div style={emailFormStyles.formError}>{validationError}</div>
      )}
      {requestErrorMessage && (
        <div style={emailFormStyles.formError}>{requestErrorMessage}</div>
      )}
      {requestSuccessMessage && (
        <div style={{ ...emailFormStyles.formError, color: 'green' }}>
          {requestSuccessMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          style={emailFormStyles.formInput}
          placeholder={t('yourEmail')}
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required // HTML5 form validation for email input
        />
        <input
          type="text"
          style={emailFormStyles.formInput}
          placeholder={t('subject')}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required // HTML5 form validation for subject input
        />

        <textarea
          style={emailFormStyles.formInput}
          placeholder={t('message')}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required // HTML5 form validation for text area
        />
        <button
          type="submit"
          style={emailFormStyles.formButton}
          disabled={isLoading}
        >
          {isLoading ? t('sending') : t('accountRequest')}
        </button>
      </form>
    </div>
  )
}

export default EmailForm

// Correctly defined styles object
const emailFormStyles = {
  formBox: {
    border: '2px solid #2c3e50',
    padding: '20px',
    backgroundColor: '#ffffff',
    color: '#2c3e50',
    margin: '20px auto',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  formHeading: {
    color: '#3498db',
    marginBottom: '15px',
    textAlign: 'center',
  },
  formInput: {
    width: 'calc(100% - 20px)',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  formButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  formButtonHover: {
    backgroundColor: '#2980b9',
  },
  formError: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
}
