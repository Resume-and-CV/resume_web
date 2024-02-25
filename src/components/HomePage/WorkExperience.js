// src/components/WorkExperience.js

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import descriptionTextStyles from './css/descriptionText.module.css'
import homePAgeStyles from './css/homePage.module.css'

const WorkExperience = () => {
  const { t } = useTranslation()
  const [workPlaces, setWorkPlaces] = useState([])
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
          `${process.env.REACT_APP_SERVER_URL}/work/lang`,
          config,
        )
        setWorkPlaces(results.data)
      } catch (err) {
        setError(err.message)
      }
    }
    getData()
  }, [i18n.language]) // Add i18n.language as a dependency

  if (error) {
    return <div className="info">Error: {error}</div>
  }
  //console.log(workPlaces);
  return (
    <div className={homePAgeStyles.box}>
      <h2 style={styles.heading}>{t('workExperience')}</h2>
      {workPlaces.length > 0 ? (
        workPlaces.map((data, index) => (
          <div key={index} className={homePAgeStyles.entryBox}>
            <p>
              <span style={styles.label}>{t('company')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.company}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('jobTitle')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.job_title}
              </span>
            </p>
            <div>
              <span style={styles.label}>{t('description')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.description
                  .replace(/\\n/g, '\n')
                  .split('\n')
                  .map((text, i) => (
                    <p key={i} className={descriptionTextStyles.otherLines}>
                      {text}
                    </p>
                  ))}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
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
                <span style={styles.label}> {t('endJobDate')}: </span>
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
            </div>
          </div>
        ))
      ) : (
        <p>Loading contact info...</p>
      )}
    </div>
  )
}

export default WorkExperience

const styles = {
  entryBox: {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
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
