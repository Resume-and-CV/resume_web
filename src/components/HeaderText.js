import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { jwtDecode } from 'jwt-decode'
import mainStyles from '../pages/css/homePage.module.css'

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

      if (!userId || !i18n.language) {
        console.error('userId or language is undefined')
        return
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            user_id: userId,
            language: i18n.language,
          },
        }
        const results = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/headertext/getbyuserid`,
          config,
        )
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
  console.log('username1:', username)
  return (
    <div style={mainStyles.box}>
      <h2 style={styles.heading}>{t('headerTextTitle', { username })}</h2>
      <div style={styles.entryBox}>
        {headerText && headerText.length > 0 ? (
          headerText.map((data, index) => (
            <div key={index}>
              {data.header
                .replace(/\\n/g, '\n')
                .split('\n')
                .map((text, i) => (
                  <p key={i} style={styles.firstLine}>
                    {text}
                  </p>
                ))}
              {data.description
                .replace(/\\n/g, '\n')
                .split('\n')
                .map((text, i) => (
                  <p key={i} style={styles.otherLines}>
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
  box: {
    border: '2px solid #2c3e50', // Darker border for contrast
    padding: '20px',
    backgroundColor: '#ffffff', // White background for cleanliness
    //backgroundColor: "#3498db", // Dark blue-gray background
    color: '#2c3e50', // Dark blue-gray text
    //margin: '20px', // Centered margin for login box
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
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
  firstLine: {
    fontSize: '16px',
    fontFamily: 'Arial',
  },
  otherLines: {
    fontSize: '14px',
    fontFamily: 'Arial',
  },
}
