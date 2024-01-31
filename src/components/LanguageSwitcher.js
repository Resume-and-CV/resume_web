// LanguageSwitcher.js
import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button style={styles.button} onClick={() => changeLanguage("en")}>
        English
      </button>
      <button style={styles.button} onClick={() => changeLanguage("fi")}>
        Suomi
      </button>
    </div>
  );
};

export default LanguageSwitcher;

const styles = {
  button: {
    margin: "1px",
    padding: "5px",
    backgroundColor: "#3498db", // Blue button
    color: "white",
    border: "none",
    borderRadius: "4px", // Rounded corners for button
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Shadow for button
  },
};
