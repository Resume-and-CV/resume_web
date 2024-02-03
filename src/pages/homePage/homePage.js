// src/pages/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./homePage.module.css";

import PersonalInfo from "../../components/PersonalInfo";
import Education from "../../components/Education";
import ContactInfo from "../../components/ContactInfo";
import WorkExperience from "../../components/WorkExperience";
import Header from "../../components/Header";
import LanguageInfo from "../../components/LanguageInfo";
import HobbiesInfo from "../../components/HobbiesInfo";
import RecommendationsInfo from "../../components/RecommendationsInfo";
import SchoolProjects from "../../components/schoolProjects";
import PersonalProjects from "../../components/PersonalProjects";

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
      <div className={styles.mainBox}>
        <div className={styles.box}>
          <div className={styles.boxItem}>
            <PersonalInfo />
            <ContactInfo />
            <LanguageInfo />
            <WorkExperience />
            <HobbiesInfo />
            <RecommendationsInfo />
          </div>
          <div className={styles.boxItem}>
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

