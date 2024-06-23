import React, { useState } from 'react'
import api from '../../middleWare/axiosInterceptor'
import { toast } from 'react-toastify'

const AddUser = ({ onAddUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('user') // Default to 'user'
  const [createExpiringLink, setCreateExpiringLink] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const showPasswordImg = '/images/eye.png'
  const hidePasswordImg = '/images/hidden.png'

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const userResponse = await api.post('/user/add', {
        username,
        password,
        type,
      }) // Include 'type' in the request body
      console.log('User added:', userResponse.data)

      if (createExpiringLink) {
        const linkResponse = await api.post('/expiringlink/add', {
          user_id: userResponse.data.id,
          url: process.env.REACT_APP_URL, // Replace with your server URL
        }) // Assume the user ID is returned in the user creation response
        console.log('Expiring link created:', linkResponse.data)
        console.log('url:', process.env.REACT_APP_URL)
      }

      toast.success('User added successfully')
      // Call the function passed from the parent component
      onAddUser()
    } catch (error) {
      console.error('Failed to add user:', error)

      toast.error('Failed to add user')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Password:</label>
        <div style={styles.passwordContainer}>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button
            style={styles.toggleButton}
            onClick={(e) => {
              e.preventDefault()
              setIsPasswordVisible(!isPasswordVisible)
            }}
          >
            <img
              src={isPasswordVisible ? hidePasswordImg : showPasswordImg}
              alt="toggle visibility"
              style={styles.logo}
            />
          </button>
        </div>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={styles.input}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Create Expiring Link:</label>
        <input
          type="checkbox"
          checked={createExpiringLink}
          onChange={(e) => setCreateExpiringLink(e.target.checked)}
          style={styles.checkbox}
        />
      </div>
      <button type="submit" style={styles.submitButton}>
        Add User
      </button>
    </form>
  )
}

export default AddUser

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Align items to the left
    width: '100%',
    maxWidth: '400px',
    margin: '50px 0', // Remove auto margin to prevent centering
    padding: '20px 0',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  toggleButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  logo: {
    height: '20px',
    width: '20px',
  },
  checkbox: {
    transform: 'scale(1.5)',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
}
