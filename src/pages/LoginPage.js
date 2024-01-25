import React from "react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

import LoginBox from "../components/LoginBox";
import Header from "../components/Header";

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div className="mainBox">
        <div className="box">
          <LoginBox />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

const headerStyles = {
  header: {
    backgroundColor: "#2c3e50", // Dark blue-gray background
    color: "#ecf0f1", // Light gray text
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)", // Adding some shadow for depth
  },
  title: {
    marginBottom: "20px",
    fontSize: "2em", // Larger font size for the heading
    color: "#3498db", // Blue heading color similar to LoginBox
  },
};
