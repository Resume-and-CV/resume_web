// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      //HomePage
      myResume: "My Resume!",
      //Personal info
      PersonalInfo: "Personal Info",
      Name: "Name",
      DateOfBirth: "Date and place of birth",
      Nationality: "Nationality",
      DriversLicense: "Driver's license",
      MilitaryService: "Military service",
      //Contactinfo
      ContactInfo: "Contact Info",
      Email: "Email",
      Phone: "Phone",
      Adress: "Adress",
    },
  },
  fi: {
    translation: {
      //HomePage
      myResume: "Ansioluetteloni!",
      //Personalinfo
      PersonalInfo: "Henkilötiedot",
      Name: "Nimi",
      DateOfBirth: "Syntymäaika ja paikka",
      Nationality: "Kansalaisuus",
      DriversLicense: "Ajokortti",
      MilitaryService: "Asevelvollisuus",
      //Contactinfo
      ContactInfo: "Yhteystiedot",
      Email: "Sähköposti",
      Phone: "Puhelin",
      Adress: "Osoite",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  interpolation: {
    escapeValue: false, // react already escapes by default
  },
});

export default i18n;
