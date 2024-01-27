import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LoginBox from "../components/LoginBox";
import Header from "../components/Header";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("https://localhost:3000/login", {
        username,
        password,
      });

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
      <div className="mainBox">
        <div className="box">
          <LoginBox onLogin={handleLogin} errorMessage={errorMessage} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
