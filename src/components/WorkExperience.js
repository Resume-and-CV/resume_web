import React from "react";

const WorkExperience = () => (
  <div style={styles.box}>
    <h2 style={styles.heading}>Work Experience</h2>
    <p>Software Developer at ABC Company</p>
    <p>July 2020 - Present</p>
    <p>Responsibilities and achievements...</p>
  </div>
);

export default WorkExperience;

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
