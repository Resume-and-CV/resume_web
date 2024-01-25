import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";



const ContactInfo = () => {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  const { i18n } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      try {
        const config = {
          headers: {
            "Accept-Language": i18n.language,
          },
        };
        const results = await axios.get(
          "http://localhost:3000/contactinfo/lang",
          config
        );
        setContacts(results.data);
        //console.log(results.data);
      } catch (err) {
        setError(err.message);
      }
    };
    getData();
  }, [i18n.language]); // Add i18n.language as a dependency

  if (error) {
    return <div className="info">Error: {error}</div>;
  }

  return (
    <div style={styles.box}>
      <h2 style={styles.heading}>{t("contactInfo")}</h2>
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <div key={index}>
            <p>
              {t("phone")}: {contact.phone}
            </p>
            <p>
              {t("email")}: {contact.email}
            </p>
            <p>
              {t("address")}: {contact.address}
            </p>
          </div>
        ))
      ) : (
        <p>Loading contact info...</p>
      )}
    </div>
  );
};

export default ContactInfo;


const styles = {
  box: {
    border: '2px solid #2c3e50', // Darker border for contrast
    padding: '20px',
    backgroundColor: '#ffffff', // White background for cleanliness
    color: '#2c3e50', // Dark blue-gray text
    margin: '20px auto', // Centered margin for login box
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    borderRadius: '8px', // Rounded corners
    
  },
  heading: {
    color: '#3498db', // Blue heading color
    marginBottom: '15px', // Spacing below heading
    textAlign: 'center', // Center-align the heading
  },
};