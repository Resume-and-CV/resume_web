// src/pages/HomePage.js
import React from 'react'

import styles from './css/homePage.module.css'

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
      <div className={styles.mainBox}>
        <div className={styles.boxItem}>
          <HeaderText />
        </div>
        <div className={styles.boxRow}>
          <div className={styles.boxItem}>
            <PersonalInfo />
          </div>
          <div className={styles.boxItem}>
            <ContactInfo />
          </div>
          <div className={styles.boxItem}>
            <LanguageInfo />
          </div>
          <div className={styles.boxItem}>
            <WorkExperience />
          </div>
          <div className={styles.boxItem}>
            <HobbiesInfo />
          </div>
          <div className={styles.boxItem}>
            {' '}
            <PersonalProjects />
          </div>
          <div className={styles.boxItem}>
            <Education />
          </div>
          <div className={styles.boxItem}>
            <SchoolProjects />
          </div>
          <div className={styles.boxItem}>
            <RecommendationsInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
