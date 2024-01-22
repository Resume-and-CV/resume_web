import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "./Info.css";

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
        console.log(results.data);
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
    <div className="info">
      <h2>{t("ContactInfo")}</h2>
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <div key={index}>
            <p>
              {t("Email")}: {contact.email}
            </p>
            <p>
              {t("Phone")}: {contact.phone}
            </p>
            <p>
              {t("Adress")}: {contact.address}
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
