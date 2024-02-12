// src/components/WorkExperience.js

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const SchoolProjects = () => {
  const { t } = useTranslation()
  const [projects, setProjects] = useState([])
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
          `${process.env.REACT_APP_SERVER_URL}/schoolprojects/lang`,
          config,
        )
        setProjects(results.data)
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
    <div style={styles.box}>
      <h2 style={styles.heading}>{t('schoolProjects')}</h2>
      {projects.length > 0 ? (
        projects.map((data, index) => (
          <div key={index} style={styles.entryBox}>
            <p>
              <span style={styles.label}>{t('projectName')}:</span>
              <span style={styles.value}>{data.projectName}</span>
            </p>
            <p>
              <span style={styles.label}>{t('technologiesUsed')}:</span>
              <span style={styles.value}>{data.technologiesUsed}</span>
            </p>
            <p>
              <span style={styles.label}>{t('description')}:</span>
              <span style={styles.value}>{data.description}</span>
            </p>
            <p>
              <span style={styles.label}>{t('courseName')}:</span>
              <span style={styles.value}>{data.courseName}</span>
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginBottom: '10px',
              }}
            >
              <p style={{ margin: 0 }}>
                <span style={styles.label}>{t('grade')}:</span>
                <span style={styles.value}>{data.grade}</span>
              </p>

              {data.repositoryLink && (
                <a
                  href={data.repositoryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: '10px' }}
                >
                  Visit Repository
                </a>
              )}
            </div>

            <p>
              <span style={styles.label}> {t('completitionDate')}: </span>
              <span style={styles.value}>
                {' '}
                {data.completitionDate
                  ? new Date(data.completitionDate).toLocaleDateString('fi-FI')
                  : t('ongoing')}
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

export default SchoolProjects

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
