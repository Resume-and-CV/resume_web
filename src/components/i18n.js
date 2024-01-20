// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      PersonalInfo: 'Personal Info',
      Name: 'Name',
      DateOfBirth: 'Date and place of birth',
      Nationality: 'Nationality',
      DriversLicense: "Driver's license",
      MilitaryService: 'Military service',
      // ... add more translations as needed
    },
  },
  fi: {
    translation: {
      PersonalInfo: 'Henkilötiedot',
      Name: 'Nimi',
      DateOfBirth: 'Syntymäaika ja paikka',
      Nationality: 'Kansalaisuus',
      DriversLicense: 'Ajokortti',
      MilitaryService: 'Asevelvollisuus',
      // ... add more translations as needed
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  interpolation: {
    escapeValue: false, // react already escapes by default
  },
});

export default i18n;
