import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const RecommendationsInfo = () => {
  const { t } = useTranslation();
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const { i18n } = useTranslation();

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      try {
        const config = {
          headers: {
            "Accept-Language": i18n.language,
            Authorization: `Bearer ${token}`,
          },
        };
        const results = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/recommendations/lang`,
          config
        );
        setRecommendations(results.data);
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
      <h2 style={styles.heading}>{t("recommendations")}</h2>
      {recommendations.length > 0 ? (
        recommendations.map((data, index) => (
          <div key={index} style={styles.entryBox}>
            <p>
              <span style={styles.label}>{t("name")}:</span>
              <span style={styles.value}>{data.name}</span>
            </p>
            <p>
              <span style={styles.label}>{t("phone")}:</span>
              <span style={styles.value}>{data.phone}</span>
            </p>
            <p>
              <span style={styles.label}>{t("email")}:</span>
              <span style={styles.value}>{data.email}</span>
            </p>
            <p>
              <span style={styles.label}>{t("company")}:</span>
              <span style={styles.value}>{data.company}</span>
            </p>
            <p>
              <span style={styles.label}>{t("title")}:</span>
              <span style={styles.value}>{data.title}</span>
            </p>
            <p>
              <span style={styles.label}>{t("description")}:</span>
              <span style={styles.value}>{data.description}</span>
            </p>
          </div>
        ))
      ) : (
        <p>Loading contact info...</p>
      )}
    </div>
  );
};

export default RecommendationsInfo;

const styles = {
  box: {
    border: "2px solid #2c3e50", // Darker border for contrast
    padding: "20px",
    backgroundColor: "#ffffff", // White background for cleanliness
    //backgroundColor: "#3498db", // Dark blue-gray background
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
    //color: "#ecf0f1", // Light gray text
    marginBottom: "15px", // Spacing below heading
    textAlign: "center", // Center-align the heading
  },
  label: {
    fontWeight: "bold",
    marginRight: "10px", // Adds some space between the label and the value
    color: "#3498db", // Or any color you prefer for labels
  },
  value: {
    color: "#2c3e50", // Dark blue-gray, or choose a different color for contrast
    // Any additional styling for values
  },
};
