// useLanguageSwitcher.js
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const useLanguageSwitcher = (initialLanguage, onLanguageChange) => {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(
    initialLanguage || 'en',
  ) // default language

  useEffect(() => {
    if (i18n.isInitialized) {
      setCurrentLanguage(i18n.language)
    }
  }, [i18n])

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setCurrentLanguage(lng)
    onLanguageChange(lng)
  }

  return { currentLanguage, changeLanguage }
}
