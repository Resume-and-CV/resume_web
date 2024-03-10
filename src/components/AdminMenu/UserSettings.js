import React, { useState, useEffect } from 'react'
import api from '../../middleWare/axiosInterceptor'
import styles from './css/userSettings.module.css'
import UserDetail from './UserDetail'
import AddUser from './AddUser'

const UserSettings = () => {
  const [selectedSetting, setSelectedSetting] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [showUserAccounts, setShowUserAccounts] = useState(false)
  const [userAccounts, setUserAccounts] = useState([])
  const [selectedUserData, setSelectedUserData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserAccounts = async () => {
      try {
        const response = await api.get('/user') // Replace with your endpoint
        setUserAccounts(response.data)
      } catch (error) {
        console.error('Failed to fetch user accounts:', error)
      }
    }

    fetchUserAccounts()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  const handleChange = (event) => {
    setSelectedSetting(event.target.value)
    setShowUserAccounts(event.target.value === 'showUserAccounts')
  }

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value)
    const userData = userAccounts.find(
      (user) => user.username === event.target.value,
    )
    setSelectedUserData(userData)
  }

  const handleEditUser = (user) => {
    console.log('Edit user:', user)
    // Add your logic to edit the user
  }

  const handleDeleteUser = (user) => {
    console.log('Delete user:', user)
    // Add your logic to delete the user
  }

  console.log('userAccounts:', userAccounts)

  return (
    <div className={styles.box}>
      <h2 className={styles.heading}>User Settings</h2>
      <div className={styles.entryBox}>
        <p className={styles.firstLine}>This is the user settings component.</p>
        <form>
          <label>
            Select setting to modify:
            <select value={selectedSetting} onChange={handleChange}>
              <option value="">--Please choose an option--</option>
              <option value="showUserAccounts">Show user accounts</option>
              <option value="addUserAccount">Add user account</option>
              <option value="setting2">Setting 2</option>
            </select>
          </label>
        </form>
        {selectedSetting === 'addUserAccount' && <AddUser />}

        {showUserAccounts && (
          <div>
            <h3>Select a user account:</h3>
            {userAccounts.map((user) => (
              <div key={user.user_id}>
                <input
                  type="radio"
                  id={user.username}
                  name="userAccount"
                  value={user.username}
                  onChange={handleUserChange}
                />
                <label htmlFor={user.username}>{user.username}</label>
              </div>
            ))}
            {selectedUserData && (
              <UserDetail
                user={selectedUserData}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserSettings
