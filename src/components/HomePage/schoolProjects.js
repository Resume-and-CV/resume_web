// src/components/WorkExperience.js

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import descriptionTextStyles from './css/descriptionText.module.css'
import homePAgeStyles from './css/homePage.module.css'

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
    <div className={homePAgeStyles.box}>
      <h2 style={styles.heading}>{t('schoolProjects')}</h2>
      {projects.length > 0 ? (
        projects.map((data, index) => (
          <div key={index} className={homePAgeStyles.entryBox}>
            <p>
              <span style={styles.label}>{t('projectName')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.projectName}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('technologiesUsed')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.technologiesUsed}
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
            </div>{' '}
            <p>
              <span style={styles.label}>{t('courseName')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {data.courseName}
              </span>
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
                <span className={descriptionTextStyles.otherLines}>
                  {data.grade}
                </span>
              </p>

              {data.repositoryLink && (
                <a
                  href={data.repositoryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: '10px',
                    textDecoration: 'none', // Remove underline from links
                    color: '#3498db', // Use the same blue color for consistency
                  }}
                >
                  {new URL(data.repositoryLink).hostname}
                </a>
              )}
            </div>
            <p>
              <span style={styles.label}> {t('completitionDate')}: </span>
              <span className={descriptionTextStyles.otherLines}>
                {' '}
                {data.completitionDate
                  ? new Date(data.completitionDate).toLocaleDateString(
                      'fi-FI',
                      {
                        month: 'numeric',
                        year: 'numeric',
                      },
                    )
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
