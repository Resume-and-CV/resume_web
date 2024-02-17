// LanguageSwitcher.js
import React from 'react'
import { useTranslation } from 'react-i18next'
import buttonStyles from './css/button.module.css'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div>
      <button
        className={buttonStyles.button}
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
      <button
        className={buttonStyles.button}
        onClick={() => changeLanguage('fi')}
      >
        Suomi
      </button>
    </div>
  )
}

export default LanguageSwitcher
