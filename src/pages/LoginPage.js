import React from "react";
import axios from 'axios';

import LoginBox from "../components/LoginBox";
import Header from "../components/Header";

const LoginPage = () => {

  // handleLogin is an async function that attempts to log in a user
  const handleLogin = async (username, password) => {
    try {
      // Sending a POST request to the login endpoint
      const response = await axios.post("https://localhost:3000/login", { username, password });

      if (response.status === 200) {
        // If authentication is successful
        console.log("Authentication successful");
        // Here, you can handle a successful authentication,
        // such as redirecting the user or storing the login token
      } else {
        // If the server responds with a status other than 200
        console.log("Authentication failed with status:", response.status);
        // Handle the failed authentication scenario
        // You might want to display an error message to the user
      }
    } catch (error) {
      // Catch and handle errors during the login attempt
      console.error("Login error:", error);
      // Display an error notification or message to the user
      // The error might be a network issue, server down, etc.
    }
  };

  return (
    <div>
      <Header />
      <div className="mainBox">
        <div className="box">
          {/* Pass handleLogin to LoginBox to handle the form submission */}
          <LoginBox onSubmit={handleLogin}/>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
