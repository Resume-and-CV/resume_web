import React from 'react'

import mainBoxStyles from './css/mainBoxStyles.module.css'
import Header from '../components/Header'

const SchoolGradesPage = () => {
  const grades = ['A', 'B', 'C', 'D', 'E']

  return (
    <div>
      <Header />
      <div className={mainBoxStyles.mainBox}>
        <div style={styles.loginBox}>
          <h1 style={styles.heading}>Grade Information</h1>
          <ul>
            {grades.map((grade, index) => (
              <li key={index} style={styles.input}>
                {grade}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SchoolGradesPage

const styles = {
  loginBox: {
    border: '2px solid #2c3e50', // Darker border for contrast
    padding: '20px',
    backgroundColor: '#ffffff', // White background for cleanliness
    color: '#2c3e50', // Dark blue-gray text
    margin: '20px auto', // Centered margin for login box
    maxWidth: '400px', // Max width for the form
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    borderRadius: '8px', // Rounded corners
  },
  heading: {
    color: '#3498db', // Blue heading color
    marginBottom: '15px', // Spacing below heading
    textAlign: 'center', // Center-align the heading
  },
  input: {
    width: 'calc(100% - 20px)', // Full width minus padding
    padding: '10px',
    marginBottom: '15px', // Spacing below inputs
    border: '1px solid #bdc3c7',
    borderRadius: '4px', // Slightly rounded borders for inputs
    boxSizing: 'border-box', // Include padding and border in width
  },
}
