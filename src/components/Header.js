import React from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const Header = ({ onLogout }) => {
  const { t } = useTranslation()
  //console.log(t)

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>{t('headerTitle')}</h1>
      <nav style={styles.navLinks}>
        <button style={buttenStyles.button} onClick={onLogout}>
          {t('logout')}
        </button>
        <LanguageSwitcher />
        {/* More navigation links */}
      </nav>
    </header>
  )
}

export default Header

const styles = {
  header: {
    backgroundColor: '#3498db', // Dark blue-gray background
    color: '#ecf0f1', // Light gray text
    border: '2px solid #2c3e50', // Darker border for contrast
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    borderRadius: '8px', // Rounded corners
    margin: '10px', // Centered margin for login box
  },
  title: {
    fontSize: '2em',
    margin: 0,
  },
  navLinks: {
    display: 'flex',
    gap: '20px', // Space between navigation links
  },
  navLink: {
    color: 'inherit', // Inherits color from the header
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}

const buttenStyles = {
  button: {
    margin: '1px',
    padding: '5px',
    backgroundColor: '#3498db', // Blue button
    color: 'white',
    border: 'none',
    borderRadius: '4px', // Rounded corners for button
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Shadow for button
  },
}
