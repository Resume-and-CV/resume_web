// src/components/PersonalInfo.js
import React from 'react';
import { useTranslation } from 'react-i18next';

import './Info.css';

const PersonalInfo = () => {
  const { t } = useTranslation();

  return (
    <div className='info'>
      <h2>{t('PersonalInfo')}</h2>
      <p>{t('Name')}: Aki-Petteri Kuivas</p>
      <p>{t('DateOfBirth')}: 9 July 1990, Simo, Finland</p>
      <p>{t('Nationality')}: Finnish</p>
      <p>{t('DriversLicense')}: ABECE</p>
      <p>{t('MilitaryService')}: Lapin lennosto, 2009</p>
    </div>
  );
};

export default PersonalInfo;
