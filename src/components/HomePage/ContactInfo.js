import React, { useState, useEffect } from 'react'
import api from '../../middleWare/axiosInterceptor'
import { useTranslation } from 'react-i18next'
import descriptionTextStyles from './css/descriptionText.module.css'
import homePAgeStyles from './css/homePage.module.css'

const ContactInfo = () => {
  const { t } = useTranslation()
  const [contacts, setContacts] = useState([])
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
        const results = await api.get(`/contactinfo/lang`, config)
        setContacts(results.data)
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
      <h2 style={styles.heading}>{t('contactInfo')}</h2>
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <div key={index} className={homePAgeStyles.entryBox}>
            <p>
              <span style={styles.label}>{t('phone')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {contact.phone}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('email')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {contact.email}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('address')}:</span>
              <span className={descriptionTextStyles.otherLines}>
                {contact.address}
              </span>
            </p>
            <p>
              <span style={styles.label}>{t('LinkedIn')}:</span>
              <a
                href={contact.linkedin}
                style={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {new URL(contact.linkedin).pathname.split('/').pop()}
              </a>
            </p>
            <p>
              <span style={styles.label}>{t('GitHub')}:</span>
              <a
                href={contact.github}
                style={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.github.split('/').pop()}
              </a>
            </p>
          </div>
        ))
      ) : (
        <p>Loading contact info...</p>
      )}
    </div>
  )
}

export default ContactInfo

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

  link: {
    textDecoration: 'none', // Remove underline from links
    color: '#3498db', // Use the same blue color for consistency
  },
}
