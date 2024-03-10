import React, { useState } from 'react'
import api from '../../middleWare/axiosInterceptor'

const AddUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('user') // Default to 'user'
  const [createExpiringLink, setCreateExpiringLink] = useState(false)

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
    } catch (error) {
      console.error('Failed to add user:', error)
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
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
