import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importing the translation files
import enTranslation from "../locales/en.json";
import fiTranslation from "../locales/fi.json";

// Setting up the i18n configuration
i18n
  .use(initReactI18next) // Connects i18next to React
  .init({
    resources: {
      en: { translation: enTranslation },
      fi: { translation: fiTranslation },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if the current one isn't available
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
