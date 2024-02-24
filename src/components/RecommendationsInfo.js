import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import descriptionTextStyles from './css/descriptionText.module.css'
import homePAgeStyles from '../pages/css/homePage.module.css'

const RecommendationsInfo = () => {
  const { t } = useTranslation()
  const [recommendations, setRecommendations] = useState([])
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
          `${process.env.REACT_APP_SERVER_URL}/recommendations/lang`,
          config,
        )
        setRecommendations(results.data)
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
      <h2 style={styles.heading}>{t('recommendations')}</h2>
      {recommendations.length > 0 ? (
        recommendations.map((data, index) => (
          <div key={index} className={homePAgeStyles.entryBox}>
            <p>
              <span style={styles.label}>{t('name')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.name}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('phone')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.phone}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('email')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.email}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('company')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.company}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('title')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.title}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('description')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.description}
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

export default RecommendationsInfo

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
