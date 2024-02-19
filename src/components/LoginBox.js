import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import buttonStyles from './css/button.module.css'
import styles from './css/loginBox.module.css'

const LoginBox = ({ onLogin, errorMessage, isVisible }) => {
  const { t } = useTranslation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (isVisible) return null // Don't render anything if not visible

  return (
    <div className={styles.loginBox}>
      <h2 className={styles.heading}>{t('logIn')}</h2>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}{' '}
      {/* Display error message */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onLogin(username, password)
        }}
      >
        <div>
          <label htmlFor="username">{t('userName')}</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">{t('password')}</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className={buttonStyles.button}
            style={{ width: '50%' }} // Adjust as needed
            type="submit"
          >
            {t('logIn')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginBox
