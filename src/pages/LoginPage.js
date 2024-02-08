import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LoginBox from "../components/LoginBox";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false);
  const [isLoginBoxVisible, setIsLoginBoxVisible] = useState(true);
  const { t } = useTranslation();

  const handleLogin = async (username, password) => {
    //console.log(process.env.REACT_APP_SERVER_URL);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
        console.log("Authentication successful user: ", username);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Set the error message from the server response
        setErrorMessage(error.response.data.message);
      } else {
        console.error("Login error:", error);
        setErrorMessage("An error occurred while trying to log in.");
      }
    }
  };

  const toggleVisibility = () => {
    setIsEmailFormVisible(!isEmailFormVisible);
    setIsLoginBoxVisible(!isLoginBoxVisible);
  };

  const handleAccountRequest = (from, subject, text) => {
    // Ensure you have REACT_APP_SERVER_URL defined in your .env file, e.g., REACT_APP_SERVER_URL=http://localhost:3000
    const apiUrl = `${process.env.REACT_APP_SERVER_URL}/email/send-request`; // Corrected API endpoint construction
    axios
      .post(apiUrl, { from, subject, text })
      .then((response) => {
        if (response.status === 200) {
          console.log("Email sent successfully:", response.data.message);
          // Handle success, maybe show a success message to the user
        } else {
          console.error("Email request denied:", response.data.message);
          // Handle denial, maybe show an error message to the user
        }
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        // Handle other errors, e.g., network issues
      });
  };

  return (
    <div>
      <Header />
      <div style={styles.mainBox}>
        {isLoginBoxVisible && (
          <LoginBox onLogin={handleLogin} errorMessage={errorMessage} />
        )}
        {isEmailFormVisible && (
          <ContactForm
            onAccountRequest={handleAccountRequest}
            onSubmit={(formData) => {
              console.log(formData); // Form submission logic...
            }}
          />
        )}
        {/* This section is always visible, provides a way to toggle between the login form and contact form */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {!isEmailFormVisible ? (
            <>
              <p>Are you an employee?</p>
              <p>Don't have an account? Request one here.</p>
              <p>
                A contact form is coming soon. Meanwhile, please contact me at{" "}
                <a href="mailto:A-p.kvs2@protonmail.com">
                  A-p.kvs2@protonmail.com
                </a>{" "}
              </p>
              {/* Vhen contact form is working, apply this */}
              <button onClick={toggleVisibility}>{t("contactForm")}</button>
            </>
          ) : (
            <button onClick={toggleVisibility}>{t("back")}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

const styles = {
  mainBox: {
    backgroundColor: "#3498db", // Dark blue-gray background
    padding: "10%",
    paddingBottom: "20%", // Corrected property name
    margin: "10px",
    border: "2px solid #2c3e50", // Darker border for contrast
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    borderRadius: "8px", // Rounded corners
  },
};
