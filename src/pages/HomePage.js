// src/pages/HomePage.js
import React from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

import PersonalInfo from "../components/PersonalInfo";
import Education from "../components/Education";
import ContactInfo from "../components/ContactInfo";
import WorkExperience from "../components/WorkExperience";

import "./HomePage.css";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <header className="header">
        <h1 className="h1">{t("myResume")}</h1>
        <LanguageSwitcher />
      </header>
      <div className="mainBox">
        <div className="box">
          <PersonalInfo style={{ marginRight: "10px" }} />
          <ContactInfo style={{ marginLeft: "10px" }} />
        </div>
        <div className="box">
          <Education />
          <WorkExperience />
        </div>
      </div>
      {/*   Add more components for other sections */}
    </div>
  );
};

export default HomePage;
