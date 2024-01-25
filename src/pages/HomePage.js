// src/pages/HomePage.js
import React from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

import PersonalInfo from "../components/PersonalInfo";
import Education from "../components/Education";
import ContactInfo from "../components/ContactInfo";
import WorkExperience from "../components/WorkExperience";
import Header from "../components/Header";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div style={styles.mainBox}>
        <div style={styles.box}>
          <div style={styles.boxItem}>
            <PersonalInfo />
          </div>
          <div style={styles.boxItem}>
            <ContactInfo />
          </div>
        </div>
        <div style={styles.box}>
          <div style={styles.boxItem}>
            <Education />
          </div>
          <div style={styles.boxItem}>
            <WorkExperience />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

const styles = {
  mainBox: {
    margin: "10px", // Add spacing around all boxes
  },
  box: {
    display: "flex",
    justifyContent: "space-between", // Distributes space between and around content items
    margin: "0 10px", // Margin on the sides for a little space from the screen edges
  },
  boxItem: {
    flex: 1, // Each item will take equal space
    margin: "10px", // Margin for each box item for spacing
  },
};

const headerStyles = {
  header: {
    backgroundColor: "#2c3e50", // Dark blue-gray background
    color: "#ecf0f1", // Light gray text
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)", // Adding some shadow for depth
  },
  title: {
    marginBottom: "20px",
    fontSize: "2em", // Larger font size for the heading
    color: "#3498db", // Blue heading color similar to LoginBox
  },
};
