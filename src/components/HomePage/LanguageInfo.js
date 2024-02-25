import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import descriptionTextStyles from './css/descriptionText.module.css'
import homePAgeStyles from './css/homePage.module.css'

const LanguageInfo = () => {
  const { t } = useTranslation()
  const [languages, setLanguages] = useState([])
  const [error, setError] = useState(null)

  const { i18n } = useTranslation()

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem('token') // Retrieve the token from localStorage

      try {
        const config = {
          headers: {
            'Accept-Language': i18n.language,
            Authorization: `Bearer ${token}`,
          },
        }
        const results = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/languageInfo/lang`,
          config,
        )
        setLanguages(results.data)
        //console.log(results.data);
      } catch (err) {
        setError(err.message)
      }
    }
    getData()
  }, [i18n.language]) // Add i18n.language as a dependency

  if (error) {
    return <div className="info">Error: {error}</div>
  }

  return (
    <div className={homePAgeStyles.box}>
      <h2 style={styles.heading}>{t('languageSkills')}</h2>
      <div className={homePAgeStyles.entryBox}>
        {languages.length > 0 ? (
          languages.map((data, index) => (
            <div key={index}>
              <p>
                <span style={styles.label}>{t(data.language)}:</span>
                <span className={descriptionTextStyles.otherLines}>
                  {data.level} {data.description && `- ${data.description}`}
                </span>
              </p>
            </div>
          ))
        ) : (
          <p>Loading language skills...</p>
        )}
      </div>
    </div>
  )
}

export default LanguageInfo

const styles = {
  heading: {
    color: '#3498db', // Blue heading color
    //color: "#ecf0f1", // Light gray text
    marginBottom: '15px', // Spacing below heading
    textAlign: 'center', // Center-align the heading
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px', // Adds some space between the label and the value
    color: '#3498db', // Or any color you prefer for labels
  },
}
