import React from 'react'
import styles from './css/UserSessions.module.css'

const UserSessions = ({ userSessions, onDelete, onDeleteAll }) => {
  return (
    <div>
      <h3>All user Sessions</h3>
      <button onClick={() => onDeleteAll('all')}>
        Delete All User sessions
      </button>
      {userSessions.length > 0 ? (
        userSessions.map((session) => {
          const sessionStart = new Date(session.session_start)
          const expirationTime = new Date(session.expiration_time)

          return (
            <div key={session.session_id} className={styles.session}>
              <p>
                <span className={styles.label}>Username:</span>{' '}
                <span className={styles.value}>{session.username}</span>
              </p>

              <p>
                <span className={styles.label}>Session Start Date:</span>{' '}
                <span className={styles.value}>
                  {sessionStart.toLocaleDateString()}
                </span>
              </p>
              <p>
                <span className={styles.label}>Session Start Time:</span>{' '}
                <span className={styles.value}>
                  {sessionStart.toLocaleTimeString([], { hour12: false })}
                </span>
              </p>

              <p>
                <span className={styles.label}>Expiration Time:</span>{' '}
                <span className={styles.value}>
                  {expirationTime.toLocaleTimeString([], { hour12: false })}
                </span>
              </p>
              <p>
                <span className={styles.label}>User Agent:</span>{' '}
                <span className={styles.value}>{session.user_agent}</span>
              </p>
              <button onClick={() => onDelete(session.session_id)}>
                Delete
              </button>
            </div>
          )
        })
      ) : (
        <p className={styles.session}>No User Sessions</p>
      )}
    </div>
  )
}

export default UserSessions
