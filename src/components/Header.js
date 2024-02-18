import React from 'react'
import { useTranslation } from 'react-i18next'
import buttonStyles from './css/button.module.css'
import useAuthStatus from '../middleWare/useAuthStatus' // Adjust the path accordingly
import { useLogout } from '../middleWare/useLogout' // Adjust the path accordingly
import { useBuBack } from '../middleWare/useBuBack' // Adjust the path accordingly
import { useLanguageSwitcher } from '../middleWare/useLanguageSwitcher' // Adjust the path accordingly
import { useLocation } from 'react-router-dom'

const Header = () => {
  const { t } = useTranslation()
  const isLoggedIn = useAuthStatus()
  const onLogout = useLogout()
  const onBackToLogin = useBuBack()
  const changeLanguage = useLanguageSwitcher()
  const logo = '/logo192.png'

  const handleSelectChange = (event) => {
    switch (event.target.value) {
      case 'logout':
        onLogout()
        break
      case 'backToLogin':
        onBackToLogin()
        break
      case 'en':
      case 'fi':
        changeLanguage(event.target.value)
        break
      default:
        break
    }
  }
  const location = useLocation()

  return (
    <header style={styles.header}>
      <img src={logo} alt="Logo" style={styles.logo} /> {/* Add this line */}
      <h1 style={styles.title}>{t('headerTitle')}</h1>
      <nav style={styles.navLinks}>
        <select className={buttonStyles.dropdown} onChange={handleSelectChange}>
          <option value="">{t('menu')}</option>
          <option value="en">English</option>
          <option value="fi">Suomi</option>
          {isLoggedIn && location.pathname !== '/home' && (
            <option value="backToLogin">{t('back')}</option>
          )}
          {isLoggedIn && <option value="logout">{t('logout')}</option>}
        </select>
      </nav>
    </header>
  )
}

// ... rest of your code
export default Header

const styles = {
  header: {
    backgroundColor: '#3498db', // Dark blue-gray background
    color: '#ecf0f1', // Light gray text
    border: '2px solid #2c3e50', // Darker border for contrast
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    borderRadius: '8px', // Rounded corners
    margin: '10px', // Centered margin for login box
  },
  title: {
    fontSize: '2em',
    margin: 0,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  navLinks: {
    display: 'flex',
    gap: '20px', // Space between navigation links
    marginLeft: 'auto',
  },
  navLink: {
    color: 'inherit', // Inherits color from the header
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  dropdown: {
    padding: '10px',
    fontSize: '16px',
    color: '#333',
    borderRadius: '5px',
    border: '1px solid #ccc',
    appearance: 'none', // Removes the default appearance
    backgroundColor: '#fff',
  },
  logo: {
    height: '50px', // Adjust as needed
    width: '50px', // Adjust as needed
  },
}
