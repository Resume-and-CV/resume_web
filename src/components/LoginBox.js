import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LoginBox = ({ onLogin, errorMessage, isVisible }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (isVisible) return null; // Don't render anything if not visible

  return (
    <div style={styles.loginBox}>
      <h2 style={styles.heading}>{t("logIn")}</h2>
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}{" "}
      {/* Display error message */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(username, password);
        }}
      >
        <div>
          <label htmlFor="username">{t("userName")}</label>
          <input
            style={styles.input}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">{t("password")}</label>
          <input
            style={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button style={styles.button} type="submit">
          {t("logIn")}
        </button>
      </form>
    </div>
  );
};

export default LoginBox;

const styles = {
  loginBox: {
    border: "2px solid #2c3e50", // Darker border for contrast
    padding: "20px",
    backgroundColor: "#ffffff", // White background for cleanliness
    color: "#2c3e50", // Dark blue-gray text
    margin: "20px auto", // Centered margin for login box
    maxWidth: "400px", // Max width for the form
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    borderRadius: "8px", // Rounded corners
  },
  heading: {
    color: "#3498db", // Blue heading color
    marginBottom: "15px", // Spacing below heading
    textAlign: "center", // Center-align the heading
  },
  input: {
    width: "calc(100% - 20px)", // Full width minus padding
    padding: "10px",
    marginBottom: "15px", // Spacing below inputs
    border: "1px solid #bdc3c7",
    borderRadius: "4px", // Slightly rounded borders for inputs
    boxSizing: "border-box", // Include padding and border in width
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#3498db", // Blue button
    color: "white",
    border: "none",
    borderRadius: "4px", // Rounded corners for button
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Shadow for button
  },
  buttonHover: {
    // Separate style for hover effect
    backgroundColor: "#2980b9", // Slightly darker blue on hover
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
};
