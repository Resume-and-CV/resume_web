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
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </li>
        <li>
          <label>
            Password:
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            style={{
              position: 'absolute',
              right: -10,
              top: '54%',
              transform: 'translateY(-50%)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
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
        </li>
        <li>
          <label>
            Type:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </li>
        <label>
          Create Expiring Link:
          <input
            type="checkbox"
            checked={createExpiringLink}
            onChange={(e) => setCreateExpiringLink(e.target.checked)}
          />
        </label>
      </ul>
      <button type="submit">Add User</button>
    </form>
  )
}

export default AddUser

// Define your styles object
const styles = {
  logo: { height: 20, width: 20 },
}
