// src/pages/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

import PersonalInfo from "../components/PersonalInfo";
import Education from "../components/Education";
import ContactInfo from "../components/ContactInfo";
import WorkExperience from "../components/WorkExperience";
import Header from "../components/Header";
import LanguageInfo from "../components/LanguageInfo";
import HobbiesInfo from "../components/HobbiesInfo";
import RecommendationsInfo from "../components/RecommendationsInfo";
import SchoolProjects from "../components/schoolProjects";
import PersonalProjects from "../components/PersonalProjects";

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
            <ContactInfo />
            <LanguageInfo />
            <WorkExperience />
            <HobbiesInfo />
            <RecommendationsInfo />
          </div>
          <div style={styles.boxItem}>
            <Education />
            <PersonalProjects />
            <SchoolProjects />
          </div>
        </div>
        {/*         <div style={styles.box}>
          <div style={styles.boxItem}>
            <Education />
          </div>
          <div style={styles.boxItem}>
            <WorkExperience />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;

const styles = {
  mainBox: {
    margin: "10px", // Add spacing around all boxes
    backgroundColor: "#3498db", // Dark blue-gray background
    border: "2px solid #2c3e50", // Darker border for contrast
    color: "#2c3e50", // Dark blue-gray text
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    borderRadius: "8px", // Rounded corners
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
