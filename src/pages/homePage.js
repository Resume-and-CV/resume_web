// src/pages/HomePage.js
import React from 'react'

import styles from './css/homePage.module.css'
import mainboxStyles from './css/mainBoxStyles.module.css'

import PersonalInfo from '../components/PersonalInfo'
import Education from '../components/Education'
import ContactInfo from '../components/ContactInfo'
import WorkExperience from '../components/WorkExperience'
import Header from '../components/Header'
import LanguageInfo from '../components/LanguageInfo'
import HobbiesInfo from '../components/HobbiesInfo'
import RecommendationsInfo from '../components/RecommendationsInfo'
import SchoolProjects from '../components/schoolProjects'
import PersonalProjects from '../components/PersonalProjects'
import HeaderText from '../components/HeaderText'

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className={mainboxStyles.mainBox}>
        <div className={styles.headerText}>
          <HeaderText />
        </div>
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
      </div>
    </div>
  )
}

export default HomePage
