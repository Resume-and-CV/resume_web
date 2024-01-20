// src/pages/HomePage.js
import React from 'react';
import PersonalInfo from '../components/PersonalInfo';
import Education from '../components/Education';
import ContactInfo from '../components/ContactInfo';
import WorkExperience from '../components/WorkExperience';

import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <header className='header'>
        <h1 className='h1'>My Resume</h1>
      </header>
      <PersonalInfo />
      <ContactInfo />
      <Education />
      <WorkExperience />
  {/*   Add more components for other sections */}
    </div>
  );
};

export default HomePage;
