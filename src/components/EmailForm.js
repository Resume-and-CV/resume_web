// EmailForm.js
import React, { useState } from "react";
import { useTranslation } from "react-i18next";


// Correctly define EmailForm as a functional component
function EmailForm({ onAccountRequest, isVisible, toggleFrom }) {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");


  if (isVisible) return null; // Don't render anything if not visible

  return (
    <div style={emailFormStyles.formBox}>
      <h2 style={emailFormStyles.formHeading}>{t("contactForm")}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAccountRequest(email, subject, message);
        }}
      >
        <input
          type="email"
          style={emailFormStyles.formInput}
          placeholder={t("yourEmail")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          style={emailFormStyles.formInput}
          placeholder={t("subject")}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          style={emailFormStyles.formInput}
          placeholder={t("message")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" style={emailFormStyles.formButton}>
          {t("accountRequest")}
        </button>
      </form>
    </div>
  );
}

export default EmailForm;

// Correctly defined styles object
const emailFormStyles = {
  formBox: {
    border: "2px solid #2c3e50",
    padding: "20px",
    backgroundColor: "#ffffff",
    color: "#2c3e50",
    margin: "20px auto",
    maxWidth: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  formHeading: {
    color: "#3498db",
    marginBottom: "15px",
    textAlign: "center",
  },
  formInput: {
    width: "calc(100% - 20px)",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #bdc3c7",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  formButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  formButtonHover: {
    backgroundColor: "#2980b9",
  },
  formError: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
};
