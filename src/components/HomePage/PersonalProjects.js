// src/components/WorkExperience.js

import React, { useState, useEffect } from 'react'
import api from '../../middleWare/axiosInterceptor'
import { useTranslation } from 'react-i18next'
import descriptionTextStyles from './css/descriptionText.module.css'
import homePAgeStyles from './css/homePage.module.css'

const PersonalProjects = () => {
  const { t } = useTranslation()
  const [projects, setProjects] = useState([])
  const [error, setError] = useState(null)

  const { i18n } = useTranslation()

  useEffect(() => {
    const getData = async () => {
      try {
        const config = {
          headers: {
            'Accept-Language': i18n.language,
          },
        }
        const results = await api.get(`/personalprojects/lang`, config)
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
      <h2 style={styles.heading}>{t('personalProjects')}</h2>
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginBottom: '10px',
              }}
            >
              <p style={{ margin: 0 }}>
                <span style={styles.label}>{t('deploymentStatus')}:</span>
                <span className={descriptionTextStyles.otherLines}>
                  {data.deploymentStatus}
                </span>
              </p>
              {data.projectUrl && (
                <a
                  href={data.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: '10px',
                    textDecoration: 'none', // Remove underline from links
                    color: '#3498db', // Use the same blue color for consistency
                  }}
                >
                  {new URL(data.projectUrl).hostname}
                </a>
              )}
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
                  {new URL(data.repositoryLink).hostname}{' '}
                </a>
              )}
            </div>
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
                <span style={styles.label}> {t('end_date')}: </span>
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

export default PersonalProjects

const styles = {
  heading: {
    color: '#3498db', // Blue heading color
    marginBottom: '15px', // Spacing below heading
    textAlign: 'center', // Center-align the heading
  },
  detailHeader: {
    // New style for detail headers
    fontWeight: 'bold', // Make text bold
    color: '#2c3e50', // Use the same dark blue-gray color for consistency
    marginBottom: '5px', // Reduce bottom margin for a tighter grouping with its description
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px', // Adds some space between the label and the value
    color: '#3498db', // Or any color you prefer for labels
  },
}
