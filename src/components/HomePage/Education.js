// src/components/Education.js

import React, { useState, useEffect } from 'react'
import api from '../../middleWare/axiosInterceptor'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import buttonStyles from '../css/button.module.css'
import descriptionTextStyles from './css/descriptionText.module.css'
import homePAgeStyles from './css/homePage.module.css'

const Education = () => {
  const { t } = useTranslation()
  const [educations, setEducations] = useState([])
  const [error, setError] = useState(null)

  const { i18n } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const config = {
          headers: {
            'Accept-Language': i18n.language,
          },
        }
        const results = await api.get(`/education/lang`, config)
        setEducations(results.data)
      } catch (err) {
        setError(err.message)
      }
    }
    getData()
  }, [i18n.language]) // Add i18n.language as a dependency

  if (error) {
    return <div className="info">Error: {error}</div>
  }
  // console.log(educations);
  return (
    <div className={homePAgeStyles.box}>
      <h2 style={styles.heading}>{t('education')}</h2>
      {educations.length > 0 ? (
        educations.map((data, index) => (
          <div key={index} className={homePAgeStyles.entryBox}>
            <p>
              <span style={styles.label}>{t('institution')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.institution}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('degree')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.degree}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('major')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.major}
              </span>
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p>
                <span style={styles.label}> {t('start_date')}: </span>
                <span className={descriptionTextStyles.otherLines}>
                  {' '}
                  {data.start_date
                    ? new Date(data.start_date).toLocaleDateString('fi-FI', {
                        month: 'numeric',
                        year: 'numeric',
                      })
                    : t('ongoing')}
                </span>
              </p>
              <p>
                <span style={styles.label}> {t('completitionDate')}: </span>
                <span className={descriptionTextStyles.otherLines}>
                  {' '}
                  {data.end_date
                    ? new Date(data.end_date).toLocaleDateString('fi-FI', {
                        month: 'numeric',
                        year: 'numeric',
                      })
                    : t('ongoing')}
                </span>
              </p>
              <button
                id="educationButton"
                className={buttonStyles.button}
                onClick={() =>
                  navigate('/schoolGradesPage', {
                    state: {
                      education_id: data.education_id,
                      total_credits_required: data.total_credits_required,
                    },
                  })
                }
              >
                {t('showGrades')}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading contact info...</p>
      )}
    </div>
  )
}

export default Education

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
