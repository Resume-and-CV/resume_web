// src/components/WorkExperience.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const PersonalProjects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
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
          `${process.env.REACT_APP_SERVER_URL}/personalprojects/lang`,
          config
        );
        setProjects(results.data);
      } catch (err) {
        setError(err.message);
      }
    };
    getData();
  }, [i18n.language]); // Add i18n.language as a dependency

  if (error) {
    return <div className="info">Error: {error}</div>;
  }
  //console.log(workPlaces);
  return (
    <div style={styles.box}>
      <h2 style={styles.heading}>{t("personalProjects")}</h2>
      {projects.length > 0 ? (
        projects.map((data, index) => (
          <div key={index} style={styles.entryBox}>
            <p>
              {t("projectName")}: {data.projectName}
            </p>
            <p>
              {t("technologiesUsed")}: {data.technologiesUsed}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              <p style={{ margin: 0 }}>
                {t("deploymentStatus")}: {data.deploymentStatus}
              </p>
              {data.projectUrl && (
                <a
                  href={data.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "10px" }}
                >
                  Visit Website
                </a>
              )}
              {data.repositoryLink && (
                <a
                  href={data.repositoryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "10px" }}
                >
                  Visit Repository
                </a>
              )}
            </div>
            <p>
              {t("description")}: {data.description}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p>
                {t("start_date")}:{" "}
                {data.start_date
                  ? new Date(data.start_date).toLocaleDateString("fi-FI")
                  : t("ongoing")}
              </p>
              <p>
                {t("end_date")}:{" "}
                {data.end_date
                  ? new Date(data.end_date).toLocaleDateString("fi-FI")
                  : t("ongoing")}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading contact info...</p>
      )}
    </div>
  );
};

export default PersonalProjects;

const styles = {
  box: {
    border: "2px solid #2c3e50", // Darker border for contrast
    padding: "20px",
    backgroundColor: "#ffffff", // White background for cleanliness
    color: "#2c3e50", // Dark blue-gray text
    margin: "20px auto", // Centered margin
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
  detailHeader: {
    // New style for detail headers
    fontWeight: "bold", // Make text bold
    color: "#2c3e50", // Use the same dark blue-gray color for consistency
    marginBottom: "5px", // Reduce bottom margin for a tighter grouping with its description
  },
};
