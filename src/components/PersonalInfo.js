// src/components/PersonalInfo.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

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
    <div style={styles.box}>
      <h2 style={styles.heading}>{t('personalInfo')}</h2>{' '}
      {/* Missing closing tag added */}
      {infos.length > 0 ? (
        infos.map((info, index) => (
          <div key={index} style={styles.entryBox}>
            <p>
              <span style={styles.label}>{t('name')}:</span>
              <span style={styles.value}>{info.name}</span>
            </p>
            <p>
              <span style={styles.label}>{t('dateOfBirth')}:</span>
              <span style={styles.value}>
                {new Date(info.birthdate).toLocaleDateString('fi-FI')}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('Nationality')}:</span>
              <span style={styles.value}>{info.nationality}</span>
            </p>
            <p>
              <span style={styles.label}>{t('driversLicense')}:</span>
              <span style={styles.value}>{info.driversLicense}</span>
            </p>
            <p>
              <span style={styles.label}>{t('militaryService')}:</span>
              <span style={styles.value}>{info.militaryService}</span>
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
  box: {
    border: '2px solid #2c3e50', // Darker border for contrast
    padding: '20px',
    //backgroundColor: "#3498db", // Dark blue-gray background
    backgroundColor: '#ffffff', // White background for cleanliness
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
  value: {
    color: '#2c3e50', // Dark blue-gray, or choose a different color for contrast
    // Any additional styling for values
  },
}
