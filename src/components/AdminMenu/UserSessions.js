import React from 'react'
import styles from './css/UserSessions.module.css'

const UserSessions = ({ userSessions }) => {
  return (
    <div>
      <h3>User Sessions</h3>
      {userSessions.map((session) => (
        <div key={session.session_id} className={styles.session}>
          <p>Username: {session.username}</p>
          <p>User Agent: {session.user_agent}</p>
          <p>Session Start: {session.session_start}</p>
          <p>Expiration Time: {session.expiration_time}</p>
        </div>
      ))}
    </div>
  )
}

export default UserSessions
