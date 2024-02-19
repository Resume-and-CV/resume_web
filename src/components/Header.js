import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import buttonStyles from './css/button.module.css'
import useAuthStatus from '../middleWare/useAuthStatus' // Adjust the path accordingly
import { useLogout } from '../middleWare/useLogout' // Adjust the path accordingly
import { useBuBack } from '../middleWare/useBuBack' // Adjust the path accordingly
import { useLanguageSwitcher } from '../middleWare/useLanguageSwitcher' // Adjust the path accordingly
import { useLocation } from 'react-router-dom'
import styles from './css/header.module.css'

const Header = () => {
  const { t } = useTranslation()
  const isLoggedIn = useAuthStatus()
  const onLogout = useLogout()
  const onBackToLogin = useBuBack()
  const changeLanguage = useLanguageSwitcher()
  const logo = '/logo192.png'
  const location = useLocation()

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
        if (location.pathname === '/' || location.pathname === '/home') {
          changeLanguage(event.target.value)
        }
        break
      default:
        break
    }
  }

  const [title, setTitle] = useState(t('headerTitle'))

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setTitle(t('headerTitleShort')) // Use a shorter title for small screens
      } else {
        setTitle(t('headerTitle')) // Use the full title for large screens
      }
    }

    window.addEventListener('resize', handleResize)

    // Call the function once to set the initial title
    handleResize()

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize)
  }, [t])

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.navLinksContainer}>
        <nav className={styles.navLinks}>
          <select
            className={buttonStyles.dropdown}
            onChange={handleSelectChange}
          >
            <option value="">{t('menu')}</option>
            {location.pathname === '/' || location.pathname === '/home' ? (
              <>
                <option value="en">English</option>
                <option value="fi">Suomi</option>
              </>
            ) : null}
            {isLoggedIn && location.pathname !== '/home' && (
              <option value="backToLogin">{t('back')}</option>
            )}
            {isLoggedIn && <option value="logout">{t('logout')}</option>}
          </select>
        </nav>
      </div>
    </header>
  )
}
// ... rest of your code
export default Header
