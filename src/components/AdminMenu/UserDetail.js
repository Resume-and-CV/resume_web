import React from 'react'
import styles from './css/UserSessions.module.css'

const UserDetail = ({
  user,
  onEdit,
  onDelete,
  userSessions,
  onDeleteUsersessions,
}) => {
  if (!user) {
    return null
  }

  const keysToDisplay = ['username', 'type', 'expiration_date_from_users'] // Add the keys of the properties you want to display

  const displayNames = {
    username: 'Username',
    type: 'Type',
    expiration_date_from_users: 'Expiration Date',
  } // Add the display names for the keys

  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleDateString('fi-FI')
      : 'No date provided'
  }

  return (
    <div>
      <h3>User Detail</h3>

      <ul className={styles.session}>
        {keysToDisplay.map((key) => (
          <li key={key}>
            <strong>{displayNames[key] || key}:</strong>{' '}
            {key.includes('date') || key.includes('At')
              ? formatDate(user[key])
              : user[key]}
          </li>
        ))}
      </ul>

      <h3>User's Link</h3>

      <ul className={styles.session}>
        <li>
          <strong>Link:</strong>{' '}
          {user.link ? (
            <a href={user.link} target="_blank" rel="noopener noreferrer">
              {user.link.length > 20
                ? `${user.link.substring(0, 20)}...`
                : user.link}
            </a>
          ) : (
            'No link provided'
          )}
          <br />
          <strong>Expiration Date:</strong>{' '}
          {formatDate(user.expiration_from_expiringlinks)}
          <br />
        </li>
      </ul>

      <h3>User's Sessions</h3>

      <div>
        {userSessions && userSessions.length > 0 ? (
          userSessions.map((session) => {
            const startTime = new Date(session.session_start)
            const expirationTime = new Date(session.expiration_time)

            return (
              <div key={session.session_id} className={styles.session}>
                <strong>Session ID:</strong> {session.session_id}
                <br />
                <strong>Start Date:</strong> {startTime.toLocaleDateString()}
                <br />
                <strong>Start Time:</strong>{' '}
                {startTime.toLocaleTimeString([], { hour12: false })}
                <br />
                <strong>Expiration Time:</strong>{' '}
                {expirationTime.toLocaleTimeString([], { hour12: false })}
                <br />
                <strong>User Agent:</strong> {session.user_agent}
                <br />
              </div>
            )
          })
        ) : (
          <p className={styles.session}>No sessions used</p>
        )}
      </div>
      <button onClick={() => onEdit(user)}>Edit user</button>
      <button onClick={() => onDelete(user)}>Delete user</button>
      <button onClick={() => onDeleteUsersessions(user)}>
        {' '}
        Delete usersessions
      </button>
    </div>
  )
}

export default UserDetail
