// useLanguageSwitcher.js
import { useTranslation } from 'react-i18next'

export const useLanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return changeLanguage
}
