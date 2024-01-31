import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LoginBox from "../components/LoginBox";
import Header from "../components/Header";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (username, password) => {
    console.log(process.env.REACT_APP_SERVER_URL);
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

  return (
    <div>
      <Header />
      <div style={styles.mainBox}>
        <div>
          <LoginBox onLogin={handleLogin} errorMessage={errorMessage} />
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
