import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import api from '../../middleWare/axiosInterceptor'
import styles from './css/userSettings.module.css'
import UserDetail from './UserDetail'
import AddUser from './AddUser'
import UserSessions from './UserSessions'
//import { use } from 'i18next'

const UserSettings = () => {
  const [selectedSetting, setSelectedSetting] = useState('')
  const [userAccounts, setUserAccounts] = useState([])
  const [selectedUserData, setSelectedUserData] = useState(null)
  const [userSessions, setUserSessions] = useState([]) // Added userSessions state
  const [userSessionsById, setUserSessionsById] = useState([]) // Added userSessionsById state
  const [error] = useState(null) // Removed setError as it's not being used

  useEffect(() => {
    if (selectedSetting === 'showUserAccounts') {
      fetchUserAccounts()
    }
    if (selectedSetting === 'userSessions') {
      fetchUserSessions()
    }
  }, [selectedSetting])

  const fetchUserAccounts = async () => {
    try {
      const response = await api.get('/user') // Replace with your endpoint
      setUserAccounts(response.data)
      //console.log('User accounts:', userAccounts)
    } catch (error) {
      console.error('Failed to fetch user accounts:', error)
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const fetchUserSessions = async () => {
    try {
      const response = await api.get('/userSessions/get/all') // Replace with your endpoint
      //console.log('User sessions:', response.data)
      setUserSessions(response.data)
    } catch (error) {
      console.error('Failed to fetch user sessions:', error)
    }
  }

  const fetchUserSessionsByUserId = async (userId) => {
    try {
      const response = await api.get(`/userSessions/get/${userId}`) // Replace with your endpoint
      setUserSessionsById(response.data)
    } catch (error) {
      console.error(`Failed to fetch user sessions for user ${userId}:`, error)
    }
  }

  // Removed handleChange as it's not being used

  const handleUserChange = (event) => {
    const userData = userAccounts.find(
      (user) => user.username === event.target.value,
    )
    setSelectedUserData(userData)
    setUserSessionsById([])
    fetchUserSessionsByUserId(userData.user_id)
  }

  const handleEditUser = (user) => {
    //console.log('Edit user:', user)
    // Add your logic to edit the user
  }

  const handleDeleteUser = async (user) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      //console.log('Delete user:', user)
      try {
        await api.delete(`/user/delete/${user.user_id}`) // Replace with your endpoint
        // After deleting, remove the user from the local state
        setUserAccounts(userAccounts.filter((u) => u.user_id !== user.user_id))

        // If the deleted user is the currently selected user, clear the selected user data
        if (selectedUserData && selectedUserData.user_id === user.user_id) {
          setSelectedUserData(null)
        }

        // Show a success toast
        toast.success('User deleted successfully')
      } catch (error) {
        console.error('Failed to delete user:', error)

        // Show an error toast
        toast.error('Failed to delete user')
      }
    }
  }

  //console.log('userAccounts:', userAccounts)

  const handleDeleteUserSession = async (sessionId) => {
    if (window.confirm('Are you sure you want to delete this user session?')) {
      console.log('Delete session:', sessionId)
      try {
        await api.delete(`/userSessions/delete/sessionid/${sessionId}`) // Replace with your endpoint
        setUserSessions(
          userSessions.filter((session) => session.session_id !== sessionId),
        )

        // Show a success toast
        toast.success('User session deleted successfully')
      } catch (error) {
        console.error('Failed to delete user session:', error)

        // Show an error toast
        toast.error('Failed to delete user session')
      }
    }
  }

  const handleDeleteAllUserSession = async () => {
    if (window.confirm('Are you sure you want to delete all user sessions?')) {
      console.log('Delete all user sessions:')
      try {
        await api.delete(`/userSessions/delete/all`) // Replace with your endpoint
        setUserSessions([])

        // Show a success toast
        toast.success('All user sessions deleted successfully')
      } catch (error) {
        console.error('Failed to delete user sessions:', error)

        // Show an error toast
        toast.error('Failed to delete user sessions')
      }
    }
  }

  const handleDeleteUserSessionByUserId = async (user) => {
    if (window.confirm('Are you sure you want to delete all user sessions?')) {
      console.log('Delete all user sessions:')
      try {
        await api.delete(`/userSessions/delete/userid/${user.user_id}`) // Replace with your endpoint
        setUserSessionsById([])

        // Show a success toast
        toast.success('All user sessions deleted successfully')
      } catch (error) {
        console.error('Failed to delete user sessions:', error)

        // Show an error toast
        toast.error('Failed to delete user sessions')
      }
    }
  }

  return (
    <div className={styles.box}>
      <h2 className={styles.heading}>User Settings</h2>
      <div className={styles.entryBox}>
        <p className={styles.firstLine}>This is the user settings component.</p>
        <div>
          <button onClick={() => setSelectedSetting('showUserAccounts')}>
            Show user accounts
          </button>
          <button onClick={() => setSelectedSetting('addUserAccount')}>
            Add user account
          </button>
          <button onClick={() => setSelectedSetting('userSessions')}>
            All user sessions
          </button>
        </div>
        {selectedSetting === 'addUserAccount' && (
          <AddUser onAddUser={fetchUserAccounts} />
        )}

        {selectedSetting === 'showUserAccounts' && (
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
                userSessions={userSessionsById}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onDeleteUsersessions={handleDeleteUserSessionByUserId}
              />
            )}
          </div>
        )}
        {selectedSetting === 'userSessions' && (
          <UserSessions
            userSessions={userSessions}
            onDelete={handleDeleteUserSession}
            onDeleteAll={handleDeleteAllUserSession}
          />
        )}
      </div>
    </div>
  )
}

export default UserSettings
