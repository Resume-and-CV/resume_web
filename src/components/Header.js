import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useAuthStatus from '../middleWare/useAuthStatus' // Adjust the path accordingly
import { useLogout } from '../middleWare/useLogout' // Adjust the path accordingly
import { useBuBack } from '../middleWare/useBuBack' // Adjust the path accordingly
import { useLanguageSwitcher } from '../middleWare/useLanguageSwitcher' // Adjust the path accordingly
import { useLocation } from 'react-router-dom'
import styles from './css/header.module.css'
import dropdawnStyles from './css/dropdown.module.css'

const Header = () => {
  const isLoggedIn = useAuthStatus()
  const onLogout = useLogout()
  const onBackToHome = useBuBack()
  const logo = '/logo192.png'
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en') // default language
  const [dropdownOpen, setDropdownOpen] = useState(false) // add this line to define the dropdownOpen state

  const { changeLanguage } = useLanguageSwitcher(
    currentLanguage,
    setCurrentLanguage,
  )

  const handleSelectChange = (event) => {
    switch (event.target.value) {
      case 'logout':
        onLogout()
        break
      case 'backToLogin':
        onBackToHome()
        break
      case 'en':
      case 'fi':
        if (location.pathname === '/' || location.pathname === '/home') {
          changeLanguage(event.target.value) // update current language
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

  const handleDropdownClick = () => {
    setDropdownOpen((prevState) => {
      console.log('Dropdown state before toggle:', prevState)
      return !prevState
    })
  }

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
          {(location.pathname === '/' || location.pathname === '/home') &&
            currentLanguage !== 'en' && (
              <img
                className={styles.flagIcon}
                src="/images/united-kingdom.png"
                alt="English"
                onClick={() => handleSelectChange({ target: { value: 'en' } })}
              />
            )}
          {(location.pathname === '/' || location.pathname === '/home') &&
            currentLanguage !== 'fi' && (
              <img
                className={styles.flagIcon}
                src="/images/finland.png"
                alt="Finnish"
                onClick={() => handleSelectChange({ target: { value: 'fi' } })}
              />
            )}
          <div className={styles.logoContainer}>
            <img
              src="/images/menu.png"
              alt="Logo"
              className={styles.flagIcon}
              onClick={handleDropdownClick}
            />
            {isLoggedIn && dropdownOpen && (
              <div className={dropdawnStyles.dropdownMenu}>
                {isLoggedIn &&
                  location.pathname !== '/' &&
                  location.pathname !== '/home' && (
                    <img
                      src="/images/home.png"
                      alt="Logo"
                      className={dropdawnStyles.icon}
                      onClick={onBackToHome}
                    />
                  )}
                <img
                  src="/images/logout.png"
                  alt="Logo"
                  className={dropdawnStyles.icon}
                  onClick={onLogout}
                />
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
// ... rest of your code
export default Header
