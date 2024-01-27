// src/pages/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

import PersonalInfo from "../components/PersonalInfo";
import Education from "../components/Education";
import ContactInfo from "../components/ContactInfo";
import WorkExperience from "../components/WorkExperience";
import Header from "../components/Header";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    console.log("Logged out");
  };

  return (
    <div>
      <Header onLogout={handleLogout} />
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
