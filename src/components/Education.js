// src/components/Education.js

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import buttonStyles from './css/button.module.css'

const Education = () => {
  const { t } = useTranslation()
  const [educations, setEducations] = useState([])
  const [error, setError] = useState(null)

  const { i18n } = useTranslation()
  const navigate = useNavigate()

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
          `${process.env.REACT_APP_SERVER_URL}/education/lang`,
          config,
        )
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
    <div style={styles.box}>
      <h2 style={styles.heading}>{t('education')}</h2>
      {educations.length > 0 ? (
        educations.map((data, index) => (
          <div key={index} style={styles.entryBox}>
            <p>
              <span style={styles.label}>{t('institution')}:</span>
              <span style={styles.value}>{data.institution}</span>
            </p>
            <p>
              <span style={styles.label}>{t('degree')}:</span>
              <span style={styles.value}>{data.degree}</span>
            </p>
            <p>
              <span style={styles.label}>{t('major')}:</span>
              <span style={styles.value}>{data.major}</span>
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
                <span style={styles.value}>
                  {' '}
                  {data.start_date
                    ? new Date(data.start_date).toLocaleDateString('fi-FI')
                    : t('ongoing')}
                </span>
              </p>
              <p>
                <span style={styles.label}> {t('completitionDate')}: </span>
                <span style={styles.value}>
                  {' '}
                  {data.end_date
                    ? new Date(data.end_date).toLocaleDateString('fi-FI')
                    : t('ongoing')}
                </span>
              </p>
              <button
                id="educationButton"
                className={buttonStyles.button}
                onClick={() => navigate('/schoolGradesPage')} // Pass the data to the next page
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
  box: {
    border: '2px solid #2c3e50', // Darker border for contrast
    padding: '20px',
    backgroundColor: '#ffffff', // White background for cleanliness
    //backgroundColor: "#3498db", // Dark blue-gray background
    color: '#2c3e50', // Dark blue-gray text
    margin: '20px auto', // Centered margin for login box
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    borderRadius: '8px', // Rounded corners
  },
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
  value: {
    color: '#2c3e50', // Dark blue-gray, or choose a different color for contrast
    // Any additional styling for values
  },
}
