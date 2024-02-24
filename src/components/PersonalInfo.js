// src/components/PersonalInfo.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import descriptionTextStyles from './css/descriptionText.module.css'
import homePAgeStyles from '../pages/css/homePage.module.css'

const PersonalInfo = () => {
  const { t } = useTranslation()
  const [infos, setInfos] = useState([])
  const [error, setError] = useState(null)

  const { i18n } = useTranslation()

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('token') // Retrieve the token from localStorage
        const config = {
          headers: {
            'Accept-Language': i18n.language,
            Authorization: `Bearer ${token}`,
          },
        }
        const results = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/personalinfo/lang`,
          config,
        )
        setInfos(results.data)
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
      <h2 style={styles.heading}>{t('personalInfo')}</h2>{' '}
      {/* Missing closing tag added */}
      {infos.length > 0 ? (
        infos.map((info, index) => (
          <div key={index} className={homePAgeStyles.entryBox}>
            <p>
              <span style={styles.label}>{t('name')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {info.name}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('dateOfBirth')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {new Date(info.birthdate).toLocaleDateString('fi-FI')}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('Nationality')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {info.nationality}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('driversLicense')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {info.driversLicense}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('militaryService')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {info.militaryService}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p>Loading contact info...</p>
      )}
    </div>
  )
}

export default PersonalInfo

const styles = {
  heading: {
    //color: "#ecf0f1", // Light gray text
    color: '#3498db', // Blue heading color
    marginBottom: '15px', // Spacing below heading
    textAlign: 'center', // Center-align the heading
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px', // Adds some space between the label and the value
    color: '#3498db', // Or any color you prefer for labels
  },
}
