// src/components/Education.js
/* import React from "react";

const Education = () => (
  <div style={styles.box}>
    <h2 style={styles.heading}>Education</h2>
    <p>University of React, Bachelor of Science in Computer Science</p>
    <p>Graduation Year: 2022</p>
  </div>
);

export default Education;

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
}; */

// src/components/PersonalInfo.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Education = () => {
  const { t } = useTranslation();
  const [educations, setEducations] = useState([]);
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
          `${process.env.REACT_APP_SERVER_URL}/education/lang`,
          config
        );
        setEducations(results.data);
      } catch (err) {
        setError(err.message);
      }
    };
    getData();
  }, [i18n.language]); // Add i18n.language as a dependency

  if (error) {
    return <div className="info">Error: {error}</div>;
  }
  console.log(educations);
  return (
    <div style={styles.box}>
      <h2 style={styles.heading}>{t("education")}</h2>
      {educations.length > 0 ? (
        educations.map((data, index) => (
          <div key={index} style={styles.entryBox}>
            <p>
              {t("institution")}: {data.institution}
            </p>
            <p>
              {t("degree")}: {data.degree}
            </p>
            <p>
              {t("major")}: {data.major}
            </p>
            <p>
              {t("start_date")}:{" "}
              {new Date(data.start_date).toLocaleDateString("fi-FI")}
            </p>
            <p>
              {t("end_date")}:{" "}
              {new Date(data.end_date).toLocaleDateString("fi-FI")}
            </p>
          </div>
        ))
      ) : (
        <p>Loading contact info...</p>
      )}
    </div>
  );
};

export default Education;

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
  entryBox: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    color: "#3498db", // Blue heading color
    marginBottom: "15px", // Spacing below heading
    textAlign: "center", // Center-align the heading
  },
};
