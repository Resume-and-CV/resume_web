// src/components/Education.js
import React from "react";

const Education = () => (
  <div style={styles.box}>
    <h2 style={styles.heading}>Education</h2>
    <p>University of React, Bachelor of Science in Computer Science</p>
    <p>Graduation Year: 2022</p>
  </div>
);

export default Education;

const styles = {
  box: {
    border: "2px solid #2c3e50", // Darker border for contrast
    padding: "20px",
    backgroundColor: "#ffffff", // White background for cleanliness
    color: "#2c3e50", // Dark blue-gray text
    margin: "20px auto", // Centered margin for login box
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    borderRadius: "8px", // Rounded corners
  },
  heading: {
    color: "#3498db", // Blue heading color
    marginBottom: "15px", // Spacing below heading
    textAlign: "center", // Center-align the heading
  },
};
