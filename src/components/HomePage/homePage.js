// src/pages/HomePage.js
import React from 'react'

import styles from './css/homePage.module.css'
import mainboxStyles from '../css/mainBoxStyles.module.css'

import PersonalInfo from './PersonalInfo'
import Education from './Education'
import ContactInfo from './ContactInfo'
import WorkExperience from './WorkExperience'
import Header from '../header/Header'
import LanguageInfo from './LanguageInfo'
import HobbiesInfo from './HobbiesInfo'
import RecommendationsInfo from './RecommendationsInfo'
import SchoolProjects from './schoolProjects'
import PersonalProjects from './PersonalProjects'
import HeaderText from './HeaderText'

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className={mainboxStyles.mainBox}>
        <div className={styles.boxItem}>
          <HeaderText />
        </div>
        <div className={styles.boxRow}>
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
      </div>
    </div>
  )
}

export default HomePage
