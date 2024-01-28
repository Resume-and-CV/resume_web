// src/components/PersonalInfo.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const PersonalInfo = () => {
  const { t } = useTranslation();
  const [infos, setInfos] = useState([]);
  const [error, setError] = useState(null);

  const { i18n } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        const config = {
          headers: {
            "Accept-Language": i18n.language,
            Authorization: `Bearer ${token}`,
          },
        };
        const results = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/personalinfo/lang`,
          config
        );
        setInfos(results.data);
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
      <h2 style={styles.heading}>{t("personalInfo")}</h2>
      {infos.length > 0 ? (
        infos.map((info, index) => (
          <div key={index}>
            <p>
              {t("name")}: {info.name}
            </p>
            <p>
              {t("dateOfBirth")}:{' '}
              {new Date(info.birthdate).toLocaleDateString("fi-FI")}
            </p>
            <p>
              {t("Nationality")}: {info.nationality}
            </p>
            <p>
              {t("driversLicense")}: {info.driversLicense}
            </p>
            <p>
              {t("militaryService")}: {info.militaryService}
            </p>
          </div>
        ))
      ) : (
        <p>Loading contact info...</p>
      )}
    </div>
  );
};

export default PersonalInfo;

const styles = {
  box: {
    border: "2px solid #2c3e50", // Darker border for contrast
    padding: "20px",
    backgroundColor: "#ffffff", // White background for cleanliness
    color: "#2c3e50", // Dark blue-gray text
    margin: "20px auto", // Centered margin for login box
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    borderRadius: "8px", // Rounded corners
  },
  heading: {
    color: "#3498db", // Blue heading color
    marginBottom: "15px", // Spacing below heading
    textAlign: "center", // Center-align the heading
  },
};
