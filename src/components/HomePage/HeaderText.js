import React, { useState, useEffect } from 'react'
import api from '../../middleWare/axiosInterceptor'
import { useTranslation } from 'react-i18next'
import { jwtDecode } from 'jwt-decode'
import homePAgeStyles from './css/homePage.module.css'
import descriptionTextStyles from './css/descriptionText.module.css'

const HeaderText = () => {
  const { t } = useTranslation()
  const { i18n } = useTranslation()

  const [headerText, setHeaderText] = useState([])
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('') // Add this line

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem('token') // Retrieve the token from localStorage
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.id
      setUsername(decodedToken.username) // Add this line
      //console.log('decodedToken:', decodedToken)

      if (!userId || !i18n.language) {
        console.error('userId or language is undefined')
        console.error('userId:', userId, 'language:', i18n.language)
        return
      }

      try {
        const config = {
          headers: {},
          params: {
            user_id: userId,
            language: i18n.language,
          },
        }
        const results = await api.get(`/headertext/getbyuserid`, config)
        if (Array.isArray(results.data)) {
          setHeaderText(results.data)
        } else {
          console.error('results.data is not an array:', results.data)
        }
      } catch (err) {
        setError(err.message)
      }
    }
    getData()
  }, [i18n.language]) // Add i18n.language as a dependency

  if (error) {
    return <div className="info">Error: {error}</div>
  }
  //console.log('username1:', username)
  return (
    <div className={homePAgeStyles.headerTextBox}>
      <h2 style={styles.heading}>{t('headerTextTitle', { username })}</h2>
      <div className={homePAgeStyles.entryBox}>
        {headerText && headerText.length > 0 ? (
          headerText.map((data, index) => (
            <div key={index}>
              {data.header
                .replace(/\\n/g, '\n')
                .split('\n')
                .map((text, i) => (
                  <p key={i} className={descriptionTextStyles.firstLine}>
                    {text}
                  </p>
                ))}
              {data.description
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
          <p>Loading text...</p>
        )}
      </div>
    </div>
  )
}

export default HeaderText
const styles = {
  heading: {
    color: '#3498db', // Blue heading color
    //color: "#ecf0f1", // Light gray text
    marginBottom: '15px', // Spacing below heading
    textAlign: 'center', // Center-align the heading
  },
}
