// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      //HomePage
      myResume: "My Resume!",
      //Personal info
      personalInfo: "Personal Info",
      name: "Name",
      dateOfBirth: "Birthdate",
      nationality: "Nationality",
      driversLicense: "Driver's license",
      militaryService: "Military service",
      //Contactinfo
      contactInfo: "Contact Info",
      email: "Email",
      phone: "Phone",
      address: "Address",
      //LoginPage
      logIn: "Login",
      userName: "Username",
      passwprd: "Password",
      //Education
      education: "Education",
      institution: "Institution",
      degree: "Degree",
      major: "Major",
      start_date: "Start date",
      end_date: "End date",
      GPA: "GPA",
      //Work experience
      workExperience: "Work Experience",
      company: "Company",
      description: "Description",
      jobTitle: "Title",
      endJobDate: "End date",
    },
  },
  fi: {
    translation: {
      //HomePage
      myResume: "Ansioluetteloni!",
      //Personalinfo
      personalInfo: "Henkilötiedot",
      name: "Nimi",
      dateOfBirth: "Syntymäaika",
      nationality: "Kansalaisuus",
      driversLicense: "Ajokortti",
      militaryService: "Asevelvollisuus",
      //Contactinfo
      contactInfo: "Yhteystiedot",
      email: "Sähköposti",
      phone: "Puhelin",
      address: "Osoite",
      //LoginPage
      logIn: "Kirjaudu sisään",
      userName: "Käyttätunnus",
      password: "Salasana",
      //Education
      education: "Koulutus",
      institution: "Oppilaitos",
      degree: "Tutkinto",
      major: "Suuntautuminen",
      start_date: "Aloituspäivä",
      end_date: "Valmistumispäivä",
      GPA: "Keskiarvo",
      //Work experience
      workExperience: "Työkokemus",
      company: "Yritys",
      description: "Kuvaus",
      jobTitle: "Työnimike",
      endJobDate: "Lopetuspäivä",
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
