import React, { useState, useEffect } from 'react'
import api from '../../middleWare/axiosInterceptor'
import { useTranslation } from 'react-i18next'
import descriptionTextStyles from './css/descriptionText.module.css'
import homePAgeStyles from './css/homePage.module.css'

const HobbiesInfo = () => {
  const { t } = useTranslation()
  const [hobbies, setHobbies] = useState([])
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
        const results = await api.get(`/hobbiesinfo/lang`, config)
        setHobbies(results.data)
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
      <h2 style={styles.heading}>{t('hobbiesInfo')}</h2>
      <div className={homePAgeStyles.entryBox}>
        {hobbies.length > 0 ? (
          hobbies.map((data, index) => (
            <div key={index}>
              {t(data.description)
                .replace(/\\n/g, '\n')
                .split('\n')
                .map((text, i) => (
                  <p key={i} className={descriptionTextStyles.otherLines}>
                    {text}
                  </p>
                ))}
            </div>
          ))
        ) : (
          <p>Loading language skills...</p>
        )}
      </div>
    </div>
  )
}

export default HobbiesInfo

const styles = {
  heading: {
    color: '#3498db', // Blue heading color
    //color: "#ecf0f1", // Light gray text
    marginBottom: '15px', // Spacing below heading
    textAlign: 'center', // Center-align the heading
  },
}
